'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const POT_COUNT = 5;
const WIN_SCORE = 10;
const POP_INTERVAL_MS = 1350;
const REWARD_HIDE_MS = 5200;

type Burst = {
  id: number;
  pot: number;
};

function nextPot(previous: number | null) {
  const value = Math.floor(Math.random() * POT_COUNT);
  return value === previous ? (value + 1) % POT_COUNT : value;
}

export default function MandrakeHarvest() {
  const [score, setScore] = useState(0);
  const [activePot, setActivePot] = useState<number | null>(null);
  const [cryPot, setCryPot] = useState<number | null>(null);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [showReward, setShowReward] = useState(false);
  const burstIdRef = useRef(0);
  const cryTimerRef = useRef<number | null>(null);
  const burstTimerRef = useRef<number | null>(null);
  const rewardTimerRef = useRef<number | null>(null);
  const rewardImageRef = useRef<HTMLImageElement | null>(null);

  const won = score >= WIN_SCORE;
  const shouldPreloadReward = score >= WIN_SCORE - 2;

  useEffect(() => {
    if (won) return;

    const interval = window.setInterval(() => {
      setActivePot((current) => nextPot(current));
    }, POP_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [won]);

  useEffect(() => {
    return () => {
      if (cryTimerRef.current) window.clearTimeout(cryTimerRef.current);
      if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);
      if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!shouldPreloadReward || rewardImageRef.current) return;

    const image = new window.Image();
    image.src = '/assets/images/love_you.jpg';
    rewardImageRef.current = image;
    image.decode?.().catch(() => undefined);
  }, [shouldPreloadReward]);

  const openReward = () => {
    setShowReward(true);
    if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
    rewardTimerRef.current = window.setTimeout(() => setShowReward(false), REWARD_HIDE_MS);
  };

  const reset = () => {
    setScore(0);
    setActivePot(null);
    setCryPot(null);
    setBursts([]);
    setShowReward(false);
    if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
  };

  const hitPot = (pot: number) => {
    if (won) return;

    if (pot === activePot) {
      const burstId = burstIdRef.current + 1;
      burstIdRef.current = burstId;
      setScore((current) => {
        const nextScore = Math.min(WIN_SCORE, current + 1);
        if (nextScore >= WIN_SCORE) openReward();
        return nextScore;
      });
      setActivePot(null);
      setBursts((current) => [...current, { id: burstId, pot }]);

      if (burstTimerRef.current) window.clearTimeout(burstTimerRef.current);
      burstTimerRef.current = window.setTimeout(() => {
        setBursts((current) => current.filter((burst) => burst.id !== burstId));
      }, 700);
      return;
    }

    setCryPot(pot);
    if (cryTimerRef.current) window.clearTimeout(cryTimerRef.current);
    cryTimerRef.current = window.setTimeout(() => setCryPot(null), 520);
  };

  return (
    <section id="mandrake-harvest" className="section-base relative">
      <AnimatePresence>
        {showReward && (
          <motion.div
            className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/78 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="relative flex w-full max-w-[500px] flex-col items-center rounded-[1.6rem] border bg-[#08060e]/90 p-4 text-center shadow-[0_0_50px_rgba(0,0,0,0.72)] sm:p-5"
              style={{ borderColor: 'color-mix(in srgb, var(--house-accent) 32%, transparent)' }}
            >
              {['\u{1F496}', '\u2726', '\u2728', '\u{1F495}'].map((item, index) => (
                <motion.span
                  key={`${item}-${index}`}
                  className="absolute text-xl sm:text-2xl"
                  style={{
                    left: `${10 + index * 24}%`,
                    top: `${10 + (index % 2) * 74}%`,
                    color: 'var(--house-accent)',
                    textShadow: '0 0 18px var(--house-glow)',
                  }}
                  animate={{ y: [0, -10, 0], opacity: [0.72, 1, 0.72] }}
                  transition={{ duration: 3.4 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {item}
                </motion.span>
              ))}

              <div
                className="relative aspect-[4/3] w-full max-w-[min(82vw,420px)] overflow-hidden rounded-[1.35rem] border-2"
                style={{
                  borderColor: 'var(--house-accent)',
                  boxShadow: '0 0 24px var(--house-glow), 0 0 46px rgba(0,0,0,0.7)',
                }}
              >
                <Image
                  src="/assets/images/love_you.jpg"
                  alt="Love You"
                  fill
                  sizes="(max-width: 768px) 82vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>

              <motion.h3
                className="mt-4 font-cinzel text-4xl font-black leading-none shimmer-text sm:text-5xl"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.16, duration: 0.24 }}
              >
                {'\u{1F496}'} Love You {'\u{1F496}'}
              </motion.h3>

              <p className="mt-3 max-w-sm font-raleway text-xs leading-relaxed text-[#f4dfb4] sm:text-sm">
                Ten Mandrakes harvested. The greenhouse is quiet, and this little spell is yours.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="spell-button rounded-full px-5 py-2.5 font-cinzel text-xs font-bold uppercase tracking-wider"
                  style={{
                    color: 'var(--house-accent)',
                    border: '1px solid var(--house-accent)',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  Play Again
                </button>
                <button
                  type="button"
                  onClick={() => setShowReward(false)}
                  className="rounded-full px-5 py-2.5 font-raleway text-xs font-semibold"
                  style={{ color: '#d8caa5', border: '1px solid rgba(255,255,255,0.14)' }}
                >
                  Keep Playing Later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 font-cinzel text-xs uppercase tracking-[0.5em]" style={{ color: 'var(--house-accent)' }}>
            Greenhouse Trial
          </p>
          <h2 className="font-cinzel text-4xl font-bold text-[#e8dcc8] md:text-5xl">
            Mandrake Harvest
          </h2>
          <div className="section-divider" />
          <p className="mx-auto mt-4 max-w-md font-raleway text-sm text-[#7a6a4a]">
            Tap the crying Mandrakes before they dive back into the soil.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="magical-card relative overflow-hidden rounded-2xl border p-5 sm:p-7"
            style={{
              borderColor: 'color-mix(in srgb, var(--house-accent) 25%, transparent)',
              background:
                'radial-gradient(circle at 50% 20%, var(--house-glow), transparent 30%), linear-gradient(180deg, rgba(29,20,12,0.84), rgba(8,6,5,0.92))',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.46), 0 0 28px var(--house-glow)',
            }}
          >
            <div className="relative z-10 mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-cinzel text-xs uppercase tracking-[0.32em]" style={{ color: 'var(--house-accent)' }}>
                  Harvest score
                </p>
                <p className="mt-1 font-raleway text-xs text-[#7a6a4a]">
                  Goal: {WIN_SCORE} Mandrakes
                </p>
              </div>
              <div className="rounded-full px-4 py-2 font-cinzel text-sm font-bold" style={{ color: 'var(--house-accent)', border: '1px solid var(--house-accent)35' }}>
                {score} / {WIN_SCORE}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-5">
              {[...Array(POT_COUNT)].map((_, pot) => {
                const active = activePot === pot;
                const crying = cryPot === pot;
                const potBursts = bursts.filter((burst) => burst.pot === pot);

                return (
                  <button
                    key={pot}
                    type="button"
                    onClick={() => hitPot(pot)}
                    className="relative h-36 overflow-visible rounded-2xl focus:outline-none sm:h-40"
                    aria-label={`Mandrake pot ${pot + 1}`}
                  >
                    <AnimatePresence>
                      {crying && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -10, scale: 1 }}
                          exit={{ opacity: 0, y: -22, scale: 0.9 }}
                          className="absolute left-1/2 top-0 z-30 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 font-cinzel text-[10px] font-bold"
                          style={{ background: 'var(--house-muted)', color: 'var(--house-accent)', border: '1px solid var(--house-accent)40' }}
                        >
                          WAAAAAH
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {potBursts.map((burst) => (
                        <motion.span
                          key={burst.id}
                          initial={{ opacity: 1, y: 18, scale: 0.4 }}
                          animate={{ opacity: 0, y: -38, scale: 1.15 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.7 }}
                          className="absolute left-1/2 top-8 z-40 -translate-x-1/2 text-xl"
                          style={{ color: 'var(--house-accent)', textShadow: '0 0 12px var(--house-accent)' }}
                        >
                          +1
                        </motion.span>
                      ))}
                    </AnimatePresence>

                    <div className="absolute bottom-0 left-1/2 h-16 w-24 -translate-x-1/2 rounded-b-[2rem] rounded-t-xl border border-[#5a3922] bg-[#3a2418] shadow-[inset_0_10px_18px_rgba(255,255,255,0.05),0_12px_20px_rgba(0,0,0,0.35)]" />
                    <div className="absolute bottom-12 left-1/2 h-6 w-28 -translate-x-1/2 rounded-full border border-[#6c4529] bg-[#4a2d1c]" />
                    <div className="absolute bottom-14 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#1f130d]" />

                    <motion.div
                      className="absolute bottom-14 left-1/2 z-20 flex w-20 -translate-x-1/2 flex-col items-center"
                      initial={false}
                      animate={active ? { y: -50, opacity: 1, rotate: [0, -2, 2, 0] } : { y: 8, opacity: 0, rotate: 0 }}
                      transition={{ duration: active ? 0.32 : 0.22, ease: 'easeOut', rotate: { duration: 0.5, repeat: 1 } }}
                    >
                      <div className="relative h-16 w-14 rounded-[45%] bg-[#d7b16b] shadow-[0_0_14px_rgba(215,177,107,0.35)]">
                        <div className="absolute left-3 top-5 h-1.5 w-1.5 rounded-full bg-[#23140e]" />
                        <div className="absolute right-3 top-5 h-1.5 w-1.5 rounded-full bg-[#23140e]" />
                        <div className="absolute left-1/2 top-9 h-2 w-6 -translate-x-1/2 rounded-b-full border-b-2 border-[#6c3e25]" />
                        <div className="absolute -left-4 top-7 h-9 w-3 rotate-[-25deg] rounded-full bg-[#b9854a]" />
                        <div className="absolute -right-4 top-7 h-9 w-3 rotate-[25deg] rounded-full bg-[#b9854a]" />
                        <div className="absolute -top-5 left-1 h-8 w-3 rotate-[-32deg] rounded-full bg-[#527f38]" />
                        <div className="absolute -top-6 left-5 h-9 w-3 rounded-full bg-[#6c9d45]" />
                        <div className="absolute -top-5 right-1 h-8 w-3 rotate-[32deg] rounded-full bg-[#527f38]" />
                      </div>
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card rounded-2xl p-5"
            style={{ border: '1px solid var(--house-accent)20' }}
          >
            <AnimatePresence mode="wait">
              {won ? (
                <motion.div
                  key="win"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-4 aspect-square w-40 overflow-hidden rounded-2xl border sm:w-48" style={{ borderColor: 'var(--house-accent)' }}>
                    <Image
                      src="/assets/images/love_you.jpg"
                      alt="Love You"
                      fill
                      sizes="192px"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-cinzel text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--house-accent)' }}>
                    Greenhouse cleared
                  </p>
                  <h3 className="mt-2 font-cinzel text-3xl font-bold shimmer-text">
                    Love You
                  </h3>
                  <p className="mt-3 font-raleway text-sm leading-relaxed text-[#c9b89a]">
                    Ten Mandrakes harvested. The greenhouse is finally quiet again.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="spell-button mt-5 rounded-full px-5 py-2 font-cinzel text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--house-accent)', border: '1px solid var(--house-accent)' }}
                  >
                    Play Again
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="rules"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-cinzel text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--house-accent)' }}>
                    How to play
                  </p>
                  <h3 className="mt-2 font-cinzel text-2xl font-bold text-[#e8dcc8]">
                    Pull fast. Ignore empty pots.
                  </h3>
                  <div className="mt-5 space-y-3 font-raleway text-sm leading-relaxed text-[#c9b89a]">
                    <p>Mandrakes pop up for a blink. Tap the one that appears to gain a point.</p>
                    <p>Tap an empty pot and it screams back at you.</p>
                    <p>Reach 10 points to reveal the reward.</p>
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="spell-button mt-6 rounded-full px-5 py-2 font-cinzel text-xs font-bold uppercase tracking-wider"
                    style={{ color: 'var(--house-accent)', border: '1px solid var(--house-accent)' }}
                  >
                    Restart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
