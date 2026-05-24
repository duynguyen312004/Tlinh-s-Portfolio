'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolioData';
import HiddenStar from '@/components/minigame/HiddenStar';

const SKILL_GROUPS = [
  {
    key: 'business' as const,
    label: 'Business',
    icon: '📊',
    description: 'Core professional skills',
  },
  {
    key: 'tools' as const,
    label: 'Tools & Software',
    icon: '🛠',
    description: 'Productivity & design tools',
  },
  {
    key: 'languages' as const,
    label: 'Languages',
    icon: '🌏',
    description: 'Communication proficiency',
  },
  {
    key: 'professional' as const,
    label: 'Soft Skills',
    icon: '✨',
    description: 'People & interpersonal skills',
  },
];

export default function SkillsSection() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="section-base relative">
      <HiddenStar id="star-skills" className="bottom-20 left-[5%]" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-cinzel tracking-[0.5em] uppercase mb-3" style={{ color: 'var(--house-accent)' }}>
            Chapter III
          </p>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#e8dcc8]">
            Spells & Abilities
          </h2>
          <div className="mx-auto mt-4 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--house-accent), transparent)' }} />
          <p className="text-[#7a6a4a] font-raleway text-sm mt-4">
            The enchantments mastered through study and experience
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
              style={{ border: '1px solid var(--house-accent)15' }}
            >
              {/* background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top left, var(--house-glow) 0%, transparent 60%)' }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h3 className="font-cinzel font-bold text-sm tracking-wide" style={{ color: 'var(--house-accent)' }}>
                      {group.label}
                    </h3>
                    <p className="text-[10px] text-[#5a4a3a] font-raleway">{group.description}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills[group.key].map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + si * 0.05 }}
                      whileHover={{ scale: 1.08 }}
                      className="px-3 py-1.5 rounded-full text-xs font-raleway font-medium house-transition"
                      style={{
                        background: 'var(--house-muted)',
                        color: '#c9b89a',
                        border: '1px solid var(--house-accent)25',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* House crests decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6 mt-12 opacity-20"
        >
          {['/assets/images/gryffindor.png', '/assets/images/ravenclaw.png', '/assets/images/hufflepuff.png', '/assets/images/slytherin.png'].map((src) => (
            <img key={src} src={src} alt="" width={32} height={32} className="object-contain" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
