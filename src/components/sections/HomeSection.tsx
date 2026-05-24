'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolioData';
import HiddenStar from '@/components/minigame/HiddenStar';

const TYPING_WORDS = portfolioData.personal.careerOrientations;

export default function HomeSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = TYPING_WORDS[wordIndex];
    let i = typing ? 0 : word.length;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (typing) {
        if (i <= word.length) {
          setDisplayed(word.slice(0, i++));
          timer = setTimeout(tick, 60);
        } else {
          timer = setTimeout(() => setTyping(false), 1800);
        }
      } else {
        if (i >= 0) {
          setDisplayed(word.slice(0, i--));
          timer = setTimeout(tick, 35);
        } else {
          setWordIndex((w) => (w + 1) % TYPING_WORDS.length);
          setTyping(true);
        }
      }
    };

    timer = setTimeout(tick, 200);
    return () => clearTimeout(timer);
  }, [wordIndex, typing]);

  return (
    <section
      id="home"
      className="section-base min-h-screen flex flex-col items-center justify-center text-center relative"
    >
      <HiddenStar id="star-home" className="top-32 left-[15%]" />

      {/* Decorative rune circles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-96 h-96 rounded-full border opacity-10"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: 'var(--house-accent)',
            animation: 'spin 30s linear infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full border opacity-5"
          style={{
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            borderColor: 'var(--house-accent)',
            animation: 'spin 50s linear infinite reverse',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center gap-6 max-w-3xl"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 120 }}
          className="relative"
        >
          <div
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
            style={{
              border: '3px solid var(--house-accent)',
              boxShadow: '0 0 40px var(--house-glow), 0 0 80px var(--house-glow)',
            }}
          >
            <Image
              src="/assets/images/linh-portrait.jpg"
              alt="Nguyễn Thảo Linh"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              priority
              className="object-cover"
            />
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-sm"
            style={{ background: 'var(--house-primary)', border: '2px solid var(--house-accent)' }}
          >
            ✨
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="text-[var(--house-accent)] text-xs tracking-[0.5em] uppercase font-cinzel mb-3">
            Portfolio · Wizarding Edition
          </p>
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold shimmer-text leading-tight">
            Thảo Linh
          </h1>
          <p className="text-[#c9b89a] font-raleway text-base md:text-lg mt-2">
            Nguyễn Thảo Linh
          </p>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-10 flex items-center"
        >
          <span className="font-raleway text-lg md:text-xl text-[#a09070]">
            Aspiring{' '}
            <span
              className="font-semibold typing-cursor"
              style={{ color: 'var(--house-accent)' }}
            >
              {displayed}
            </span>
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-[#7a6a4a] font-raleway text-sm md:text-base max-w-xl leading-relaxed"
        >
          {portfolioData.personal.headline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-4 justify-center mt-2"
        >
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="spell-button px-8 py-3 font-cinzel text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--house-primary), var(--house-muted))',
              color: 'var(--house-accent)',
              border: '1px solid var(--house-accent)',
              boxShadow: '0 0 20px var(--house-glow)',
            }}
          >
            Cast a Message ✉
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="spell-button px-8 py-3 font-raleway text-sm tracking-wide rounded-full transition-all duration-300 hover:scale-105"
            style={{
              color: 'var(--house-accent)',
              border: '1px solid var(--house-accent)50',
              background: 'rgba(255,255,255,0.03)',
            }}
          >
            Explore ↓
          </button>
        </motion.div>

        {/* Characteristics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex gap-3 flex-wrap justify-center mt-2"
        >
          {portfolioData.personal.characteristics.map((c) => (
            <span
              key={c}
              className="magical-card px-3 py-1 rounded-full text-xs font-raleway font-medium glass-card"
              style={{ color: 'var(--house-accent)', border: '1px solid var(--house-accent)30' }}
            >
              {c}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8"
        style={{ color: 'var(--house-accent)', opacity: 0.5 }}
      >
        ↓
      </motion.div>

      <style>{`@keyframes spin { to { transform: translate(-50%, -50%) rotate(360deg); } }`}</style>
    </section>
  );
}
