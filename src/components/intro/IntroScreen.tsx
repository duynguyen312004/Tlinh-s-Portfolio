'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HouseName, HOUSE_CONFIGS } from '@/lib/houseConfig';
import { useHouse } from '@/context/HouseContext';
import Starfield from '@/components/ui/Starfield';

const HOUSES: HouseName[] = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
const MUSIC_VOLUME = 0.75;

type AudioWindow = Window & {
  __hp_audio?: HTMLAudioElement;
};

type Phase = 'landing' | 'sorting' | 'chosen' | 'entering';

export default function IntroScreen() {
  const { selectHouse, setIsEntered } = useHouse();
  const [phase, setPhase] = useState<Phase>('landing');
  const [chosen, setChosen] = useState<HouseName | null>(null);
  const [hoveredHouse, setHoveredHouse] = useState<HouseName | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startSorting = () => setPhase('sorting');

  const handleHouseSelect = (house: HouseName) => {
    setChosen(house);
    selectHouse(house);
    setPhase('chosen');
  };

  const handleEnter = () => {
    setPhase('entering');
    // Start music
    const audioWindow = window as AudioWindow;
    const audio = audioWindow.__hp_audio ?? new Audio('/assets/audio/hedwigs-theme.mp3');
    audio.loop = true;
    audio.volume = MUSIC_VOLUME;
    audio.muted = false;
    audioRef.current = audio;
    audio.play().catch(() => {});

    // Store audio globally for AudioPlayer toggle
    audioWindow.__hp_audio = audio;

    setTimeout(() => {
      setIsEntered(true);
    }, 1200);
  };

  const chosenConfig = chosen ? HOUSE_CONFIGS[chosen] : null;

  return (
    <AnimatePresence>
      {phase !== 'entering' || true ? (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#08060e' }}
          animate={phase === 'entering' ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            if (phase === 'entering') setIsEntered(true);
          }}
        >
          <Starfield />

          {/* Floating orbs – deterministic sizes to avoid hydration mismatch */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {([140, 200, 100, 180, 120] as const).map((size, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${10 + i * 20}%`,
                  top: `${10 + i * 15}%`,
                  background: `radial-gradient(circle, var(--house-accent), transparent)`,
                  animation: `orbFloat ${5 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}
          </div>

          {/* PHASE: Landing */}
          <AnimatePresence mode="wait">
            {phase === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-8 text-center px-6 z-10"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                >
                  <p className="text-[var(--house-accent)] text-sm tracking-[0.4em] uppercase mb-3 font-cinzel">
                    Welcome to the Wizarding World
                  </p>
                  <h1
                    className="text-5xl md:text-7xl font-cinzel font-bold mb-2"
                    style={{
                      background: 'linear-gradient(135deg, #c9a84c 0%, #fff5d7 50%, #c9a84c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Thảo Linh
                  </h1>
                  <p className="text-[#a09070] font-raleway text-lg md:text-xl mt-4 max-w-md leading-relaxed">
                    A portfolio enchanted with ambition, curiosity & a touch of magic
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="flex flex-col items-center gap-4"
                >
                  <p className="text-[#7a6a4a] text-sm font-raleway italic">
                    First, let the Sorting Hat decide your path...
                  </p>
                  <motion.button
                    onClick={startSorting}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(201, 168, 76, 0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    className="spell-button px-10 py-4 font-cinzel text-base tracking-widest uppercase rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: 'var(--house-accent)',
                      color: 'var(--house-accent)',
                      background: 'rgba(201, 168, 76, 0.08)',
                    }}
                  >
                    ✦ Try the Sorting Hat ✦
                  </motion.button>
                </motion.div>

                {/* Sorting hat icon */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, -3, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="mt-4"
                >
                  <Image
                    src="/assets/images/sorting-hat.png"
                    alt="Sorting Hat"
                    width={90}
                    height={90}
                    style={{ filter: 'drop-shadow(0 0 16px rgba(201,168,76,0.5))' }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* PHASE: Sorting – choose house */}
            {phase === 'sorting' && (
              <motion.div
                key="sorting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center gap-8 text-center px-4 z-10 max-w-4xl w-full"
              >
                <motion.div
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Image
                    src="/assets/images/sorting-hat.png"
                    alt="Sorting Hat"
                    width={80}
                    height={80}
                    style={{ filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.7))' }}
                  />
                </motion.div>

                <div>
                  <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-[#e8d9b0] mb-2">
                    Hmm... let me see...
                  </h2>
                  <p className="text-[#a09070] font-raleway">
                    {hoveredHouse
                      ? `"${HOUSE_CONFIGS[hoveredHouse].motto}"`
                      : 'Which house shall claim you?'}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {HOUSES.map((house) => {
                    const cfg = HOUSE_CONFIGS[house];
                    return (
                      <motion.button
                        key={house}
                        onClick={() => handleHouseSelect(house)}
                        onHoverStart={() => setHoveredHouse(house)}
                        onHoverEnd={() => setHoveredHouse(null)}
                        whileHover={{ scale: 1.06, y: -6 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: HOUSES.indexOf(house) * 0.1 + 0.2 }}
                        className="magical-card flex flex-col items-center gap-3 p-5 rounded-2xl glass-card border-2 transition-all duration-300"
                        style={{
                          borderColor: hoveredHouse === house ? cfg.accent : 'rgba(255,255,255,0.1)',
                          boxShadow: hoveredHouse === house ? `0 0 25px ${cfg.glow}` : 'none',
                        }}
                      >
                        <Image
                          src={cfg.crest}
                          alt={cfg.displayName}
                          width={72}
                          height={72}
                          className="object-contain"
                        />
                        <span
                          className="font-cinzel font-bold text-sm tracking-wider"
                          style={{ color: hoveredHouse === house ? cfg.accent : '#c9b89a' }}
                        >
                          {cfg.displayName}
                        </span>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {cfg.traits.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-full font-raleway"
                              style={{
                                background: `${cfg.primary}60`,
                                color: cfg.accent,
                                border: `1px solid ${cfg.accent}40`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* PHASE: Chosen */}
            {phase === 'chosen' && chosenConfig && (
              <motion.div
                key="chosen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
                className="flex flex-col items-center gap-8 text-center px-6 z-10"
              >
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  <Image
                    src={chosenConfig.crest}
                    alt={chosenConfig.displayName}
                    width={120}
                    height={120}
                    style={{ filter: `drop-shadow(0 0 30px ${chosenConfig.glow})` }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-lg font-cinzel tracking-widest uppercase mb-2" style={{ color: chosenConfig.accent }}>
                    The Sorting Hat has spoken!
                  </p>
                  <h2
                    className="text-5xl md:text-6xl font-cinzel font-bold"
                    style={{ color: chosenConfig.accent, textShadow: `0 0 40px ${chosenConfig.glow}` }}
                  >
                    {chosenConfig.displayName}!
                  </h2>
                  <p className="text-[#a09070] font-raleway mt-4 italic text-base max-w-sm mx-auto">
                    &quot;{chosenConfig.motto}&quot;
                  </p>
                </motion.div>

                <motion.button
                  onClick={handleEnter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${chosenConfig.glow}` }}
                  whileTap={{ scale: 0.97 }}
                  className="spell-button px-12 py-4 font-cinzel text-base font-bold tracking-widest uppercase rounded-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${chosenConfig.primary}, ${chosenConfig.muted})`,
                    color: chosenConfig.accent,
                    border: `2px solid ${chosenConfig.accent}`,
                    boxShadow: `0 0 20px ${chosenConfig.glow}`,
                  }}
                >
                  ✦ Enter the Wizarding World ✦
                </motion.button>

                <motion.button
                  onClick={() => { setChosen(null); setPhase('sorting'); }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-[#5a4a3a] text-sm font-raleway hover:text-[#a09070] transition-colors"
                >
                  ↩ Choose again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
