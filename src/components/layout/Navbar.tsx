'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useHouse } from '@/context/HouseContext';
import { HouseName, HOUSE_CONFIGS } from '@/lib/houseConfig';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const { house, houseConfig, selectHouse } = useHouse();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [houseMenuOpen, setHouseMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setHouseMenuOpen(false);
  };

  const changeHouse = (nextHouse: HouseName) => {
    selectHouse(nextHouse);
    setHouseMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled || menuOpen ? 'rgba(8,6,14,0.92)' : 'rgba(8,6,14,0)',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'blur(0px)',
        borderBottom: scrolled || menuOpen
          ? '1px solid color-mix(in srgb, var(--house-accent) 18%, transparent)'
          : '1px solid transparent',
        boxShadow: scrolled || menuOpen ? '0 10px 30px rgba(0,0,0,0.18)' : 'none',
        opacity: scrolled ? 0.98 : 1,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => scrollTo('home')}
          className="font-cinzel text-base sm:text-lg font-bold house-transition flex shrink-0 items-center gap-2"
          style={{ color: 'var(--house-accent)' }}
        >
          <span aria-hidden="true" className="text-base">{'\u{1F996}'}</span>
          Tlinh
        </button>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="magic-nav-link relative px-3 xl:px-4 py-2 font-raleway text-sm font-medium tracking-wide transition-all duration-300 rounded-lg"
                  style={{ color: isActive ? 'var(--house-accent)' : '#a09070' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'var(--house-muted)', border: '1px solid var(--house-accent)40' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {houseConfig && (
          <div className="relative hidden lg:block shrink-0">
            <button
              type="button"
              onClick={() => setHouseMenuOpen((open) => !open)}
              className="spell-button flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-cinzel font-bold tracking-wider transition-transform duration-200 hover:scale-105"
              style={{
                background: `${houseConfig.primary}40`,
                color: houseConfig.accent,
                border: `1px solid ${houseConfig.accent}50`,
              }}
              aria-expanded={houseMenuOpen}
              aria-haspopup="menu"
              title="Change house"
            >
              <Image src={houseConfig.crest} alt="" width={16} height={16} className="object-contain" />
              {houseConfig.displayName}
              <span className="text-[10px]" aria-hidden="true">v</span>
            </button>

            {houseMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-3 w-52 rounded-xl glass-card p-2"
                style={{ border: '1px solid var(--house-accent)35' }}
                role="menu"
              >
                {(Object.keys(HOUSE_CONFIGS) as HouseName[]).map((nextHouse) => {
                  const cfg = HOUSE_CONFIGS[nextHouse];
                  const active = house === nextHouse;

                  return (
                    <button
                      key={nextHouse}
                      type="button"
                      onClick={() => changeHouse(nextHouse)}
                      className="spell-button flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-raleway text-sm transition-colors"
                      style={{
                        background: active ? `${cfg.primary}55` : 'transparent',
                        color: active ? cfg.accent : '#d9caa4',
                      }}
                      role="menuitem"
                    >
                      <Image src={cfg.crest} alt="" width={22} height={22} className="object-contain" />
                      <span className="flex-1">{cfg.displayName}</span>
                      {active && <span style={{ color: cfg.accent }}>*</span>}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>
        )}

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 9 }
                    : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -9 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              className="block w-5 h-0.5 rounded-full"
              style={{ background: 'var(--house-accent)' }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden px-4 sm:px-6 pb-4 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto"
          style={{ background: 'rgba(8,6,14,0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="magic-nav-link relative text-left py-2.5 px-3 font-raleway text-sm rounded-lg transition-colors"
              style={{ color: activeSection === link.id ? 'var(--house-accent)' : '#a09070' }}
            >
              {link.label}
            </button>
          ))}

          {houseConfig && (
            <div className="mt-2 border-t border-white/10 pt-3">
              <p className="px-3 pb-2 font-cinzel text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--house-accent)' }}>
                Change house
              </p>
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
                {(Object.keys(HOUSE_CONFIGS) as HouseName[]).map((nextHouse) => {
                  const cfg = HOUSE_CONFIGS[nextHouse];
                  const active = house === nextHouse;

                  return (
                    <button
                      key={nextHouse}
                      type="button"
                      onClick={() => changeHouse(nextHouse)}
                      className="spell-button flex min-w-0 items-center gap-2 rounded-lg px-3 py-2 text-left font-raleway text-xs transition-colors"
                      style={{
                        background: active ? `${cfg.primary}55` : 'rgba(255,255,255,0.04)',
                        color: active ? cfg.accent : '#c9b89a',
                        border: `1px solid ${active ? cfg.accent : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      <Image src={cfg.crest} alt="" width={20} height={20} className="object-contain shrink-0" />
                      <span className="truncate">{cfg.displayName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
