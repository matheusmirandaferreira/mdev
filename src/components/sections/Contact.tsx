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
import { GithubIcon, LinkedinIcon } from '@/components/icons'

export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  async function onSubmit(formData: ContactFormData) {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/xykbrrpo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
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

                  {error && (
                    <p className="text-xs text-red-400">
                      Erro ao enviar. Tente novamente ou use o WhatsApp.
                    </p>
                  )}

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
