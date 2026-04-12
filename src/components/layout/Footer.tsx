import { MessageCircle } from 'lucide-react'
import { developer } from '@/data/portfolio'
import { GithubIcon, LinkedinIcon } from '@/components/icons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border px-6 py-8 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-xs text-muted-foreground">
          © {year} {developer.name}. Todos os direitos reservados.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-neon-blue"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-neon-blue"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`https://wa.me/${developer.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-muted-foreground transition-colors hover:text-whatsapp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
