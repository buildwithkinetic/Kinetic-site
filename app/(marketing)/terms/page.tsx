import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Kinetic",
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          <header>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-[#a1a1aa] font-mono text-xs uppercase tracking-widest">
              Last Updated: May 2026
            </p>
          </header>

          <div className="text-[#a1a1aa] text-lg leading-relaxed">
            <p>
              By using buildwithkinetic.org you agree to use this site for lawful 
              purposes only. All content is the property of Kinetic. For any 
              questions, contact{" "}
              <a href="mailto:hello@buildwithkinetic.org" className="text-[#3B82F6] hover:underline">
                hello@buildwithkinetic.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
