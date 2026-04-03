import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { LeadStatus } from '@/types'

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: '신규',
  contacted: '상담완료',
  visited: '방문완료',
  quoted: '견적완료',
  won: '수주',
  lost: '실패',
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  visited: 'bg-purple-100 text-purple-800',
  quoted: 'bg-orange-100 text-orange-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-gray-100 text-gray-600',
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [totalResult, todayResult, recentResult, statusResult] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
    supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('leads').select('status'),
  ])

  const statusCounts = (statusResult.data || []).reduce<Record<string, number>>((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">대시보드</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">오늘 문의</div>
          <div className="text-3xl font-extrabold text-blue-600">{todayResult.count ?? 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">전체 문의</div>
          <div className="text-3xl font-extrabold text-gray-900">{totalResult.count ?? 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">신규</div>
          <div className="text-3xl font-extrabold text-blue-500">{statusCounts.new ?? 0}</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500 mb-1">수주</div>
          <div className="text-3xl font-extrabold text-green-600">{statusCounts.won ?? 0}</div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">상태별 현황</h2>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
            <Link
              key={s}
              href={`/admin/leads?status=${s}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_COLORS[s]}`}
            >
              {STATUS_LABELS[s]} ({statusCounts[s] ?? 0})
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">최근 문의</h2>
          <Link href="/admin/leads" className="text-sm text-blue-600 hover:underline">전체 보기 →</Link>
        </div>
        <div className="divide-y divide-gray-50">
          {(recentResult.data || []).map((lead) => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status as LeadStatus]}`}>
                  {STATUS_LABELS[lead.status as LeadStatus]}
                </span>
                <div>
                  <span className="font-medium text-gray-900">{lead.name}</span>
                  {lead.company_name && (
                    <span className="text-gray-500 text-sm ml-1.5">· {lead.company_name}</span>
                  )}
                </div>
                <span className="text-gray-400 text-sm hidden sm:inline">{lead.service_type}</span>
              </div>
              <div className="text-xs text-gray-400">
                {new Date(lead.created_at).toLocaleDateString('ko-KR')}
              </div>
            </Link>
          ))}
          {!recentResult.data?.length && (
            <div className="px-5 py-8 text-center text-gray-400">문의가 없습니다</div>
          )}
        </div>
      </div>
    </div>
  )
}
