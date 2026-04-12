import type { Metadata } from "next"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { getRecentPosts, getFeaturedPosts } from "@/lib/blog"
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "Blog | Digital Growth, Website Development & SEO Insights",
  description:
    "Insights on website development, SEO, lead generation, and digital growth from Kinetic. Practical guides for founders and business owners.",
  alternates: {
    canonical: "https://buildwithkinetic.org/blog",
  },
  openGraph: {
    title: "Kinetic Blog | Digital Growth & Website Development Insights",
    description:
      "Practical guides on website development, conversion optimization, SEO, and digital growth from Kinetic.",
    url: "https://buildwithkinetic.org/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic Blog | Growth & SEO Insights",
    description:
      "Practical guides on website development, SEO, and digital growth for founders.",
    creator: "@buildwithkinetic",
  },
}

export default function BlogPage() {
  const recentPosts = getRecentPosts(20)
  const featuredPosts = getFeaturedPosts()

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Blog", url: "https://buildwithkinetic.org/blog" },
        ])}
      />

      <main className="bg-[#EDEAE3] min-h-screen text-[#0F0F0E]">

        <Navbar />

        {/* Hero */}
        <section className="pt-32 pb-16 px-6 border-b border-black/[0.06]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B6560] mb-4">
              <Link href="/" className="hover:text-[#3B82F6] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#3B82F6]">Blog</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,5vw,64px)", fontWeight: 400, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: "16px", color: "var(--t1)" }}>
              Growth Insights for{" "}
              <span className="text-[#3B82F6]">Serious Founders</span>
            </h1>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--t3)", fontSize: "17px", maxWidth: "600px", lineHeight: 1.6, fontWeight: 300 }}>
              Practical guides on conversion-focused website development, SEO strategy, lead generation, and digital growth — from Kinetic.
            </p>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 px-6 border-b border-black/[0.06]">
            <div className="max-w-6xl mx-auto">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "32px" }}>/ FEATURED ARTICLES</p>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl p-7 transition-all" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full text-xs font-mono text-[#3B82F6]">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#6B6560] font-mono">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl leading-snug mb-3 transition-colors" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--t1)" }}>
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)", color: "var(--t3)", fontWeight: 300 }}>{post.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6B6560] font-mono">{post.date}</span>
                      <span className="text-[#3B82F6] text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">
                        Read article →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "32px" }}>/ ALL ARTICLES</p>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl p-6 transition-all" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full text-xs font-mono text-[#3B82F6]">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#6B6560] font-mono">{post.date}</span>
                      <span className="text-xs text-[#6B6560] font-mono">{post.readTime}</span>
                    </div>
                    <h2 className="transition-colors mb-1" style={{ fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--t1)" }}>
                      {post.title}
                    </h2>
                    <p className="text-sm hidden md:block" style={{ fontFamily: "var(--font-body)", color: "var(--t3)", fontWeight: 300 }}>{post.description}</p>
                  </div>
                  <span className="shrink-0 text-[#3B82F6] text-sm font-semibold group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 border-t border-black/[0.06]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-4">READY TO GROW?</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 400, letterSpacing: "-1px", marginBottom: "16px", color: "var(--t1)" }}>Put these insights to work.</h2>
            <p className="text-[#6B6560] mb-8">Get a free website audit and growth strategy from Kinetic.</p>
            <Link
              href="/book-call"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F0E0C] text-[#F5F0E8] font-bold rounded-full text-lg hover:bg-[#3B82F6] transition-colors duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/meet.svg" alt="Video call icon" width={17} height={17} style={{ borderRadius: '3px', flexShrink: 0 }} />
              Book a Free Strategy Call
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-black/[0.06]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" style={{ fontFamily: "var(--font-body)", fontWeight: 700, letterSpacing: "3px", fontSize: "14px", textTransform: "uppercase", color: "var(--t1)", textDecoration: "none" }}>
              KINETIC<span className="text-[#3B82F6]">.</span>
            </Link>
            <nav className="flex flex-wrap gap-6 text-sm text-[#6B6560]">
              <Link href="/work-with-us" className="hover:text-[#3B82F6] transition-colors">Growth Offers</Link>
              <Link href="/blog" className="hover:text-[#3B82F6] transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-[#3B82F6] transition-colors">Contact</Link>
            </nav>
            <p className="text-xs font-mono text-[#6B6560]">© 2026 KINETIC</p>
          </div>
        </footer>
      </main>
    </>
  )
}
