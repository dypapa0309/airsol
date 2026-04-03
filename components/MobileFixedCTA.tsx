'use client'

import { useAnalytics } from './Analytics'

export default function MobileFixedCTA() {
  const { track } = useAnalytics()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex">
        <a
          href="tel:01082740422"
          onClick={() => track('phone_click', { location: 'mobile_cta' })}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-800 text-white font-bold text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          전화 문의
        </a>
        <a
          href="#contact-form"
          onClick={() => track('cta_click', { location: 'mobile_cta', type: 'form' })}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold text-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          상담 신청
        </a>
      </div>
    </div>
  )
}
