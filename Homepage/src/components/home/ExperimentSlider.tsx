import { useState } from 'react';
import type { FeaturedExperiment } from '@/data/gallery';

type Props = {
  items: FeaturedExperiment[];
};

export default function ExperimentSlider({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <div className="shell experiment-slider">
      <div className="experiment-slider__visual">
        {items.map((item, index) => {
          const offset = index - activeIndex;
          const state =
            offset === 0 ? 'is-active' : offset === 1 ? 'is-next' : offset < 0 ? 'is-past' : 'is-rest';

          return (
            <figure
              key={item.id}
              className={`experiment-slide ${state}`}
              style={{ ['--accent' as string]: item.accent }}
              aria-hidden={index !== activeIndex}
            >
              <img src={item.image} alt={item.name} loading="lazy" />
              <figcaption>
                <span>{item.label}</span>
                <strong>{item.name}</strong>
                <em>{item.year}</em>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <div className="experiment-slider__meta">
        <div className="experiment-slider__headline">
          <p className="eyebrow">06 Featured</p>
          <h3>{activeItem.name}</h3>
          <p>
            Hover or tap the list to move through the image stack, echoing the source site&apos;s
            sticky feature gallery.
          </p>
        </div>

        <div className="experiment-slider__count">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <small>/ {String(items.length).padStart(2, '0')}</small>
        </div>

        <ul className="experiment-slider__list">
          {items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === activeIndex ? 'is-active' : ''}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.name}</strong>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
