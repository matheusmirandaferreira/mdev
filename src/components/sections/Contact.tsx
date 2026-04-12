import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { useInView } from '@/hooks/useInView'
import { contactSchema, type ContactFormData } from '@/lib/schemas'
import { developer } from '@/data/portfolio'

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  function onSubmit(_data: ContactFormData) {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <SectionWrapper id="contato" style={{ backgroundColor: 'rgba(8,15,30,0.3)' }}>
      <div ref={ref}>
        <p className="section-number">05 / CONTATO</p>
        <h2 className="mb-10 font-display text-3xl font-extrabold tracking-tight text-foreground">
          Vamos conversar?
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left: WhatsApp + socials */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <p className="text-sm leading-loose text-muted-foreground">
              Prefere uma conversa direta? Manda mensagem no WhatsApp — respondo rápido.
            </p>

            <a
              href={`https://wa.me/${developer.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <span>💬</span> Falar no WhatsApp
            </a>

            <div className="flex flex-col gap-3">
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border p-3 text-xs text-muted-foreground transition-colors hover:border-neon-blue hover:text-foreground"
              >
                <GithubIcon size={14} /> GitHub
              </a>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border p-3 text-xs text-muted-foreground transition-colors hover:border-neon-blue hover:text-foreground"
              >
                <LinkedinIcon size={14} /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <CheckCircle size={32} className="text-neon-green" />
                <p className="font-display text-base font-bold text-foreground">
                  Mensagem enviada!
                </p>
                <p className="text-xs text-muted-foreground">
                  Obrigado pelo contato. Retorno em breve.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome"
                            className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs text-muted-foreground">Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Fale sobre seu projeto..."
                            rows={5}
                            className="border-border bg-card text-foreground placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-neon-blue text-white hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Enviando...' : 'Enviar mensagem'}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
