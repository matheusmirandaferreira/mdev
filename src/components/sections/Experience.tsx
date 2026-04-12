import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { experiences } from '@/data/portfolio'

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  return (
    <SectionWrapper id="experiencia">
      <div ref={ref}>
        <p className="section-number">04 / EXPERIÊNCIA</p>
        <h2 className="mb-10 font-display text-3xl font-extrabold tracking-tight text-foreground">
          Onde trabalhei
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neon-blue via-border to-transparent md:left-1/2" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={cn(
                    'relative pl-12 md:w-1/2 md:pl-0',
                    isLeft ? 'md:pr-10 md:self-start' : 'md:pl-10 md:self-end md:ml-auto',
                  )}
                >
                  {/* Dot on the timeline line */}
                  <div
                    className={cn(
                      'absolute top-1.5 h-3 w-3 rounded-full border-2 border-background bg-neon-blue',
                      'left-[10px] md:left-auto',
                      isLeft ? 'md:right-[-7px]' : 'md:left-[-7px]',
                    )}
                  />

                  <div className="relative border border-border bg-card p-5">
                    <div className="accent-line" />
                    <p className="mb-0.5 text-[10px] tracking-[2px] text-muted-foreground">
                      {exp.period}
                    </p>
                    <h3 className="font-display text-sm font-bold text-foreground">{exp.role}</h3>
                    <p className="mb-3 text-xs font-medium text-neon-blue">{exp.company}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
