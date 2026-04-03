'use client'

import { useEffect } from 'react'

export function useAnalytics() {
  const track = async (
    event_name: 'page_view' | 'cta_click' | 'phone_click' | 'form_start' | 'form_submit',
    metadata?: Record<string, unknown>
  ) => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name,
          page: window.location.pathname,
          metadata,
        }),
      })
    } catch {}
  }

  return { track }
}

export function PageViewTracker() {
  const { track } = useAnalytics()

  useEffect(() => {
    track('page_view')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
