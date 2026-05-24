'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStar } from '@/context/StarContext';

interface HiddenStarProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function HiddenStar({ id, className = '', style }: HiddenStarProps) {
  const { collectStar, collectedIds } = useStar();
  const [collected, setCollected] = useState(false);
  const [showHint, setShowHint] = useState(false);

  if (collectedIds.has(id) || collected) return null;

  const handleCollect = () => {
    setCollected(true);
    collectStar(id);
  };

  return (
    <div className={`absolute ${className}`} style={style}>
      <AnimatePresence>
        {!collected && (
          <motion.button
            title="A hidden star! Click to collect ✨"
            onClick={handleCollect}
            onHoverStart={() => setShowHint(true)}
            onHoverEnd={() => setShowHint(false)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 10, -10, 0],
              opacity: [0.5, 0.9, 0.5],
            }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.4, opacity: 1 }}
            whileTap={{ scale: 0 }}
            className="text-2xl relative focus:outline-none"
            style={{
              filter: 'drop-shadow(0 0 8px var(--house-accent))',
              color: 'var(--house-accent)',
            }}
          >
            ⭐
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: -10 }}
                  exit={{ opacity: 0 }}
                  className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-raleway px-2 py-0.5 rounded-full glass-card"
                  style={{ color: 'var(--house-accent)', border: '1px solid var(--house-accent)' }}
                >
                  Collect me!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
