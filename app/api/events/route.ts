import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { AnalyticsEvent } from '@/types'

const VALID_EVENTS = ['page_view', 'cta_click', 'phone_click', 'form_start', 'form_submit']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event_name, page, metadata } = body

    if (!VALID_EVENTS.includes(event_name)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 })
    }

    const event: AnalyticsEvent = {
      event_name,
      page: String(page || '/').slice(0, 200),
      metadata: metadata || {},
    }

    const supabase = await createAdminClient()
    await supabase.from('events').insert(event)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
