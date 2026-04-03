'use client'

import { useAnalytics } from './Analytics'

interface PhoneButtonProps {
  className?: string
  location: string
  children: React.ReactNode
}

export default function PhoneButton({ className, location, children }: PhoneButtonProps) {
  const { track } = useAnalytics()

  return (
    <a
      href="tel:01040941666"
      className={className}
      onClick={() => track('phone_click', { location })}
    >
      {children}
    </a>
  )
}
