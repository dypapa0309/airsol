import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '에어솔루션 | 산업용 냉동·공조 설비 전문',
  description: '에어콤프레샤, 에어드라이어, 냉각 칠러, 냉난방기, 공조기 등 산업용 설비 전문. 빠른 상담과 현장 맞춤 견적을 제공합니다.',
  keywords: '에어솔루션, 산업용 공조, 에어콤프레샤, 에어드라이어, 냉각칠러, 냉난방기, 공조기, 항온항습기',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
