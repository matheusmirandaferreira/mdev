import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { developer } from '@/data/portfolio'

const NAV_ITEMS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Contato', href: '#contato' },
] as const

const SECTION_IDS = ['sobre', 'skills', 'projetos', 'experiencia', 'contato'] as const

export function Header() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-border backdrop-blur-sm' : 'bg-transparent',
      )}
      style={scrolled ? { backgroundColor: 'rgba(5, 8, 16, 0.9)' } : undefined}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-12 lg:px-24">
        <a href="#" className="text-neon-cyan font-display text-base font-bold tracking-tight">
          {developer.firstName.toLowerCase()}
          <span className="text-neon-blue">.</span>
          dev
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = activeSection === id
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  'text-xs tracking-wide transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </a>
            )
          })}
          <a
            href="#contato"
            className="bg-neon-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}
