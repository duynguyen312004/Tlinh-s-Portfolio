'use client';

import { useEffect, useRef } from 'react';

const STAR_COUNT = 160;

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      const size = Math.random() < 0.15 ? 3 : Math.random() < 0.4 ? 2 : 1.5;
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
  }, []);

  return <div ref={containerRef} className="starfield" aria-hidden="true" />;
}
