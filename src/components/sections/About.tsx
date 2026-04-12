import { useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { developer } from '@/data/portfolio'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  return (
    <SectionWrapper id="sobre" style={{ backgroundColor: 'rgba(8,15,30,0.3)' }}>
      <div ref={ref}>
        <p className="section-number">01 / SOBRE</p>
        <h2 className="mb-10 font-display text-3xl font-extrabold tracking-tight text-foreground">
          Quem sou eu
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[auto_1fr]">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full border border-neon-blue opacity-20" />
              <div className="flex h-44 w-44 items-center justify-center rounded-full border-2 border-border bg-card">
                <span className="font-display text-6xl font-extrabold text-neon-cyan">
                  {developer.initials}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] tracking-widest text-muted-foreground">
              <MapPin size={10} />
              {developer.location}
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col justify-center gap-4"
          >
            {developer.bioExtended.map((paragraph, i) => (
              <p key={i} className="text-sm leading-loose text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="mt-2 h-px w-12 bg-neon-blue" />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
