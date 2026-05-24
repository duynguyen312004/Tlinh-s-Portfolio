'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStar } from '@/context/StarContext';

export default function StarCollector() {
  const { collectedCount, totalStars, isUnlocked } = useStar();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'NguyenThaoLinh_CV.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="fixed right-3 top-16 z-20 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:right-4 sm:top-20 lg:right-6 lg:top-24">
      <motion.div
        className="flex items-center gap-2 rounded-full glass-card px-2.5 py-1.5 sm:px-3"
        style={{ border: '1px solid var(--house-accent)40' }}
        animate={isUnlocked ? { boxShadow: ['0 0 10px var(--house-glow)', '0 0 30px var(--house-glow)', '0 0 10px var(--house-glow)'] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-sm">★</span>
        <span className="font-cinzel text-xs font-bold" style={{ color: 'var(--house-accent)' }}>
          {collectedCount} / {totalStars}
        </span>
        <div className="flex gap-0.5">
          {[...Array(totalStars)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 rounded-full transition-all duration-500"
              style={{
                background: i < collectedCount ? 'var(--house-accent)' : 'rgba(255,255,255,0.1)',
                boxShadow: i < collectedCount ? '0 0 6px var(--house-accent)' : 'none',
              }}
            />
          ))}
        </div>
      </motion.div>

      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden max-w-[290px] items-center gap-2 rounded-full glass-card px-3 py-1.5 text-right sm:flex"
          style={{
            border: '1px solid var(--house-accent)30',
            boxShadow: '0 0 18px var(--house-glow)',
          }}
        >
          <span className="text-[11px]" style={{ color: 'var(--house-accent)' }}>✦</span>
          <p className="font-raleway text-xs font-semibold leading-snug text-[#c9b89a]">
            Find{' '}
            <span className="font-cinzel text-sm font-bold" style={{ color: 'var(--house-accent)' }}>
              {totalStars - collectedCount}
            </span>{' '}
            more star{totalStars - collectedCount !== 1 ? 's' : ''} to unlock CV
          </p>
        </motion.div>
      )}

      <AnimatePresence>
        {isUnlocked && (
          <motion.button
            onClick={handleDownload}
            initial={{ opacity: 0, scale: 0, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full px-4 py-2 font-cinzel text-xs font-bold uppercase tracking-wider transition-all duration-300 pulse-glow"
            style={{
              background: 'linear-gradient(135deg, var(--house-primary), var(--house-muted))',
              color: 'var(--house-accent)',
              border: '1px solid var(--house-accent)',
            }}
          >
            Download CV
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
