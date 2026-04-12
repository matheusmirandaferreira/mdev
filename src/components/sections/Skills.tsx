import { useRef } from 'react'
import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { skillGroups } from '@/data/portfolio'

export function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  return (
    <SectionWrapper id="skills">
      <div ref={ref}>
        <p className="section-number">02 / SKILLS</p>
        <h2 className="mb-10 font-display text-3xl font-extrabold tracking-tight text-foreground">
          O que domino
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: groupIndex * 0.08 }}
            >
              <p className="mb-3 text-[10px] font-semibold tracking-[2px] text-muted-foreground">
                {group.label.toUpperCase()}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-border bg-card px-3 py-1 text-xs text-accent transition-colors hover:border-neon-blue hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
