'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/lib/portfolioData';
import HiddenStar from '@/components/minigame/HiddenStar';

export default function ExperienceSection() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="section-base relative">
      <HiddenStar id="star-experience" className="top-24 right-[12%]" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-cinzel tracking-[0.5em] uppercase mb-3" style={{ color: 'var(--house-accent)' }}>
            Chapter IV
          </p>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#e8dcc8]">
            Magical Journey
          </h2>
          <div className="mx-auto mt-4 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--house-accent), transparent)' }} />
          <p className="text-[#7a6a4a] font-raleway text-sm mt-4">
            Experiences that shaped the witch behind the portfolio
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--house-accent)50, transparent)' }}
          />

          <div className="space-y-10">
            {experience.map((exp, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative flex gap-4 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-6 md:left-1/2 top-4 w-3 h-3 rounded-full -translate-x-1/2 z-10 pulse-glow"
                    style={{ background: 'var(--house-accent)' }}
                  />

                  {/* Card */}
                  <div className={`ml-14 md:ml-0 ${isLeft ? 'md:mr-8 md:w-[45%]' : 'md:ml-8 md:w-[45%]'}`}>
                    <div
                      className="glass-card p-5 rounded-2xl group hover:scale-[1.02] transition-transform duration-300"
                      style={{ border: '1px solid var(--house-accent)15' }}
                    >
                      {/* Role */}
                      <h3 className="font-cinzel font-bold text-sm leading-snug" style={{ color: 'var(--house-accent)' }}>
                        {exp.role}
                      </h3>
                      {exp.organization && (
                        <p className="text-[#8a7a5a] font-raleway text-xs mt-0.5 font-medium">
                          @ {exp.organization}
                        </p>
                      )}
                      {exp.field && (
                        <p className="text-[#5a4a3a] font-raleway text-[10px] mt-0.5 italic">
                          {exp.field}
                        </p>
                      )}

                      {/* Responsibilities */}
                      <ul className="mt-3 space-y-1.5">
                        {exp.responsibilities.map((r, ri) => (
                          <li key={ri} className="flex gap-2 text-xs font-raleway text-[#c9b89a] leading-snug">
                            <span className="mt-0.5 shrink-0" style={{ color: 'var(--house-accent)' }}>›</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.results && (
                        <div
                          className="mt-3 p-2.5 rounded-lg text-[10px] font-raleway text-[#a09070] italic leading-relaxed"
                          style={{ background: 'var(--house-muted)', border: '1px solid var(--house-accent)20' }}
                        >
                          ✦ {exp.results}
                        </div>
                      )}

                      {/* Skills */}
                      <div className="mt-3 flex flex-wrap gap-1">
                        {exp.skillsDemonstrated.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-full text-[10px] font-raleway"
                            style={{
                              background: 'var(--house-muted)',
                              color: 'var(--house-accent)',
                              border: '1px solid var(--house-accent)20',
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
