import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Contact } from '@/components/sections/Contact'

// The form posts to Formspree; stub fetch so tests never hit the network
// (a real call made the suite flaky and sent junk messages to the inbox).
function mockFetch(respond: () => Promise<Response>) {
  return vi.spyOn(globalThis, 'fetch').mockImplementation(respond)
}

async function fillAndSubmitValidForm() {
  await userEvent.type(screen.getByLabelText(/nome/i), 'João Silva')
  await userEvent.type(screen.getByLabelText(/e-mail/i), 'joao@email.com')
  await userEvent.type(screen.getByLabelText(/mensagem/i), 'Olá, gostaria de contratar seus serviços!')
  await userEvent.click(screen.getByRole('button', { name: /enviar/i }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Contact form', () => {
  it('exibe erros ao submeter formulário vazio', async () => {
    const fetchSpy = mockFetch(async () => new Response(null, { status: 200 }))
    render(<Contact />)
    await userEvent.click(screen.getByRole('button', { name: /enviar/i }))
    expect(await screen.findByText('Nome é obrigatório')).toBeInTheDocument()
    expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
    expect(screen.getByText(/pelo menos 10 caracteres/i)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('envia os dados ao Formspree e exibe mensagem de sucesso', async () => {
    const fetchSpy = mockFetch(async () => new Response(null, { status: 200 }))
    render(<Contact />)
    await fillAndSubmitValidForm()

    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument()
    expect(fetchSpy).toHaveBeenCalledOnce()
    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toMatch(/^https:\/\/formspree\.io\/f\//)
    expect(init?.method).toBe('POST')
    expect(JSON.parse(init?.body as string)).toEqual({
      name: 'João Silva',
      email: 'joao@email.com',
      message: 'Olá, gostaria de contratar seus serviços!',
    })
  })

  it('exibe erro quando o Formspree responde com falha', async () => {
    mockFetch(async () => new Response(null, { status: 500 }))
    render(<Contact />)
    await fillAndSubmitValidForm()

    expect(await screen.findByText(/erro ao enviar/i)).toBeInTheDocument()
    expect(screen.queryByText(/mensagem enviada/i)).not.toBeInTheDocument()
  })

  it('exibe erro quando a requisição falha por rede', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    render(<Contact />)
    await fillAndSubmitValidForm()

    expect(await screen.findByText(/erro ao enviar/i)).toBeInTheDocument()
  })
})
