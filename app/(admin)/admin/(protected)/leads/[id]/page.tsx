import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LeadDetailClient from '@/components/LeadDetailClient'
import { Lead } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !lead) notFound()

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center gap-2">
        <Link href="/admin/leads" className="text-blue-600 hover:underline text-sm">
          ← 목록으로
        </Link>
      </div>
      <h1 className="text-2xl font-extrabold text-gray-900">문의 상세</h1>
      <LeadDetailClient lead={lead as Lead} />
    </div>
  )
}
