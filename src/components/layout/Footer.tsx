'use client';

import { useHouse } from '@/context/HouseContext';

export default function Footer() {
  const { houseConfig } = useHouse();

  return (
    <footer
      className="relative z-10 text-center py-10 px-6 mt-8"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="font-cinzel text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--house-accent)' }}>
        ✦ Crafted with magic & code ✦
      </p>
      <p className="font-raleway text-xs text-[#4a3a2a]">
        © {new Date().getFullYear()} Nguyễn Thảo Linh
        {houseConfig ? ` · ${houseConfig.displayName}` : ''}
      </p>
      <p className="font-raleway text-[10px] text-[#3a2a1a] mt-1 italic">
        &quot;It does not do to dwell on dreams and forget to live.&quot;
      </p>
    </footer>
  );
}
