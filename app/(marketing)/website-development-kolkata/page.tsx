import type { Metadata } from "next"
import Link from "next/link"
import { JsonLd, localBusinessSchema, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Website Development in Kolkata | Kinetic",
  description:
    "Professional website development in Kolkata for businesses that want leads, not just a presence. Built in Next.js, live in 2 weeks.",
}

const wdkFAQs = [
  { question: "How much does website development cost in Kolkata?", answer: "A professional business website from Kinetic starts from \u20b925,000. Full-stack web applications start from \u20b975,000. Book a free call for a specific quote." },
  { question: "How long does it take to build a website in Kolkata?", answer: "Most business websites take 2\u20134 weeks from kickoff to launch." },
  { question: "Will my website show up on Google?", answer: "Yes. Kinetic sets up Google Search Console, submits your sitemap, and requests indexing for all key pages as part of every delivery." },
  { question: "Do I own the website after it's built?", answer: "Completely. You get the full codebase, all credentials, and can host it wherever you choose. No lock-in." },
]

export default function Page() {
  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={serviceSchema({ name: "Website Development Kolkata", description: "Custom, conversion-focused website development for businesses in Kolkata. Built on Next.js, SEO-ready, and handed over running.", url: "https://buildwithkinetic.org/website-development-kolkata", serviceType: "Website Development" })} />
      <JsonLd schema={faqSchema(wdkFAQs)} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: "https://buildwithkinetic.org" }, { name: "Website Development Kolkata", url: "https://buildwithkinetic.org/website-development-kolkata" }])} />
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Website Development in Kolkata</h1>
      <p className="text-white/70 mb-4 leading-relaxed">Most websites built for Kolkata businesses do one thing well: they look like a website. They load slowly, don't show up on Google, and send visitors nowhere in particular. Then the business owner wonders why the site isn't generating leads.</p>
      <p className="text-white/70 mb-4 leading-relaxed">At Kinetic, we build websites differently. Every site we deliver is fast, indexed, conversion-focused — and connected to the rest of your digital infrastructure from day one.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Kolkata Businesses Actually Need From a Website</h2>
      <p className="text-white/70 mb-4 leading-relaxed">If you run a business in Kolkata — a clinic, a law firm, a contractor, a services company — your website has one job: bring in qualified enquiries.</p>
      <p className="text-white/70 mb-4 leading-relaxed">That means it needs to:</p>
      <ul className="list-disc list-inside space-y-2 text-white/70 mb-6">
        <li><strong className="text-white">Load in under 2 seconds</strong> (slow sites lose 53% of mobile visitors before the page even appears)</li>
        <li><strong className="text-white">Show up on Google</strong> when someone searches for your service in Kolkata</li>
        <li><strong className="text-white">Have one clear call to action</strong> — not five options and a contact form buried in the footer</li>
        <li><strong className="text-white">Build trust immediately</strong> — with specific proof, not generic "we're the best" copy</li>
        <li><strong className="text-white">Work on mobile</strong> — over 70% of search traffic in India is now mobile</li>
      </ul>
      <p className="text-white/70 mb-4 leading-relaxed">Most website development companies in Kolkata deliver a site that checks the visual box. Kinetic delivers a site that does the commercial job.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Our Website Development Process</h2>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">1. Discovery Call (Free, 30 minutes)</h3>
      <p className="text-white/70 mb-4 leading-relaxed">We start by understanding your business — what you sell, who buys it, how they find you today, and what you want the site to do. No templates, no assumptions.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">2. Strategy & Architecture</h3>
      <p className="text-white/70 mb-4 leading-relaxed">Before a single line of code is written, we map out the site structure, the conversion flow, and the SEO foundation. This is where most Kolkata developers skip ahead — and why their sites don't rank.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">3. Design & Development</h3>
      <p className="text-white/70 mb-4 leading-relaxed">We build on <strong className="text-white">Next.js</strong> — the same framework used by Notion, TikTok, and hundreds of fast-growing companies. It produces sites that score 90+ on Google PageSpeed, render instantly on mobile, and are built for long-term SEO performance.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">4. SEO Foundation Setup</h3>
      <p className="text-white/70 mb-4 leading-relaxed">Every site we deliver includes: clean URL structure, metadata, Open Graph tags, sitemap, Google Search Console setup, and indexing requests for all key pages. Your site is Google-ready on day one.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">5. Launch & Handover</h3>
      <p className="text-white/70 mb-4 leading-relaxed">You get the full site, the codebase, the credentials, and a walkthrough. No dependencies, no retainer you didn't ask for. If you want ongoing support, that's a separate conversation.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What We Build</h2>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Business Websites</h3>
      <p className="text-white/70 mb-4 leading-relaxed">For service businesses, consultants, clinics, law firms, contractors, and local companies in Kolkata. Clear, fast, and built to convert visitors into enquiries.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Lead Generation Websites</h3>
      <p className="text-white/70 mb-4 leading-relaxed">Designed around a single conversion goal. Every element — headline, copy, CTA, social proof — is optimised to move a visitor toward booking a call or filling a form.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">Full Stack Web Applications</h3>
      <p className="text-white/70 mb-4 leading-relaxed">Custom-built software on Next.js + Supabase: booking systems, client portals, CRM dashboards, internal tools. For when off-the-shelf software has become a ceiling.</p>
      <h3 className="text-xl font-semibold text-white mt-8 mb-3">E-commerce Websites</h3>
      <p className="text-white/70 mb-4 leading-relaxed">Product catalogues, checkout flows, and inventory management for Kolkata businesses selling online.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why Kolkata Businesses Work With Kinetic</h2>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Direct access to the engineer.</strong> You work with Ayush — the founder and developer — not an account manager who relays messages to a team in a different city.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Fast delivery.</strong> Most projects complete in 2–4 weeks. Not 3 months.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Built for growth, not just launch.</strong> Every site is integrated with your SEO setup, your lead capture system, and (if needed) your CRM from day one. The website isn't the finish line — it's the starting point.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">India-native pricing, world-class stack.</strong> You get Next.js engineering at a fraction of what a comparable agency in Mumbai or Bangalore would charge.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">No ongoing retainers you didn't ask for.</strong> We build it, hand it over, and you own it completely. If you want to continue working together, that's a choice — not a lock-in.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Tech Stack</h2>
      <p className="text-white/70 mb-4 leading-relaxed">Every Kinetic website is built on:</p>
      <ul className="list-disc list-inside space-y-2 text-white/70 mb-6">
        <li><strong className="text-white">Next.js 14</strong> — App Router, server components, sub-second load times</li>
        <li><strong className="text-white">Tailwind CSS</strong> — clean, responsive design without bloated frameworks</li>
        <li><strong className="text-white">Supabase</strong> — if your site needs a database, forms, or authentication</li>
        <li><strong className="text-white">Vercel</strong> — global CDN deployment, 99.9% uptime, automatic HTTPS</li>
        <li><strong className="text-white">Framer Motion</strong> — subtle, professional animations where appropriate</li>
      </ul>
      <p className="text-white/70 mb-4 leading-relaxed">The result: a site that scores well on Core Web Vitals (Google's ranking factor for page experience), loads instantly on 4G in Kolkata, and costs a fraction of a monthly SaaS subscription to run.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Frequently Asked Questions</h2>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">How much does website development cost in Kolkata?</strong></p>
      <p className="text-white/70 mb-4 leading-relaxed">Kinetic doesn't publish fixed pricing — every project is scoped after a discovery call. As a rough guide: a professional business website typically starts from ₹25,000–₹40,000. Full stack web applications start from ₹75,000+. Book a call and we'll give you a specific quote.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">How long does it take to build a website in Kolkata?</strong></p>
      <p className="text-white/70 mb-4 leading-relaxed">Most business websites take 2–4 weeks from kickoff to launch. More complex projects (web apps, e-commerce) take 4–8 weeks. We don't pad timelines.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Do you work with businesses outside Kolkata?</strong></p>
      <p className="text-white/70 mb-4 leading-relaxed">Yes. While we're based in Kolkata, we work with businesses across India and internationally. The discovery call, development, and handover are all remote-friendly.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Will my website show up on Google?</strong></p>
      <p className="text-white/70 mb-4 leading-relaxed">We set up Google Search Console, submit your sitemap, and request indexing for all key pages as part of every delivery. Ranking for specific keywords takes longer — that's where our <a href="/services/seo" className="text-[#C8B8A2] hover:underline">SEO service</a> comes in — but you'll be properly indexed from day one.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Can you redesign an existing website?</strong></p>
      <p className="text-white/70 mb-4 leading-relaxed">Yes. If your current site is slow, outdated, or not converting — we can rebuild it on a modern stack while preserving your existing content and URLs.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><strong className="text-white">Do I own the website after it's built?</strong></p>
      <p className="text-white/70 mb-4 leading-relaxed">Completely. You get the full codebase, all credentials, and can host it wherever you choose. No lock-in.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Kolkata Businesses We've Worked With</h2>
      <p className="text-white/70 mb-4 leading-relaxed">Kinetic has worked with businesses in Kolkata and across India — from healthcare and legal to e-commerce and professional services. <a href="/work/sheknowmics" className="text-[#C8B8A2] hover:underline">View our work</a> to see an example.</p>
      <hr className="border-white/10 my-8" />
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Ready to Build Your Website?</h2>
      <p className="text-white/70 mb-4 leading-relaxed">Book a free 30-minute discovery call. We'll look at your current setup, talk through what you need, and give you a clear picture of what's possible — with no obligation.</p>
      <p className="text-white/70 mb-4 leading-relaxed"><a href="/book-call" className="text-[#C8B8A2] hover:underline">Book a Discovery Call</a></p>
      <p className="text-white/70 mb-4 leading-relaxed">Or if you want to start by checking the health of your current digital presence, take our <a href="/free-website-audit" className="text-[#C8B8A2] hover:underline">free Digital Health Score quiz</a> — 12 questions, instant results.</p>
      <hr className="border-white/10 my-8" />
      <p className="text-white/70 mb-4 leading-relaxed">*Kinetic — Website Development, SEO, CRM, Automation & AI Agents. Based in Kolkata. Serving businesses across India and globally.*</p>
        </article>

        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
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
