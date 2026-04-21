import { useEffect, useRef, useState } from 'react';
import lottie from 'lottie-web';

const SCROLL_URL = '/motion/aim-scroll.json';
const LOADING_URL = '/motion/aim-loading.json';

export default function HomeMotionLayer() {
  const frameStart = 0;
  const frameEnd = 120;
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [wordmarkOpacity, setWordmarkOpacity] = useState(1);

  useEffect(() => {
    if (!loadingRef.current || !scrollRef.current) return;

    let isScrollReady = false;

    const loadingAnim = lottie.loadAnimation({
      container: loadingRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: LOADING_URL
    });

    const scrollAnim = lottie.loadAnimation({
      container: scrollRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: SCROLL_URL
    });

    (window as typeof window & { __aimScrollAnim?: typeof scrollAnim }).__aimScrollAnim = scrollAnim;

    const handleComplete = () => {
      setIsLoadingDone(true);
    };

    const fallback = window.setTimeout(() => {
      setIsLoadingDone(true);
    }, 2800);

    const syncScroll = () => {
      if (!isScrollReady) return;

      const about = document.getElementById('Home-about');
      const experiment = document.querySelector('.experiment-section');
      if (!about) return;

      const end = Math.max(about.offsetTop + window.innerHeight * 0.45, window.innerHeight * 1.2);
      const progress = Math.min(Math.max(window.scrollY / end, 0), 1);
      scrollAnim.goToAndStop(frameStart + progress * (frameEnd - frameStart), true);
      document.documentElement.style.setProperty(
        '--home-hero-shift',
        `${Math.min(window.scrollY * 0.28, 182)}px`
      );

      const fadeStart =
        experiment instanceof HTMLElement
          ? experiment.offsetTop - window.innerHeight * 1.15
          : about.offsetTop + window.innerHeight * 1.05;
      const fadeEnd =
        experiment instanceof HTMLElement
          ? experiment.offsetTop - window.innerHeight * 0.12
          : fadeStart + window.innerHeight;
      const fadeProgress = Math.min(
        Math.max((window.scrollY - fadeStart) / Math.max(fadeEnd - fadeStart, 1), 0),
        1
      );
      const opacity = 1 - fadeProgress;
      setScrollOpacity(opacity);
      setWordmarkOpacity(Math.max(0.18, opacity));
    };

    const handleScrollReady = () => {
      isScrollReady = true;
      scrollAnim.goToAndStop(frameStart, true);
      syncScroll();
    };

    loadingAnim.addEventListener('complete', handleComplete);
    scrollAnim.addEventListener('DOMLoaded', handleScrollReady);
    syncScroll();
    window.addEventListener('scroll', syncScroll, { passive: true });
    window.addEventListener('resize', syncScroll);

    return () => {
      window.clearTimeout(fallback);
      document.documentElement.style.removeProperty('--home-hero-shift');
      loadingAnim.removeEventListener('complete', handleComplete);
      scrollAnim.removeEventListener('DOMLoaded', handleScrollReady);
      loadingAnim.destroy();
      scrollAnim.destroy();
      delete (window as typeof window & { __aimScrollAnim?: typeof scrollAnim }).__aimScrollAnim;
      window.removeEventListener('scroll', syncScroll);
      window.removeEventListener('resize', syncScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('home-header-ready', isLoadingDone);

    return () => {
      document.body.classList.remove('home-header-ready');
    };
  }, [isLoadingDone]);

  return (
    <>
      <div className={`home-loading ${isLoadingDone ? 'is-done' : ''}`} aria-hidden="true">
        <div className="home-loading__logo" ref={loadingRef} />
        <div className="home-loading__bg" />
      </div>

      <div className="home-scroll-motion" aria-hidden="true" style={{ opacity: scrollOpacity }}>
        <div className="home-scroll-motion__inner" ref={scrollRef} />
      </div>

      <style>{`:root{--home-wordmark-opacity:${wordmarkOpacity};}`}</style>
    </>
  );
}
