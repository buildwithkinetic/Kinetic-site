import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'
import LenisProvider from '@/components/LenisProvider'
import { Footer } from '@/components/marketing/Footer'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Navbar />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
    </LenisProvider>
  )
}
