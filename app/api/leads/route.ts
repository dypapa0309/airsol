import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { LeadInsert } from '@/types'

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '').trim().slice(0, 1000)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true })
    }

    const { name, phone, company_name, service_type, region, message } = body

    // Validation
    if (!name || !phone || !service_type || !region) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    const phoneRegex = /^[0-9\-+\s()]{7,20}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: '올바른 연락처를 입력해주세요.' },
        { status: 400 }
      )
    }

    const lead: LeadInsert = {
      name: sanitize(name),
      phone: sanitize(phone),
      company_name: sanitize(company_name || ''),
      service_type: sanitize(service_type),
      region: sanitize(region),
      message: sanitize(message || ''),
      status: 'new',
      source: 'landing',
    }

    const supabase = await createAdminClient()
    const { error } = await supabase.from('leads').insert(lead)

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: '저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: '요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
