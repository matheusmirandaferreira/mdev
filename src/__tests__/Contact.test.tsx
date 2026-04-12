import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '@/components/sections/Contact'

describe('Contact form', () => {
  it('exibe erros ao submeter formulário vazio', async () => {
    render(<Contact />)
    const submitBtn = screen.getByRole('button', { name: /enviar/i })
    await userEvent.click(submitBtn)
    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
      expect(screen.getByText(/pelo menos 10 caracteres/i)).toBeInTheDocument()
    })
  })

  it('exibe mensagem de sucesso após envio válido', async () => {
    render(<Contact />)
    await userEvent.type(screen.getByLabelText(/nome/i), 'João Silva')
    await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
    await userEvent.type(screen.getByLabelText(/mensagem/i), 'Olá, gostaria de contratar seus serviços!')
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }))
    await waitFor(
      () => expect(screen.getByText(/mensagem enviada/i)).toBeInTheDocument(),
      { timeout: 3000 },
    )
  })
})
