import { type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export function SectionWrapper({ id, className, style, children }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('w-full py-20 px-6 md:px-12 lg:px-24', className)}
      style={style}
    >
      <div className="mx-auto max-w-5xl">
        {children}
      </div>
    </section>
  )
}
