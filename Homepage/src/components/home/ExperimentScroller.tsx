import { useEffect, useMemo, useRef, useState } from 'react';
import type { FeaturedExperiment } from '@/data/gallery';

type Props = {
  items: FeaturedExperiment[];
};

export default function ExperimentScroller({ items }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const total = Math.max(root.offsetHeight - window.innerHeight, 1);
      const passed = Math.min(Math.max(-rect.top, 0), total);
      const progress = passed / total;
      const index = Math.min(items.length - 1, Math.round(progress * (items.length - 1)));
      setActiveIndex(index);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items.length]);

  const backdrop = useMemo(() => [items[0], items[5] ?? items[0], items[2] ?? items[0]], [items]);

  const jumpTo = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const top = root.offsetTop;
    const span = Math.max(root.offsetHeight - window.innerHeight, 1);
    const target = top + span * (index / Math.max(items.length - 1, 1));
    window.scrollTo({
      top: target,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  };

  return (
    <div className="feature-scroll" ref={rootRef}>
      <div className="feature-scroll__sticky">
        <div className="feature-scroll__backdrop">
          {backdrop.map((item, index) => (
            <figure className={`feature-column feature-column--${index + 1}`} key={`${item.id}-${index}`}>
              <img src={item.image} alt={item.name} loading="lazy" />
            </figure>
          ))}
        </div>

        <div className="feature-scroll__overlay">
          <div className="feature-scroll__left">
            <div className="feature-scroll__heading">
              <div className="hero-cutoff"><h2>Explore</h2></div>
              <div className="hero-cutoff"><h2>Experiment</h2></div>
            </div>

            <a href="/experiment" className="feature-scroll__button transition-link">
              <span>Learn More</span>
              <span aria-hidden="true">→</span>
            </a>

            <p className="feature-scroll__footnote">Kharkiv Modernism × Obys × AI</p>
          </div>

          <div className="feature-scroll__right">
            <div className="feature-scroll__counter">
              <span>{activeIndex + 1}</span>
              <small>/ {items.length}</small>
            </div>

            <div className="feature-scroll__index">
              <p>[06] Featured:</p>
              <p>Name:</p>
              <ul>
                {items.map((item, index) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={index === activeIndex ? 'is-active' : ''}
                      onClick={() => jumpTo(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <p className="feature-scroll__year">©2025</p>
          </div>
        </div>

        <div
          className="feature-scroll__slider"
          style={{ transform: `translate3d(0, -${activeIndex * 100}%, 0)` }}
        >
          {items.map((item) => (
            <figure className="feature-scroll__slide" key={item.id}>
              <img src={item.image} alt={item.name} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>

      <div className="feature-scroll__mobile">
        {items.map((item) => (
          <article key={`mobile-${item.id}`} className="feature-mobile-card">
            <img src={item.image} alt={item.name} loading="lazy" />
            <p>{item.name}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
