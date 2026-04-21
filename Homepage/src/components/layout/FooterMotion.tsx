import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const FOOTER_URL =
  'https://cdn.prod.website-files.com/6543bb275c1f9a259661c7c8/65573eb97467440781e3b7fb_footer-ex.json';

export default function FooterMotion() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const animation = lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: FOOTER_URL
    });

    animation.goToAndStop(0, true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animation.goToAndPlay(0, true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      animation.destroy();
    };
  }, []);

  return <div className="site-footer__motion" ref={ref} aria-hidden="true" />;
}
