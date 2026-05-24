'use client';

import { useEffect } from 'react';

interface Particle {
  el: HTMLDivElement;
  tx: number;
  ty: number;
}

export default function SparkleEffect() {
  useEffect(() => {
    const shapes = ['✦', '✧', '⋆', '★', '✨', '·'];

    const onClick = (e: MouseEvent) => {
      const count = 7;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 14 + 8;
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const dist = Math.random() * 50 + 30;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 20;
        const duration = Math.random() * 300 + 400;

        el.textContent = shape;
        el.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          font-size: ${size}px;
          color: var(--house-accent);
          pointer-events: none;
          z-index: 9998;
          user-select: none;
          text-shadow: 0 0 8px var(--house-accent);
          animation: sparkle ${duration}ms ease-out forwards;
          --tx: ${tx}px;
          --ty: ${ty}px;
        `;

        document.body.appendChild(el);
        particles.push({ el, tx, ty });

        setTimeout(() => {
          el.remove();
        }, duration + 50);
      }
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return null;
}
