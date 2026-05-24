'use client';

import { motion } from 'framer-motion';
import { mockProjects } from '@/lib/mockProjects';
import HiddenStar from '@/components/minigame/HiddenStar';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-base relative">
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
            Chapter V
          </p>
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-[#e8dcc8]">
            Enchanted Works
          </h2>
          <div className="section-divider" />
          <p className="text-[#7a6a4a] font-raleway text-sm mt-4">
            Spells cast in the real world
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 relative">
          <HiddenStar id="star-projects" style={{ top: '-20px', right: '20px' }} />

          {mockProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="magical-card glass-card p-6 rounded-2xl flex flex-col gap-4 group relative overflow-hidden"
              style={{ border: '1px solid var(--house-accent)15' }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at top right, var(--house-glow) 0%, transparent 60%)' }}
              />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Icon + Status */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl">{project.icon}</span>
                  <span
                    className="magical-card px-2.5 py-1 rounded-full text-[10px] font-cinzel font-bold tracking-wider"
                    style={{
                      background: 'var(--house-muted)',
                      color: 'var(--house-accent)',
                      border: '1px solid var(--house-accent)30',
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cinzel font-bold text-sm leading-snug text-[#e8dcc8]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-raleway text-xs text-[#9a8a70] leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="magical-card px-2.5 py-0.5 rounded-full text-[10px] font-raleway"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        color: '#7a6a4a',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
