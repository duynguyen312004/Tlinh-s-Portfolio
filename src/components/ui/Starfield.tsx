'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 130;

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      const depth = Math.random();
      const layer = depth > 0.82 ? 'star-near' : depth > 0.42 ? 'star-mid' : 'star-far';
      const size = layer === 'star-near' ? 2.6 : layer === 'star-mid' ? 1.9 : 1.2;
      star.className = `star ${layer}`;
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        --duration: ${Math.random() * 4 + 2}s;
        --delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.6 + 0.2};
      `;
      container.appendChild(star);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const offset = motionAllowed && window.innerWidth > 768 ? window.scrollY * -0.025 : 0;
        container.style.setProperty('--star-scroll', `${offset}px`);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={containerRef} className="starfield" aria-hidden="true" />;
}
