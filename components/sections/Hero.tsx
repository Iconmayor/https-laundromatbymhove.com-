'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { stages, variantOrder, type Variant } from '@/lib/siteConfig';
import FloorDust from '../three/FloorDust';
import Stage from '../three/Stage';
import BubbleField from '../ui/BubbleField';
import Icon from '../ui/Icon';

const defaultVariant: Variant = 'home-cleaning';

export default function Hero() {
  const [variant, setVariant] = useState<Variant>(defaultVariant);
  const [paused, setPaused] = useState(false);
  const current = stages[variant];

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => {
      setPaused(media.matches || document.documentElement.dataset.motion === 'paused');
    };
    syncMotion();
    media.addEventListener('change', syncMotion);
    return () => media.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    function syncScene() {
      const selected = variantOrder.find((service) => window.location.hash === `#${service}`);
      setVariant(selected ?? defaultVariant);
    }
    syncScene();
    window.addEventListener('hashchange', syncScene);
    return () => window.removeEventListener('hashchange', syncScene);
  }, []);

  function toggleMotion() {
    const nextPaused = !paused;
    document.documentElement.dataset.motion = nextPaused ? 'paused' : 'live';
    setPaused(nextPaused);
    window.dispatchEvent(new Event('studio-motion'));
  }

  return (
    <section className="hero" data-theme={variant} style={{ '--hero-theme': current.theme } as CSSProperties}>
      <picture className="hero-back">
        <source srcSet="/images/studio-marble-mobile.webp" media="(max-width: 767px)" />
        <img src="/images/studio-marble.webp" alt="" width="1664" height="920" fetchPriority="high" />
      </picture>
      <div className="hero-tone" aria-hidden="true" />
      {variant === defaultVariant && <FloorDust hero />}

      <div className="shell hero-layout">
        <div className="hero-copy">
          <span className="eyebrow light"><i />Professional laundry &amp; cleaning</span>
          <div className="hero-content">
            <h1><span>{current.title[0]}</span>{' '}<em>{current.title[1]}</em></h1>
            <p>{current.description}</p>
          </div>
          <div className="hero-actions">
            <Link href={`/book?service=${variant === defaultVariant ? 'laundry' : variant}`} className="button primary">
              <Icon name="bag" size={17} />{current.action}
            </Link>
            <a href="#services" className="button secondary">View Services</a>
          </div>
        </div>

        <Stage key={current.scene} model={current.scene} kind="hero" label={`${current.name} service studio model`} className="hero-stage" />
        <BubbleField />
        <nav className="variant-switch" aria-label="Jump to a service">
          {variantOrder.map((service) => (
            <a href={`#${service}`} key={service} data-active={service === variant ? true : undefined}>
              <span className="mini-product">
                <img src={`/posters/${stages[service].scene}.webp`} alt="" width="54" height="42" />
              </span>
              <span>{stages[service].name}</span>
            </a>
          ))}
        </nav>

        <div className="hero-bottom">
          <a href="#services" className="scroll-cue"><span><Icon name="down" size={15} /></span>Scroll to explore</a>
          <div className="scene-meta">
            <button type="button" className="motion-button" aria-label={paused ? 'Play motion' : 'Pause motion'} aria-pressed={paused} onClick={toggleMotion}>
              <Icon name={paused ? 'play' : 'pause'} size={13} />
            </button>
            <span>{current.name} care</span><i />
            <span>{String(variantOrder.indexOf(variant) + 1).padStart(2, '0')} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
