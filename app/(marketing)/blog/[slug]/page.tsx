import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPost, getRecentPosts, getAllSlugs } from "@/lib/blog"
import { JsonLd, articleSchema, breadcrumbSchema, faqSchema } from "@/components/seo/JsonLd"
import Navbar from "@/components/Navbar"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) return { title: "Post Not Found" }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://buildwithkinetic.org/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `https://buildwithkinetic.org/blog/${post.slug}`,
      publishedTime: post.dateISO,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

// Simple markdown-to-HTML renderer for blog post content
function renderContent(markdown: string): string {
  return markdown
    .trim()
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-black mt-10 mb-4 text-[#0F0E0C]">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-3 text-[#0F0E0C]">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#0F0E0C] font-bold">$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code class="bg-[#EDE8DF] text-[#3B82F6] px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/```typescript\n([\s\S]*?)```/g, '<pre class="bg-[#E5E1D9] border border-black/[0.08] rounded-2xl p-5 overflow-x-auto my-6"><code class="text-sm font-mono text-[#6B6560] whitespace-pre">$1</code></pre>')
    .replace(/```jsx\n([\s\S]*?)```/g, '<pre class="bg-[#E5E1D9] border border-black/[0.08] rounded-2xl p-5 overflow-x-auto my-6"><code class="text-sm font-mono text-[#6B6560] whitespace-pre">$1</code></pre>')
    .replace(/```\n([\s\S]*?)```/g, '<pre class="bg-[#E5E1D9] border border-black/[0.08] rounded-2xl p-5 overflow-x-auto my-6"><code class="text-sm font-mono text-[#6B6560] whitespace-pre">$1</code></pre>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-[#6B6560] mb-2"><span class="text-[#3B82F6] mt-1 shrink-0">•</span><span>$1</span></li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#3B82F6] hover:underline">$1</a>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="text-[#6B6560] mb-2"><span class="text-[#3B82F6] font-bold mr-2">$1.</span>$2</li>')
    .replace(/\n\n/g, '</p><p class="text-[#6B6560] leading-relaxed mb-4">')
    .replace(/^(?!<[h|l|p|u|o|p])(.+)$/gm, '<p class="text-[#6B6560] leading-relaxed mb-4">$1</p>')
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const postData = getBlogPost(slug)

  if (!postData) notFound()

  // TypeScript doesn't recognise notFound() as never-returning, so we narrow here
  const post = postData!

  const relatedPosts = getRecentPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <>
      <JsonLd
        schema={articleSchema({
          title: post.title,
          description: post.description,
          url: `https://buildwithkinetic.org/blog/${post.slug}`,
          datePublished: post.dateISO,
          dateModified: post.dateISO,
          authorName: post.author,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Blog", url: "https://buildwithkinetic.org/blog" },
          { name: post.title, url: `https://buildwithkinetic.org/blog/${post.slug}` },
        ])}
      />

      <main style={{ background: "var(--bg)" }} className="min-h-screen text-[#0F0E0C]">

        <Navbar />

        {/* Article Header */}
        <header style={{ background: "var(--bg)" }} className="pt-28 pb-12 px-6 border-b border-black/[0.06]">
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#6B6560] mb-6">
              <Link href="/" className="hover:text-[#3B82F6] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#3B82F6] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#3B82F6] truncate max-w-[200px]">{post.title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-full text-xs font-mono text-[#3B82F6]">
                {post.category}
              </span>
              <span className="text-xs text-[#6B6560] font-mono">{post.date}</span>
              <span className="text-xs text-[#6B6560] font-mono">{post.readTime}</span>
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,56px)", fontWeight: 400, letterSpacing: "-1px", lineHeight: 1.1, color: "var(--t1)", marginBottom: "20px" }}>{post.title}</h1>

            <p style={{ fontFamily: "var(--font-body)", color: "var(--t3)", fontSize: "18px", lineHeight: 1.65, marginBottom: "24px", fontWeight: 300 }}>{post.description}</p>

            <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 flex items-center justify-center text-sm font-bold text-[#3B82F6]">
                K
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F0E0C]">{post.author}</p>
                <p className="text-xs text-[#6B6560]">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
            />
          </div>
        </article>

        {/* Tags */}
        <div className="px-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 pt-6 border-t border-black/[0.06]">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{ background: "var(--bg-card)" }} className="px-3 py-1 border border-black/[0.08] rounded-full text-xs font-mono text-[#6B6560]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Mid-article CTA */}
        <section style={{ background: "var(--bg-card)" }} className="py-14 px-6 border-y border-black/[0.06]">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-mono text-[#3B82F6] tracking-widest uppercase mb-1">FREE RESOURCE</p>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 400, letterSpacing: "-0.3px", marginBottom: "4px", color: "var(--t1)" }}>Get a free website growth audit</h2>
              <p className="text-[#6B6560] text-sm">We&apos;ll review your site and show you exactly what&apos;s costing you leads.</p>
            </div>
            <Link
              href="/book-call"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#0F0E0C] text-[#F5F0E8] font-bold rounded-full hover:bg-[#3B82F6] transition-colors duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/meet.svg" alt="Video call icon" width={16} height={16} style={{ borderRadius: '3px', flexShrink: 0 }} />
              Book a Discovery Call
            </Link>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "3px", color: "var(--t4)", textTransform: "uppercase", marginBottom: "32px" }}>/ KEEP READING</p>
              <div className="grid md:grid-cols-3 gap-5">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    style={{ background: "var(--bg-card)" }} className="group rounded-2xl p-5 border border-black/[0.08] hover:border-[#3B82F6]/20 transition-all"
                  >
                    <span className="px-2 py-0.5 bg-[#3B82F6]/10 rounded-full text-xs font-mono text-[#3B82F6] mb-3 inline-block">
                      {related.category}
                    </span>
                    <h3 className="font-bold text-sm leading-snug mb-2 text-[#0F0E0C] group-hover:text-[#3B82F6] transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-xs text-[#6B6560] font-mono">{related.date} · {related.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links */}
        <section style={{ background: "var(--bg-card)" }} className="py-12 px-6 border-t border-black/[0.06]">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-mono text-[#6B6560] tracking-widest uppercase mb-5">EXPLORE OUR SERVICES</p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/website-development", label: "Website Development" },
                { href: "/conversion-focused-websites", label: "Conversion-Focused Design" },
                { href: "/lead-generation-websites", label: "Lead Generation Websites" },
                { href: "/web-app-development", label: "Web App Development" },
                { href: "/crm-dashboard-development", label: "CRM Dashboards" },
                { href: "/business-automation-systems", label: "Business Automation" },
                { href: "/startup-website-development", label: "Startup Websites" },
                { href: "/gym-website-development", label: "Gym Websites" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ background: "var(--bg)" }} className="px-4 py-2 border border-black/[0.08] rounded-full text-sm text-[#6B6560] hover:text-[#3B82F6] hover:border-[#3B82F6]/20 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-black/[0.06]">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="text-lg font-black tracking-tight text-[#0F0E0C]">
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
