'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolioData';
import HiddenStar from '@/components/minigame/HiddenStar';

const SOCIALS = [
  { label: 'LinkedIn',  icon: '💼', href: 'https://linkedin.com' },
  { label: 'Facebook',  icon: '📘', href: 'https://facebook.com' },
  { label: 'GitHub',    icon: '🐙', href: 'https://github.com' },
];

export default function ContactSection() {
  const { personal } = portfolioData;

  return (
    <section id="contact" className="section-base relative">
      <HiddenStar id="star-contact" className="top-16 left-[20%]" />

      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-xs font-cinzel tracking-[0.5em] uppercase mb-3" style={{ color: 'var(--house-accent)' }}>
            Chapter VI
          </p>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#e8dcc8]">
            Send an Owl
          </h2>
          <div className="mx-auto mt-4 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--house-accent), transparent)' }} />
          <p className="text-[#7a6a4a] font-raleway text-sm mt-4 max-w-md mx-auto">
            Ready to collaborate? Whether it's an internship, project, or just a magical conversation — reach out!
          </p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card p-10 rounded-3xl relative overflow-hidden"
          style={{ border: '1px solid var(--house-accent)20' }}
        >
          {/* BG orb */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--house-glow), transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Owl illustration */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl"
            >
              🦉
            </motion.div>

            <div>
              <p className="font-raleway text-[#7a6a4a] text-sm mb-2">Dispatch your owl to</p>
              <a
                href={`mailto:${personal.email}`}
                className="font-cinzel text-xl md:text-2xl font-bold house-transition hover:scale-105 inline-block transition-transform duration-300"
                style={{ color: 'var(--house-accent)', textShadow: '0 0 20px var(--house-glow)' }}
              >
                {personal.email}
              </a>
            </div>

            {/* Email CTA */}
            <motion.a
              href={`mailto:${personal.email}?subject=Hello from your Portfolio!`}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--house-glow)' }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 font-cinzel text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--house-primary), var(--house-muted))',
                color: 'var(--house-accent)',
                border: '2px solid var(--house-accent)',
                boxShadow: '0 0 20px var(--house-glow)',
              }}
            >
              ✉ Compose a Letter
            </motion.a>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[#4a3a2a] text-xs font-raleway">or find me here</span>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl glass-card transition-all duration-300"
                  style={{ border: '1px solid var(--house-accent)20' }}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[10px] font-raleway text-[#6a5a4a]">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
