import '@testing-library/jest-dom'

// Mock IntersectionObserver for components that use useInView
const observeMock = vi.fn()
const disconnectMock = vi.fn()
;(globalThis as typeof globalThis & { IntersectionObserver: typeof IntersectionObserver }).IntersectionObserver = vi.fn().mockImplementation(function (cb: IntersectionObserverCallback) {
  void cb
  return { observe: observeMock, disconnect: disconnectMock }
}) as unknown as typeof IntersectionObserver
