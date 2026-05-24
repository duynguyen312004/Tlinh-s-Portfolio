'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

const DIALOGUES: Record<string, string[]> = {
  home:       ["Alohomora! Your journey begins here ✨", "Lumos! Let there be light 🪄"],
  about:      ["Ah, learning about the witch behind the portfolio! 📖", "Every great witch has a fascinating story 🦉"],
  skills:     ["Quite the arsenal of spells! 🔮", "These skills would impress even Professor McGonagall 😊"],
  experience: ["Every challenge is practice for the real thing 🏆", "Experience is the greatest teacher of all 📜"],
  projects:   ["Brilliant work! Truly magical projects ✦", "Even Hermione would be impressed! 🌟"],
  contact:    ["Don't be a stranger! Send an owl... or an email 📨", "The wizarding world awaits your message! 💌"],
};

export default function FloatingCharacter({ currentSection }: { currentSection: string }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setDialogueIndex(0);
    setShowDialogue(true);
    const timer = setTimeout(() => setShowDialogue(false), 5000);
    return () => clearTimeout(timer);
  }, [currentSection]);

  const dialogues = DIALOGUES[currentSection] || DIALOGUES['home'];
  const currentDialogue = dialogues[dialogueIndex % dialogues.length];

  const nextDialogue = () => {
    setDialogueIndex((i) => (i + 1) % dialogues.length);
    setShowDialogue(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Speech bubble */}
      <AnimatePresence>
        {showDialogue && !isMinimized && (
          <motion.div
            key={currentDialogue}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            className="max-w-[200px] text-sm font-raleway px-4 py-3 rounded-2xl rounded-br-sm glass-card glow-border text-[#e8dcc8] leading-relaxed relative"
            style={{ fontSize: '12px' }}
          >
            {currentDialogue}
            {/* bubble tail */}
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

      {/* Character */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <button
          onClick={() => {
            if (isMinimized) {
              setIsMinimized(false);
              setShowDialogue(true);
            } else {
              nextDialogue();
            }
          }}
          onDoubleClick={() => setIsMinimized((m) => !m)}
          title="Click for dialogue · Double-click to minimize"
          className="block w-16 h-16 rounded-full overflow-hidden glow-border hover:scale-110 transition-transform duration-300"
          style={{ boxShadow: '0 0 20px var(--house-glow)' }}
        >
          <img
            src="/assets/images/hermione-face.png"
            alt="Hermione"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </button>

        {/* Section indicator dot */}
        <div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full pulse-glow"
          style={{ background: 'var(--house-accent)' }}
        />
      </motion.div>

      {isMinimized && (
        <p className="text-[10px] text-[#5a4a3a] font-raleway">double-click to show</p>
      )}
    </div>
  );
}
