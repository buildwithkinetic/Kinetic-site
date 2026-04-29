import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import LenisProvider from '@/components/LenisProvider'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Navbar />
      <PageTransition>
        {children}
      </PageTransition>
    </LenisProvider>
  )
}
