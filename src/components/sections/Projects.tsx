import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { projects } from '@/data/portfolio'

export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)

  return (
    <SectionWrapper id="projetos" style={{ backgroundColor: 'rgba(8,15,30,0.3)' }}>
      <div ref={ref}>
        <p className="section-number">03 / PROJETOS</p>
        <h2 className="mb-10 font-display text-3xl font-extrabold tracking-tight text-foreground">
          Alguns exemplos
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="relative border border-border bg-card p-6 transition-all duration-300 hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,102,255,0.15)]"
            >
              <div className="accent-line" />

              <div className="mb-5 overflow-hidden border border-border bg-background">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-44 w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>

              <h3 className="mb-2 font-display text-base font-bold text-foreground">
                {project.title}
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-border bg-background px-2 py-0.5 text-[10px] text-neon-cyan"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {project.demoUrl !== '#' && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-neon-blue transition-opacity hover:opacity-70"
                  >
                    <ExternalLink size={12} /> Demo
                  </a>
                )}
                {project.repoUrl !== '#' && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Repositório
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
