'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const wandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wandRef.current;
    if (!el) return;

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      el.style.transform = `translate(${curX - 6}px, ${curY - 6}px)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={wandRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
      style={{ willChange: 'transform' }}
    >
      <img
        src="/assets/images/hermione-wand.png"
        alt="wand cursor"
        width={28}
        height={28}
        style={{ imageRendering: 'crisp-edges', filter: 'drop-shadow(0 0 6px var(--house-accent))' }}
      />
    </div>
  );
}
