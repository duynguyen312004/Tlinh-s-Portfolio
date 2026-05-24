'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolioData';
import HiddenStar from '@/components/minigame/HiddenStar';

type Tab = 'intro' | 'education' | 'achievements';

export default function AboutSection() {
  const [tab, setTab] = useState<Tab>('intro');
  const { personal, education } = portfolioData;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'intro',        label: 'Who I Am',    icon: '🪄' },
    { id: 'education',    label: 'Education',   icon: '📖' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
  ];

  return (
    <section id="about" className="section-base relative">
      <HiddenStar id="star-about" className="top-12 right-[8%]" />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-cinzel tracking-[0.5em] uppercase mb-3" style={{ color: 'var(--house-accent)' }}>
            Chapter I
          </p>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#e8dcc8]">
            About the Witch
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* Left: portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 flex flex-col items-center gap-5"
          >
            <div
              className="magical-card relative w-52 h-64 md:w-60 md:h-72 rounded-2xl overflow-hidden"
              style={{ border: '2px solid var(--house-accent)60', boxShadow: '0 0 40px var(--house-glow)' }}
            >
              <Image
                src="/assets/images/linh-portrait.jpg"
                alt="Nguyễn Thảo Linh"
                fill
                sizes="(max-width: 768px) 208px, 240px"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, var(--house-bg) 0%, transparent 40%)' }}
              />
              <p className="absolute bottom-3 left-0 right-0 text-center font-cinzel text-sm font-bold" style={{ color: 'var(--house-accent)' }}>
                Nguyễn Thảo Linh
              </p>
            </div>

            {/* Quick stats */}
            <div className="w-full grid grid-cols-2 gap-3">
              {[
                { label: 'GPA', value: education.gpa },
                { label: 'Year', value: '3rd Year' },
                { label: 'IELTS', value: '7.0' },
                { label: 'MOS', value: '3 Skills' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="magical-card glass-card p-3 rounded-xl text-center"
                  style={{ border: '1px solid var(--house-accent)20' }}
                >
                  <p className="text-xs text-[#6a5a4a] font-raleway uppercase tracking-wider">{label}</p>
                  <p className="font-cinzel font-bold text-sm mt-0.5" style={{ color: 'var(--house-accent)' }}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: tab content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-3 flex flex-col gap-6"
          >
            {/* Tabs */}
            <div className="flex gap-2 p-1 rounded-xl glass-card w-fit">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="spell-button px-4 py-2 rounded-lg text-xs font-cinzel font-bold tracking-wide transition-all duration-300"
                  style={
                    tab === t.id
                      ? { background: 'var(--house-muted)', color: 'var(--house-accent)', border: '1px solid var(--house-accent)50' }
                      : { color: '#6a5a4a' }
                  }
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>

            {/* Tab: Who I Am */}
            {tab === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="magical-card glass-card p-6 rounded-2xl"
                style={{ border: '1px solid var(--house-accent)15' }}
              >
                <p className="font-raleway text-[#c9b89a] text-sm leading-7">
                  {personal.introduction}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {personal.careerOrientations.map((o) => (
                    <span
                      key={o}
                      className="magical-card px-3 py-1 rounded-full text-xs font-raleway font-medium"
                      style={{
                        background: 'var(--house-muted)',
                        color: 'var(--house-accent)',
                        border: '1px solid var(--house-accent)30',
                      }}
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab: Education */}
            {tab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="magical-card glass-card p-6 rounded-2xl space-y-4"
                style={{ border: '1px solid var(--house-accent)15' }}
              >
                <div>
                  <p className="font-cinzel font-bold text-base" style={{ color: 'var(--house-accent)' }}>
                    {education.university}
                  </p>
                  <p className="text-[#c9b89a] font-raleway text-sm mt-1">{education.major}</p>
                  <p className="text-[#7a6a4a] font-raleway text-xs mt-1">{education.currentYear} · GPA: {education.gpa}</p>
                </div>
                <div>
                  <p className="text-xs font-cinzel tracking-wider uppercase mb-2" style={{ color: 'var(--house-accent)80' }}>
                    Certifications
                  </p>
                  <ul className="space-y-1.5">
                    {education.certifications.map((c) => (
                      <li key={c} className="flex items-center gap-2 font-raleway text-sm text-[#c9b89a]">
                        <span style={{ color: 'var(--house-accent)' }}>✦</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Tab: Achievements */}
            {tab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="magical-card glass-card p-6 rounded-2xl space-y-3"
                style={{ border: '1px solid var(--house-accent)15' }}
              >
                {education.achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 p-3 rounded-xl"
                    style={{ background: 'var(--house-muted)' }}
                  >
                    <span className="text-xl mt-0.5">🏅</span>
                    <p className="font-raleway text-sm text-[#c9b89a] leading-relaxed">{a}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
