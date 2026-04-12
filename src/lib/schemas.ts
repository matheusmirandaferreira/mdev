import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

export type ContactFormData = z.infer<typeof contactSchema>
