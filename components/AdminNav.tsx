'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-lg font-extrabold text-blue-700">
            에어솔루션 CRM
          </Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <Link href="/admin" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
              대시보드
            </Link>
            <Link href="/admin/leads" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">
              문의 목록
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-gray-500">{userEmail}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-600 border border-gray-300 rounded-lg px-3 py-1.5 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  )
}
