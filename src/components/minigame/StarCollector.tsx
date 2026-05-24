'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useStar } from '@/context/StarContext';

export default function StarCollector() {
  const { collectedCount, totalStars, isUnlocked } = useStar();

  const handleDownload = () => {
    // Placeholder: replace with actual CV link when available
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'NguyenThaoLinh_CV.pdf';
    alert('✨ CV download coming soon! This is a placeholder. ✨');
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Star counter */}
      <motion.div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card"
        style={{ border: '1px solid var(--house-accent)40' }}
        animate={isUnlocked ? { boxShadow: ['0 0 10px var(--house-glow)', '0 0 30px var(--house-glow)', '0 0 10px var(--house-glow)'] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-sm">⭐</span>
        <span className="font-cinzel text-xs font-bold" style={{ color: 'var(--house-accent)' }}>
          {collectedCount} / {totalStars}
        </span>
        <div className="flex gap-0.5">
          {[...Array(totalStars)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-500"
              style={{
                background: i < collectedCount ? 'var(--house-accent)' : 'rgba(255,255,255,0.1)',
                boxShadow: i < collectedCount ? '0 0 6px var(--house-accent)' : 'none',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Unlock hint */}
      {!isUnlocked && (
        <p className="text-[10px] text-[#5a4a3a] font-raleway text-right pr-1">
          Find {totalStars - collectedCount} more star{totalStars - collectedCount !== 1 ? 's' : ''} to unlock CV ✨
        </p>
      )}

      {/* Download CV button */}
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
            className="px-4 py-2 rounded-full font-cinzel text-xs font-bold tracking-wider uppercase transition-all duration-300 pulse-glow"
            style={{
              background: 'linear-gradient(135deg, var(--house-primary), var(--house-muted))',
              color: 'var(--house-accent)',
              border: '1px solid var(--house-accent)',
            }}
          >
            ✦ Download CV ✦
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
