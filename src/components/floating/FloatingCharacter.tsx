'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const DIALOGUES: Record<string, string[]> = {
  home: ['Lumos. Welcome in.', 'A little magic, a lot of focus.'],
  about: ['A good story starts with curiosity.', 'Now this is where the character arc begins.'],
  skills: ['A neat set of spells.', 'These tools are ready for the next challenge.'],
  experience: ['Every chapter adds proof.', 'Practice turns effort into confidence.'],
  projects: ['This shelf has some strong work.', 'The best projects always leave a trace.'],
  contact: ['Time to send a note.', 'The next collaboration can start here.'],
};

const SECTION_MOTION: Record<string, { x: number; y: number; scale: number }> = {
  home: { x: 0, y: 0, scale: 1 },
  about: { x: -12, y: -18, scale: 0.98 },
  skills: { x: -28, y: -4, scale: 1.02 },
  experience: { x: -8, y: -34, scale: 0.96 },
  projects: { x: -34, y: -20, scale: 1.03 },
  contact: { x: 0, y: -10, scale: 1 },
};

export default function FloatingCharacter({ currentSection }: { currentSection: string }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);

  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setDialogueIndex(0);
      setShowDialogue(true);
    }, 0);
    const hideTimer = window.setTimeout(() => setShowDialogue(false), 5200);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [currentSection]);

  const dialogues = DIALOGUES[currentSection] || DIALOGUES.home;
  const currentDialogue = dialogues[dialogueIndex % dialogues.length];
  const sectionMotion = SECTION_MOTION[currentSection] || SECTION_MOTION.home;

  const nextDialogue = () => {
    setDialogueIndex((i) => (i + 1) % dialogues.length);
    setShowDialogue(true);
  };

  return (
    <motion.div
      animate={sectionMotion}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="fixed bottom-6 right-6 z-50 hidden sm:flex flex-col items-end gap-2"
    >
      <AnimatePresence>
        {showDialogue && (
          <motion.div
            key={currentDialogue}
            initial={{ opacity: 0, scale: 0.88, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 10 }}
            transition={{ duration: 0.24 }}
            className="max-w-[210px] text-sm font-raleway px-4 py-3 rounded-2xl rounded-br-sm glass-card glow-border text-[#e8dcc8] leading-relaxed relative"
            style={{ fontSize: '12px' }}
          >
            {currentDialogue}
            <div
              className="absolute -bottom-2 right-4 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '8px solid rgba(255,255,255,0.08)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <button
          onClick={nextDialogue}
          title="Click for another note"
          aria-label="Show another note"
          className="magical-card block w-16 h-16 rounded-full overflow-hidden glow-border transition-transform duration-300"
          style={{ boxShadow: '0 0 20px var(--house-glow)' }}
        >
          <Image
            src="/assets/images/hermione-face.png"
            alt="Hermione"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </button>

        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full pulse-glow"
          style={{ background: 'var(--house-accent)' }}
        />
      </motion.div>
    </motion.div>
  );
}
