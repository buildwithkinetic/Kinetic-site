import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd, localBusinessSchema, serviceSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Kolkata | Kinetic",
  description:
    "Full-stack digital marketing for Kolkata businesses. SEO, Google Ads, Meta Ads, and automation — built as one integrated system.",
}

export default function Page() {
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={serviceSchema({ name: "Digital Marketing Agency in Kolkata", description: "SEO, lead generation, CRM, and automation for Kolkata businesses. Kinetic builds the full digital growth system — not just a campaign.", url: "https://buildwithkinetic.org/digital-marketing-kolkata", serviceType: "Digital Marketing" })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: "https://buildwithkinetic.org" }, { name: "Digital Marketing Agency in Kolkata", url: "https://buildwithkinetic.org/digital-marketing-kolkata" }])} />
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-8 text-white">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Digital Marketing in Kolkata</h1>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">There are two types of digital marketing businesses in Kolkata.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">The first type runs ads, sends reports, and charges a monthly retainer. They measure success by impressions and reach. When you ask why leads aren't converting, the answer is always "we need more budget" or "let's run a different creative."</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">The second type builds the infrastructure that makes marketing actually work — the website that converts, the SEO that compounds, the CRM that captures and follows up, the automation that does it without you.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Kinetic is the second type.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What "Digital Marketing" Actually Means for a Kolkata Business</h2>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">When a business owner in Kolkata says they need digital marketing, they usually mean one of three things:</p>
      <ol className="list-decimal list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li><strong className="text-white">"I'm not showing up on Google"</strong> — Local SEO problem. The fix is Google Business Profile, website indexing, local citations, and content that targets the right keywords.</li>
      </ol>
      <ol className="list-decimal list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li><strong className="text-white">"I'm getting enquiries but they're not converting"</strong> — Lead management problem. WhatsApp messages get lost, follow-ups don't happen, there's no system. The fix is a CRM and automated follow-up sequences.</li>
      </ol>
      <ol className="list-decimal list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li><strong className="text-white">"I need more leads"</strong> — Top-of-funnel problem. The fix depends on your business — could be SEO, could be a better landing page, could be outreach.</li>
      </ol>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Most digital marketing agencies in Kolkata run Facebook ads at all three problems. Kinetic diagnoses the actual problem first, then builds the system to solve it.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Our Digital Growth Services</h2>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">SEO & Local Visibility</h3>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Getting your business to show up when someone in Kolkata searches for your service. That means:</p>
      <ul className="list-disc list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li>Google Business Profile setup and optimisation</li>
        <li>Technical SEO (crawlability, indexing, page speed, schema markup)</li>
        <li>Local citation building (JustDial, Sulekha, IndiaMART, Clutch)</li>
        <li>Content that targets the keywords your customers actually search</li>
        <li>Monthly rank tracking and reporting</li>
      </ul>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><a href="/services/seo" className="text-[#C8B8A2] hover:underline">Learn more about SEO →</a></p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Lead Generation & CRM</h3>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Building the system that captures leads and follows up automatically — so you stop losing enquiries that came in while you were busy.</p>
      <ul className="list-disc list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li>WhatsApp and form lead capture</li>
        <li>CRM setup and pipeline management</li>
        <li>Automated follow-up sequences</li>
        <li>Lead scoring and qualification</li>
        <li>Weekly lead reports</li>
      </ul>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><a href="/services/lead-generation" className="text-[#C8B8A2] hover:underline">Learn more about Lead Generation →</a></p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Website Development</h3>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">A website that ranks, loads fast, and converts visitors into enquiries. Not a digital brochure.</p>
      <ul className="list-disc list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li>Conversion-focused design</li>
        <li>Next.js development (sub-2s load times)</li>
        <li>Mobile-first, SEO-ready from day one</li>
        <li>Google Search Console setup included</li>
      </ul>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><a href="/services/website-development" className="text-[#C8B8A2] hover:underline">Learn more about Website Development →</a></p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Automation Systems</h3>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Connecting your tools so work happens without you having to trigger it manually every time.</p>
      <ul className="list-disc list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li>Lead acknowledgment emails / WhatsApp messages</li>
        <li>Follow-up sequences</li>
        <li>Review request automation</li>
        <li>AMC / renewal reminders</li>
        <li>Onboarding workflows</li>
      </ul>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><a href="/services/automation" className="text-[#C8B8A2] hover:underline">Learn more about Automation →</a></p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">AI Agents</h3>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Custom AI that does actual work — qualifies leads, answers customer questions, processes documents, sends personalised outreach.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><a href="/services/ai-agents" className="text-[#C8B8A2] hover:underline">Learn more about AI Agents →</a></p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Kolkata Businesses Work With Kinetic</h2>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">We build systems, not campaigns.</strong> A campaign ends. An SEO foundation, a CRM, and an automated follow-up system compound over time. What we build for you today will still be generating leads in 18 months.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">You talk to the founder directly.</strong> Not an account manager, not a junior executive, not a team in a different city. Ayush is the person who builds your system and the person you call when you have a question.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">We measure what actually matters.</strong> Not impressions. Not "reach." Leads generated, conversion rate, cost per enquiry, revenue attributed to digital. If we can't tie an outcome to a number, we don't track it.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">No lock-in.</strong> Everything we build — the code, the CRM setup, the automation workflows — you own. If you ever want to move on, you can. We don't believe in dependency as a business model.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Who We Work With in Kolkata</h2>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Kinetic works best with:</p>
      <ul className="list-disc list-inside space-y-2 text-[#a1a1aa] mb-6">
        <li><strong className="text-white">Service businesses</strong> — clinics, law firms, CAs, consultants, contractors — who rely on local enquiries and need to show up on Google Maps and organic search</li>
        <li><strong className="text-white">B2B companies</strong> — who need a lead pipeline and a follow-up system, not just a website</li>
        <li><strong className="text-white">Founders</strong> — who understand that digital infrastructure is a business asset, not a marketing expense</li>
        <li><strong className="text-white">Businesses with traction</strong> — who have a working product or service and need systems to scale it</li>
      </ul>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">We're not the right fit for: businesses that want ads managed on a retainer with no focus on underlying infrastructure, or those looking for the cheapest option in the market.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Kolkata's Digital Marketing Landscape</h2>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Kolkata has no shortage of digital marketing agencies — Webskitters, Pixel Street, Keyline, Brrandom, Digital Piloto, and dozens of smaller shops all operate in the same space.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Most of them are good at one layer of the stack: design, or ads, or SEO. Few are able to build the full system — website, SEO, CRM, automation — as an integrated whole.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">That's Kinetic's positioning. Not the cheapest, not the flashiest — the one that builds the thing properly and hands it over running.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Frequently Asked Questions</h2>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">How much does digital marketing cost in Kolkata?</strong></p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">It depends entirely on what you need. A one-time website + SEO foundation is a very different engagement from ongoing lead generation and CRM management. Book a discovery call and we'll scope it clearly.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">Do you run Google Ads or Facebook Ads?</strong></p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Not as a standalone service. We can include paid ads as part of a broader growth system, but we don't manage ad spend without the underlying infrastructure (website, landing page, CRM, follow-up) in place. Ads without that foundation waste budget.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">How long before I see results from SEO?</strong></p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Honest answer: 3–6 months for meaningful keyword movement, assuming your site is properly indexed and targeting the right keywords. Local SEO (Google Maps / Google Business Profile) tends to show results faster — often within 4–8 weeks of a properly optimised GBP listing.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">Can you take over from our current agency?</strong></p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Yes. We've onboarded clients who were paying retainers for months with no clear output. We audit what exists, keep what's working, fix what isn't, and build what's missing.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><strong className="text-white">Do you work with businesses outside Kolkata?</strong></p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Yes. We're based in Kolkata but serve clients across India and internationally. All engagements are remote-friendly.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Start With a Free Discovery Call</h2>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">30 minutes. We look at your current digital presence, identify the biggest gaps, and tell you exactly what we'd do and in what order.</p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed"><a href="/book-call" className="text-[#C8B8A2] hover:underline">Book a Discovery Call</a></p>
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">Not ready for a call? Take our <a href="/free-website-audit" className="text-[#C8B8A2] hover:underline">free Digital Health Score quiz</a> first — 12 questions, instant results, no email required.</p>
      <hr className="border-white/10 my-8" />
      <p className="text-[#a1a1aa] mb-4 leading-relaxed">*Kinetic — Digital Growth Studio. Based in Kolkata. Website Development, SEO, Lead Generation, CRM, Automation & AI Agents.*</p>
        </div>

        <div className="mt-12 p-6 bg-[#111111] border border-[#1a1a1a] rounded-xl">
          <p className="text-white font-semibold text-lg mb-2">Ready to get started?</p>
          <p className="text-white/60 mb-4">Book a free 30-minute discovery call with Kinetic.</p>
          <Link
            href="/book-call"
            className="inline-block px-6 py-3 bg-[#C8B8A2] text-black font-semibold rounded-lg hover:bg-[#B8A892] transition-colors"
          >
            Book a Free Call →
          </Link>
        </div>
      </div>
    </main>
    </>
  )
}
