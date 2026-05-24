'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolioData';
import HiddenStar from '@/components/minigame/HiddenStar';

type SocialId = 'facebook' | 'instagram' | 'locket';

const SOCIALS: { id: SocialId; label: string; href: string }[] = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/linh.wizz.180' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/wizz._.311/' },
  { id: 'locket', label: 'Locket', href: 'https://locket.cam/selinaphoebe' },
];

function SocialIcon({ id }: { id: SocialId }) {
  if (id === 'facebook') {
    return (
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#1877f2] shadow-[0_0_18px_rgba(24,119,242,0.35)]">
        <span className="font-sans text-3xl font-black leading-none text-white" style={{ transform: 'translateY(3px)' }}>
          f
        </span>
      </span>
    );
  }

  if (id === 'instagram') {
    return (
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[radial-gradient(circle_at_30%_105%,#feda75_0%,#fa7e1e_24%,#d62976_48%,#962fbf_72%,#4f5bd5_100%)] shadow-[0_0_18px_rgba(214,41,118,0.32)]">
        <svg viewBox="0 0 36 36" className="h-7 w-7" aria-hidden="true">
          <rect x="8" y="8" width="20" height="20" rx="6" fill="none" stroke="white" strokeWidth="3.4" />
          <circle cx="18" cy="18" r="5.2" fill="none" stroke="white" strokeWidth="3.4" />
          <circle cx="24.7" cy="11.5" r="1.9" fill="white" />
        </svg>
      </span>
    );
  }

  return (
    <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#f8b900] shadow-[0_0_18px_rgba(248,185,0,0.35)]">
      <svg viewBox="0 0 36 36" className="h-6 w-6" aria-hidden="true">
        <path
          d="M18 29.5C10.2 23.5 6 19.3 6 14.1C6 10.9 8.5 8.5 11.7 8.5C14.1 8.5 16.3 9.9 18 12C19.7 9.9 21.9 8.5 24.3 8.5C27.5 8.5 30 10.9 30 14.1C30 19.3 25.8 23.5 18 29.5Z"
          fill="#b88900"
        />
      </svg>
    </span>
  );
}

export default function ContactSection() {
  const { personal } = portfolioData;
  const gmailHref = 'https://mail.google.com/mail/u/0/#inbox';

  return (
    <section id="contact" className="section-base relative">
      <HiddenStar id="star-contact" className="top-16 left-[20%]" />

      <div className="max-w-3xl mx-auto text-center">
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
          <div className="section-divider" />
          <p className="text-[#7a6a4a] font-raleway text-sm mt-4 max-w-md mx-auto">
            Ready to collaborate? Whether it&apos;s an internship, project, or just a magical conversation - reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="magical-card glass-card p-10 rounded-3xl relative overflow-hidden"
          style={{ border: '1px solid var(--house-accent)20' }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, var(--house-glow), transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl"
              style={{ filter: 'drop-shadow(0 0 18px var(--house-glow))' }}
              aria-hidden="true"
            >
              🦉
            </motion.div>

            <div>
              <p className="font-raleway text-[#7a6a4a] text-sm mb-2">Dispatch your note to</p>
              <span
                className="font-cinzel text-xl md:text-2xl font-bold house-transition inline-block"
                style={{ color: 'var(--house-accent)', textShadow: '0 0 20px var(--house-glow)' }}
              >
                {personal.email}
              </span>
            </div>

            <motion.a
              href={gmailHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px var(--house-glow)' }}
              whileTap={{ scale: 0.97 }}
              className="spell-button px-10 py-4 font-cinzel text-sm font-bold tracking-widest uppercase rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, var(--house-primary), var(--house-muted))',
                color: 'var(--house-accent)',
                border: '2px solid var(--house-accent)',
                boxShadow: '0 0 20px var(--house-glow)',
              }}
            >
              Compose a Letter
            </motion.a>

            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <span className="text-[#4a3a2a] text-xs font-raleway">or find me here</span>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="magical-card flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl glass-card transition-all duration-300"
                  style={{ border: '1px solid var(--house-accent)20' }}
                  aria-label={s.label}
                >
                  <SocialIcon id={s.id} />
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
