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

interface Props {
  searchParams: Promise<{ status?: string; search?: string }>
}

export default async function LeadsListPage({ searchParams }: Props) {
  const { status, search } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,phone.ilike.%${search}%,company_name.ilike.%${search}%`
    )
  }

  const { data: leads } = await query

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900">문의 목록</h1>
        <span className="text-gray-500 text-sm">{leads?.length ?? 0}건</span>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="이름, 연락처, 업체명 검색"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            검색
          </button>
          {(search || status) && (
            <Link
              href="/admin/leads"
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
            >
              초기화
            </Link>
          )}
        </form>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/leads"
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${!status || status === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            전체
          </Link>
          {(Object.entries(STATUS_LABELS) as [LeadStatus, string][]).map(([s, label]) => (
            <Link
              key={s}
              href={`/admin/leads?status=${s}${search ? `&search=${search}` : ''}`}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${status === s ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-blue-400' : STATUS_COLORS[s] + ' opacity-70 hover:opacity-100'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">상태</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">이름</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">연락처</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">업체명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">품목</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">지역</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(leads || []).map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`}>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[lead.status as LeadStatus]}`}>
                        {STATUS_LABELS[lead.status as LeadStatus]}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium text-gray-900 hover:text-blue-700 transition-colors">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">
                    <a href={`tel:${lead.phone}`} className="hover:text-blue-700 transition-colors">{lead.phone}</a>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden md:table-cell">{lead.company_name || '-'}</td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden sm:table-cell">{lead.service_type}</td>
                  <td className="px-4 py-3 text-gray-500 text-sm hidden sm:table-cell">{lead.region}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(lead.created_at).toLocaleDateString('ko-KR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!leads?.length && (
          <div className="px-5 py-12 text-center text-gray-400">
            문의 내역이 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
