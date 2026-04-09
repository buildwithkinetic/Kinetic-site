import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd, localBusinessSchema, serviceSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Real Estate Automation Kolkata — Lead Generation Systems",
  description: "Automated growth systems for real estate developers and agencies in Kolkata. Lead capture, CRM integration, and automated follow-ups.",
  alternates: {
    canonical: "https://buildwithkinetic.org/real-estate-automation-kolkata",
  },
  keywords: [
    "real estate marketing Kolkata",
    "lead generation for real estate India",
    "real estate CRM automation",
    "property marketing agency Kolkata",
    "real estate website development Kolkata",
  ],
}

export default function Page() {
  const baseUrl = "https://buildwithkinetic.org"
  
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={serviceSchema({ 
        name: "Real Estate Automation Systems", 
        description: "High-performance lead generation and pipeline management for property developers.", 
        url: `${baseUrl}/real-estate-automation-kolkata`, 
        serviceType: "Business Automation" 
      })} />
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: baseUrl }, 
        { name: "Real Estate Automation", url: `${baseUrl}/real-estate-automation-kolkata` }
      ])} />
      
      <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose prose-invert max-w-none">
            <p className="text-[#8B5CF6] font-mono text-xs tracking-widest uppercase mb-4">Sector Solutions</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Real Estate Automation.
            </h1>
            
            <p className="text-xl text-white/60 leading-relaxed mb-12">
              In the Kolkata real estate market, the speed of lead response is the difference between a booking and a lost prospect. We build the systems that ensure no lead is ever left waiting.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-16">
              {[
                { title: 'Instant Response', desc: 'Auto-send brochures and site-visit details the second a lead hits your Facebook ad.' },
                { title: 'Lead Scoring', desc: 'Identify which buyers are serious and which are just browsing before your team calls.' },
                { title: 'CRM Sync', desc: 'Every enquiry from 99acres, Magicbricks, and your website synced to one pipeline.' },
              ].map(item => (
                <div key={item.title} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h4 className="text-white font-bold mb-3">{item.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white mt-16 mb-6">Built for Kolkata Developers</h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              We understand the local nuances of the property market. Whether you&apos;re selling luxury apartments in Alipore or residential projects in Rajarhat, our systems are built to handle the high volume and complexity of real estate sales.
            </p>

            <div className="mt-20 border-t border-white/10 pt-10">
              <h3 className="text-2xl font-bold text-white mb-6">The Real Estate Lead Blueprint</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Custom Property Landing Pages</span>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>WhatsApp Lead Notification Bots</span>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Automated Drip Email Campaigns</span>
                </div>
              </div>
            </div>

            <div className="mt-20 p-10 bg-purple-600/10 border border-purple-500/20 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Automate Your Sales Gallery?</h3>
              <p className="text-white/40 mb-8">Book a discovery call to see the exact blueprint we use for high-volume developers.</p>
              <Link href="/book-call" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all">
                Book a Strategy Call →
              </Link>
            </div>
          </article>
        </div>
      </main>
    </>
  )
}
