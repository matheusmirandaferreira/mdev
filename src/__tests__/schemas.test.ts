import { describe, it, expect } from 'vitest'
import { contactSchema } from '@/lib/schemas'

describe('contactSchema', () => {
  it('valida dados corretos', () => {
    const result = contactSchema.safeParse({
      name: 'João Silva',
      email: 'joao@email.com',
      message: 'Olá, gostaria de contratar seus serviços.',
    })
    expect(result.success).toBe(true)
  })

  it('rejeita nome vazio', () => {
    const result = contactSchema.safeParse({ name: '', email: 'a@b.com', message: 'msg' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('name')
    }
  })

  it('rejeita email inválido', () => {
    const result = contactSchema.safeParse({ name: 'João', email: 'nao-e-email', message: 'msg' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email')
    }
  })

  it('rejeita mensagem com menos de 10 caracteres', () => {
    const result = contactSchema.safeParse({ name: 'João', email: 'a@b.com', message: 'curto' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('message')
    }
  })
})
