'use client'

import { useState } from 'react'
import { useAnalytics } from './Analytics'

const SERVICES = [
  '에어콤프레샤',
  '에어드라이어',
  '냉각 칠러',
  '냉난방기',
  '에어컨',
  '공조기',
  '항온항습기',
  '기타',
]

const REGIONS = [
  '서울', '경기', '인천', '부산', '대구', '대전', '광주', '울산', '세종',
  '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const { track } = useAnalytics()
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [started, setStarted] = useState(false)

  const [values, setValues] = useState({
    name: '',
    phone: '',
    company_name: '',
    service_type: '',
    region: '',
    message: '',
    agree: false,
    website: '', // honeypot
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    if (!started) {
      setStarted(true)
      track('form_start')
    }

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!values.agree) {
      setErrorMsg('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setFormState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || '오류가 발생했습니다.')
        setFormState('error')
        return
      }

      track('form_submit', { service_type: values.service_type, region: values.region })
      setFormState('success')
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">문의가 접수되었습니다</h3>
        <p className="text-gray-600">
          담당자가 빠르게 연락드리겠습니다.<br />
          급한 경우 <a href="tel:01040941666" className="text-blue-600 font-semibold">010-4094-1666</a>로 직접 연락주세요.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            placeholder="홍길동"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            연락처 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            required
            placeholder="010-0000-0000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">업체명</label>
        <input
          type="text"
          name="company_name"
          value={values.company_name}
          onChange={handleChange}
          placeholder="회사/공장명 (선택)"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            문의 품목 <span className="text-red-500">*</span>
          </label>
          <select
            name="service_type"
            value={values.service_type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">선택해주세요</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            지역 <span className="text-red-500">*</span>
          </label>
          <select
            name="region"
            value={values.region}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">선택해주세요</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          rows={4}
          placeholder="설비 상태, 증상, 요청 사항 등을 자유롭게 적어주세요."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          name="agree"
          id="agree"
          checked={values.agree}
          onChange={handleChange}
          className="mt-1 w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="agree" className="text-sm text-gray-600">
          <span className="text-red-500">*</span>{' '}
          상담을 위한 개인정보(이름, 연락처, 업체명) 수집 및 이용에 동의합니다.
        </label>
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={formState === 'loading'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl text-lg transition-colors duration-200"
      >
        {formState === 'loading' ? '접수 중...' : '👉 빠른 상담 요청하기'}
      </button>
    </form>
  )
}
