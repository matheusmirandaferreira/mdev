import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInView } from '@/hooks/useInView'

describe('useInView', () => {
  let observerCallback: IntersectionObserverCallback
  const observeMock = vi.fn()
  const disconnectMock = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
    global.IntersectionObserver = vi.fn().mockImplementation(function (cb: IntersectionObserverCallback) {
      observerCallback = cb
      return { observe: observeMock, disconnect: disconnectMock }
    }) as unknown as typeof IntersectionObserver
  })

  it('retorna false inicialmente', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useInView(ref))
    expect(result.current).toBe(false)
  })

  it('retorna true quando o elemento entra no viewport', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() => useInView(ref))
    act(() => {
      observerCallback(
        [{ isIntersecting: true }] as IntersectionObserverEntry[],
        {} as IntersectionObserver,
      )
    })
    expect(result.current).toBe(true)
  })
})
