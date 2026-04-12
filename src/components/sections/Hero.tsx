import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { developer } from '@/data/portfolio'
import { GithubIcon, LinkedinIcon } from '@/components/icons'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-6 pt-20 pb-12 md:px-12 lg:px-24"
    >
      {/* Radial gradient background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, rgba(0,102,255,0.10) 0%, transparent 55%), radial-gradient(ellipse at 15% 85%, rgba(0,212,255,0.05) 0%, transparent 45%)',
        }}
      />

      <div className="relative mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto]">
        {/* Main content */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Availability indicator */}
          <motion.div variants={fadeUp} className="mb-5 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-neon-green shadow-[0_0_6px_#4ade80]" />
            <span className="text-[10px] tracking-[3px] text-neon-green">
              DISPONÍVEL PARA PROJETOS
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-2 font-display text-5xl font-extrabold tracking-tight text-foreground md:text-6xl"
          >
            {developer.name}
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mb-5 font-display text-xl font-semibold text-neon-blue md:text-2xl"
          >
            {developer.title}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground"
          >
            {developer.bio} Experiência sólida com React, React Native e todo o ecossistema moderno
            de frontend.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${developer.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-neon-blue px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <span>💬</span>
              Falar no WhatsApp
            </a>
            <a
              href="#projetos"
              className="border border-border px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-neon-blue hover:text-foreground"
            >
              Ver Projetos
            </a>
          </motion.div>
        </motion.div>

        {/* Avatar + social */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full border border-neon-blue opacity-30" />
            <img
              src="/profile.jpeg"
              alt={developer.name}
              className="h-36 w-36 rounded-full border-2 border-border object-cover object-top"
            />
          </div>

          <div className="flex items-center gap-1 text-[10px] tracking-widest text-muted-foreground">
            <MapPin size={10} />
            {developer.location}
          </div>

          <div className="flex gap-3">
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-neon-blue hover:text-neon-blue"
            >
              <GithubIcon size={14} />
            </a>
            <a
              href={developer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-neon-blue hover:text-neon-blue"
            >
              <LinkedinIcon size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 flex items-center gap-2 md:left-12 lg:left-24">
        <div className="h-5 w-px bg-gradient-to-b from-neon-blue to-transparent" />
        <span className="text-[9px] tracking-[2px] text-muted-foreground">SCROLL</span>
      </div>
    </section>
  )
}
