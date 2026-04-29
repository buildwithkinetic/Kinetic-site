import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd, localBusinessSchema, serviceSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Automated Lead Generation for Gyms | Kinetic Gym OS",
  description:
    "A complete growth system for gyms — website, CRM, AI chatbot, and Meta Ads. Plug in and start generating members.",
}

export default function Page() {
  const baseUrl = "https://buildwithkinetic.org"
  
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={serviceSchema({ 
        name: "Gym Growth Systems", 
        description: "Automated lead generation and follow-up chains for gyms and fitness studios.", 
        url: `${baseUrl}/gym-growth-systems`, 
        serviceType: "Business Automation" 
      })} />
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: baseUrl }, 
        { name: "Gym Growth Systems", url: `${baseUrl}/gym-growth-systems` }
      ])} />
      
      <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose prose-invert max-w-none">
            <p className="text-[#3B82F6] font-mono text-xs tracking-widest uppercase mb-4">Niche Solutions</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Gym Growth Systems.
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              Most gym owners are trainers first, marketers second. You&apos;re great at transforming bodies, but the constant stress of chasing new memberships is holding you back. 
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-16">
              <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                <h3 className="text-white text-xl font-bold mb-4">The Problem</h3>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li>• Leads come from Instagram but never get called.</li>
                  <li>• No system to track who toured the facility.</li>
                  <li>• Manual follow-ups that get forgotten.</li>
                  <li>• Relying on "walk-ins" which are unpredictable.</li>
                </ul>
              </div>
              <div className="p-8 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                <h3 className="text-white text-xl font-bold mb-4">The Kinetic System</h3>
                <ul className="space-y-3 text-white/50 text-sm">
                  <li>• High-conversion landing page for your gym.</li>
                  <li>• Automated lead capture via WhatsApp/Email.</li>
                  <li>• Instant SMS follow-up chains.</li>
                  <li>• CRM dashboard to manage every trial member.</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-16 mb-6">How It Works</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              We don&apos;t just build you a website. We install a membership-generating machine. From the moment someone clicks your ad or finds you on Google, our system takes over. 
            </p>

            <div className="space-y-12 my-16">
              {[
                { step: '01', title: 'Capture', desc: 'A conversion-focused website designed to turn local searches into trial bookings.' },
                { step: '02', title: 'Qualify', desc: 'AI-driven forms and bots that check if a lead is serious before they take your time.' },
                { step: '03', title: 'Convert', desc: 'Automated follow-up chains that keep your gym top-of-mind until they walk in.' },
              ].map(s => (
                <div key={s.step} className="flex gap-6">
                  <span className="text-blue-500 font-mono font-bold">{s.step}</span>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">{s.title}</h4>
                    <p className="text-white/40 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 bg-white/5 border border-white/10 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Build Your Gym&apos;s Revenue Pipeline</h3>
              <p className="text-white/40 mb-8">Get the system that works while you train. Delivered in 30 days.</p>
              <Link href="/book-call" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all">
                Book a Free Strategy Call →
              </Link>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
