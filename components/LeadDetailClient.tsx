'use client'

import { useState } from 'react'
import { Lead, LeadStatus } from '@/types'

const STATUS_FLOW: LeadStatus[] = ['new', 'contacted', 'visited', 'quoted', 'won', 'lost']

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: '신규',
  contacted: '상담완료',
  visited: '방문완료',
  quoted: '견적완료',
  won: '수주',
  lost: '실패',
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  visited: 'bg-purple-100 text-purple-800 border-purple-200',
  quoted: 'bg-orange-100 text-orange-800 border-orange-200',
  won: 'bg-green-100 text-green-800 border-green-200',
  lost: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default function LeadDetailClient({ lead }: { lead: Lead }) {
  const [status, setStatus] = useState<LeadStatus>(lead.status)
  const [memo, setMemo] = useState(lead.memo || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleStatusChange = async (newStatus: LeadStatus) => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      setStatus(newStatus)
    } catch {
      setError('상태 변경 실패')
    } finally {
      setSaving(false)
    }
  }

  const handleMemoSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memo }),
      })
      if (!res.ok) throw new Error()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('저장 실패')
    } finally {
      setSaving(false)
    }
  }

  const fields = [
    { label: '이름', value: lead.name },
    { label: '연락처', value: lead.phone, isPhone: true },
    { label: '업체명', value: lead.company_name || '-' },
    { label: '문의 품목', value: lead.service_type },
    { label: '지역', value: lead.region },
    { label: '접수일', value: new Date(lead.created_at).toLocaleString('ko-KR') },
    { label: '유입 경로', value: lead.source },
  ]

  return (
    <div className="space-y-5">
      {/* Status Stepper */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">진행 상태</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[status]}`}>
            {STATUS_LABELS[status]}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_FLOW.map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              disabled={saving || s === status}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                s === status
                  ? STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-blue-400'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 disabled:opacity-50'
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Info Fields */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-4">문의 정보</h2>
        <dl className="space-y-3">
          {fields.map((f) => (
            <div key={f.label} className="flex gap-4">
              <dt className="text-sm text-gray-500 w-24 flex-shrink-0">{f.label}</dt>
              <dd className="text-sm font-medium text-gray-900">
                {f.isPhone ? (
                  <a href={`tel:${f.value}`} className="text-blue-600 hover:underline">{f.value}</a>
                ) : f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Message */}
      {lead.message && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-2">문의 내용</h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{lead.message}</p>
        </div>
      )}

      {/* Memo */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-3">메모</h2>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={4}
          placeholder="상담 내용, 특이사항 등을 기록하세요"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={handleMemoSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {saving ? '저장 중...' : '메모 저장'}
          </button>
          {saved && <span className="text-green-600 text-sm">저장되었습니다</span>}
          {error && <span className="text-red-600 text-sm">{error}</span>}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <div className="flex gap-3">
          <a
            href={`tel:${lead.phone}`}
            className="flex-1 bg-white border border-gray-300 rounded-lg py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            📞 전화 걸기
          </a>
          <a
            href={`sms:${lead.phone}`}
            className="flex-1 bg-white border border-gray-300 rounded-lg py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            💬 문자 보내기
          </a>
        </div>
      </div>
    </div>
  )
}
