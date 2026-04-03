import ContactForm from '@/components/ContactForm'
import MobileFixedCTA from '@/components/MobileFixedCTA'
import { PageViewTracker } from '@/components/Analytics'
import PhoneButton from '@/components/PhoneButton'

const SERVICES = [
  {
    icon: '🔧',
    name: '에어콤프레샤',
    desc: '산업용 공기압축기 설치·수리·교체. 저소음·고효율 제품 상담',
  },
  {
    icon: '💧',
    name: '에어드라이어',
    desc: '압축공기 제습 장치. 냉동식·흡착식 전 기종 대응',
  },
  {
    icon: '❄️',
    name: '냉각 칠러',
    desc: '산업용 냉각수 공급 시스템. 공랭식·수랭식 상담 가능',
  },
  {
    icon: '🌡️',
    name: '냉난방기',
    desc: '산업용 냉난방 시스템. 현장 규모에 맞는 최적 제품 추천',
  },
  {
    icon: '🌬️',
    name: '에어컨',
    desc: '공장·창고·사무실용 에어컨 설치 및 이전 공사',
  },
  {
    icon: '🌀',
    name: '공조기',
    desc: '공기조화기 (AHU/FCU) 설치·유지관리. 환경 맞춤 설계',
  },
  {
    icon: '🔬',
    name: '항온항습기',
    desc: '정밀 온습도 제어가 필요한 현장. 반도체·제약·식품 업종 대응',
  },
]

const CASES = [
  { icon: '⚠️', title: '설비 고장·오작동', desc: '갑작스러운 장비 고장, 빠른 출동 요청' },
  { icon: '🔄', title: '노후 설비 교체', desc: '오래된 장비를 최신 고효율 제품으로 교체' },
  { icon: '📉', title: '냉각 효율 저하', desc: '냉각 성능이 떨어져 생산라인에 영향 발생' },
  { icon: '🏭', title: '신규 공장 설치', desc: '신축·이전 공장에 설비 시스템 구축' },
  { icon: '🔩', title: '정기 유지관리', desc: '예방정비 및 주기적 점검 계약' },
]

const PROCESS = [
  { step: '01', title: '문의 접수', desc: '전화·온라인 문의' },
  { step: '02', title: '전화 상담', desc: '현장 상황 파악' },
  { step: '03', title: '현장 방문', desc: '직접 확인 및 진단' },
  { step: '04', title: '견적 제공', desc: '맞춤 견적서 전달' },
]

export default function LandingPage() {
  return (
    <>
      <PageViewTracker />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-blue-700">에어솔루션</span>
            <span className="hidden sm:inline text-sm text-gray-500 ml-2">산업용 냉동·공조 설비 전문</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneButton
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-700 border border-gray-300 rounded-lg px-3 py-2 transition-colors"
              location="header"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              010-8274-0422
            </PhoneButton>
            <a
              href="#contact-form"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              상담 신청
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-600/50 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              빠른 현장 대응 가능
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              산업용 냉동·공조 설비,<br />
              <span className="text-yellow-300">빠르게 상담해드립니다</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10">
              현장 맞춤 설비 상담 및 견적 안내
              <span className="hidden sm:inline"> · 경기도 화성 기반, 전국 대응</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact-form"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-all shadow-lg"
              >
                ✍️ 빠른 상담 신청
              </a>
              <PhoneButton
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all border border-white/30 flex items-center justify-center gap-2"
                location="hero"
              >
                📞 전화 문의
              </PhoneButton>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-blue-600 text-white py-6">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold">7가지</div>
                <div className="text-blue-200 text-sm mt-0.5">취급 설비</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold">당일</div>
                <div className="text-blue-200 text-sm mt-0.5">상담 응대</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold">전국</div>
                <div className="text-blue-200 text-sm mt-0.5">현장 대응</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">취급 설비</h2>
              <p className="text-gray-500 mt-2">산업 현장에 필요한 모든 냉동·공조 설비를 다룹니다</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SERVICES.map((s) => (
                <a
                  key={s.name}
                  href="#contact-form"
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all group border border-gray-100 hover:border-blue-200"
                >
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{s.name}</h3>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{s.desc}</p>
                </a>
              ))}
              <a
                href="#contact-form"
                className="bg-blue-600 rounded-xl p-5 shadow-sm hover:shadow-md transition-all text-white flex flex-col justify-center"
              >
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-bold">기타 문의</h3>
                <p className="text-blue-100 text-sm mt-1.5">목록에 없는 설비도 상담 가능합니다</p>
              </a>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">이런 분들이 문의합니다</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {CASES.map((c) => (
                <div key={c.title} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900">{c.title}</div>
                    <div className="text-gray-500 text-sm mt-0.5">{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
              >
                지금 바로 문의하기 →
              </a>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 md:py-20 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold">에어솔루션을 선택하는 이유</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-800/50 rounded-2xl">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-bold mb-2">다양한 설비 대응</h3>
                <p className="text-blue-200">에어콤프레샤부터 항온항습기까지<br />7가지 이상 설비 전문 처리</p>
              </div>
              <div className="text-center p-6 bg-blue-800/50 rounded-2xl">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">빠른 상담 응대</h3>
                <p className="text-blue-200">문의 접수 후 당일 상담<br />긴급 상황 빠른 출동 가능</p>
              </div>
              <div className="text-center p-6 bg-blue-800/50 rounded-2xl">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="text-xl font-bold mb-2">현장 중심 대응</h3>
                <p className="text-blue-200">경기도 화성 기반<br />수도권·전국 현장 방문 가능</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">상담 프로세스</h2>
              <p className="text-gray-500 mt-2">문의부터 견적까지, 간단하고 빠릅니다</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PROCESS.map((p, i) => (
                <div key={p.step} className="relative text-center">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">
                    {p.step}
                  </div>
                  <h3 className="font-bold text-gray-900">{p.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-[-28px] h-0.5 bg-blue-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 md:py-20 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                무료 상담 신청
              </h2>
              <p className="text-gray-500 mt-2">
                아래 정보를 남겨주시면 빠르게 연락드리겠습니다
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <PhoneButton
                  className="flex items-center gap-1.5 text-blue-700 font-semibold hover:underline"
                  location="form_section"
                >
                  📞 010-8274-0422
                </PhoneButton>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 text-sm">급한 경우 전화 문의 권장</span>
              </div>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* Company Info Footer */}
        <section className="py-12 bg-gray-900 text-gray-400">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-white font-bold text-lg mb-2">에어솔루션</p>
            <p className="text-sm">경기도 화성시 송산면 당성로 566-12</p>
            <p className="text-sm mt-1">
              📞{' '}
              <a href="tel:01082740422" className="hover:text-white transition-colors">010-8274-0422</a>
              {' · '}
              ✉️{' '}
              <a href="mailto:airsolution2024@naver.com" className="hover:text-white transition-colors">
                airsolution2024@naver.com
              </a>
            </p>
            <p className="text-xs mt-4 text-gray-600">
              © 2024 에어솔루션. All rights reserved.
            </p>
          </div>
        </section>
      </main>

      <MobileFixedCTA />
      {/* Spacer for mobile fixed CTA */}
      <div className="h-16 md:h-0" />
    </>
  )
}
