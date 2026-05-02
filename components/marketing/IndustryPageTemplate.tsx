import Link from "next/link"
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from "@/components/seo/JsonLd"
import LeadAuditCTA from "@/components/lead/LeadAuditCTA"
import { PageHero } from "@/components/layout/PageHero"
import { PageSection } from "@/components/layout/PageSection"
import { PageContainer } from "@/components/layout/PageContainer"
import { SectionHeader } from "@/components/ui/SectionHeader"
import { Card } from "@/components/ui/Card"

export interface IndustryFaq {
  question: string
  answer: string
}

export interface IndustryPageData {
  slug: string
  badge: string
  headline: string
  subheadline: string
  heroDescription: string
  industryName: string
  problemTitle: string
  problemBody: string
  problemPoints: string[]
  solutionTitle: string
  solutionBody: string
  features: { icon: string; title: string; description: string }[]
  resultsStats: { value: string; label: string; sub: string }[]
  faqs: IndustryFaq[]
  relatedServices: { href: string; label: string }[]
  relatedIndustries: { href: string; label: string }[]
  ctaHeadline: string
  ctaSubtext: string
}

export function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  const pageUrl = `https://buildwithkinetic.org/${data.slug}`

  return (
    <>
      <JsonLd
        schema={serviceSchema({
          name: `${data.industryName} Website Development`,
          description: data.heroDescription,
          url: pageUrl,
          serviceType: `Website Development for ${data.industryName}`,
        })}
      />
      <JsonLd schema={faqSchema(data.faqs)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: "https://buildwithkinetic.org" },
          { name: "Industries", url: "https://buildwithkinetic.org/services" },
          { name: `${data.industryName} Websites`, url: pageUrl },
        ])}
      />

      <main className="bg-[#0A0A0A] min-h-screen text-white">



        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <div className="pt-24 pb-0">
          <PageContainer>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-white/50">
              <Link href="/" className="hover:text-[#3B82F6] transition-colors">Home</Link>
              <span>/</span>
              <span>Industries</span>
              <span>/</span>
              <span className="text-[#3B82F6]">{data.industryName}</span>
            </nav>
          </PageContainer>
        </div>

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <PageHero
          badge={data.badge}
          headline={data.subheadline}
          accentWord={data.industryName}
          description={data.heroDescription}
          primaryCta={{ label: "Check My Digital Health Score — Free", href: "/free-website-audit" }}
          secondaryCta={{ label: "See All Services", href: "/website-development" }}
        />

        {/* ── Problem / Challenge ──────────────────────────────────────── */}
        <PageSection variant="surface">
          <PageContainer>
            <SectionHeader
              eyebrow="THE CHALLENGE"
              title={data.problemTitle}
              description={data.problemBody}
              className="mb-10"
            />
            <ul className="grid md:grid-cols-2 gap-3">
              {data.problemPoints.map((point, idx) => (
                <li key={idx}>
                  <Card variant="default" className="flex items-start gap-3 !p-4">
                    <span className="text-[#3B82F6] mt-0.5 shrink-0">✗</span>
                    <span className="text-white/50 text-sm">{point}</span>
                  </Card>
                </li>
              ))}
            </ul>
          </PageContainer>
        </PageSection>

        {/* ── Solution ─────────────────────────────────────────────────── */}
        <PageSection>
          <PageContainer>
            <SectionHeader
              eyebrow="THE KINETIC SOLUTION"
              title={data.solutionTitle}
              description={data.solutionBody}
              className="mb-12"
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.features.map((feature, idx) => (
                <article key={feature.title}>
                  <Card
                    variant="default"
                    className="h-full hover:border-[#3B82F6]/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center text-xl mb-4">
                      {feature.icon}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-[#3B82F6]">0{idx + 1}</span>
                      <h3 className="font-bold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                </article>
              ))}
            </div>
          </PageContainer>
        </PageSection>

        {/* ── Results stats ────────────────────────────────────────────── */}
        <PageSection variant="surface" padding="md">
          <PageContainer>
            <SectionHeader eyebrow="RESULTS THAT MATTER" title="" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.resultsStats.map((stat) => (
                <Card key={stat.label} variant="accent" accentTop className="text-center">
                  <div className="text-5xl font-black text-[#3B82F6] mb-2">{stat.value}</div>
                  <div className="text-base font-bold text-white mb-1">{stat.label}</div>
                  <div className="text-xs text-white/50">{stat.sub}</div>
                </Card>
              ))}
            </div>
          </PageContainer>
        </PageSection>

        {/* ── Mid-page Audit CTA ───────────────────────────────────────── */}
        <PageSection padding="md">
          <PageContainer>
            <LeadAuditCTA />
          </PageContainer>
        </PageSection>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <PageSection>
          <PageContainer size="md">
            <SectionHeader
              eyebrow="FAQ"
              title={`Questions About ${data.industryName} Websites`}
              className="mb-10"
            />
            <div className="space-y-4">
              {data.faqs.map((faq, idx) => (
                <Card key={idx} variant="default">
                  <h3 className="font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </PageContainer>
        </PageSection>

        {/* ── Internal linking hook ─────────────────────────────────────── */}
        <PageSection padding="sm">
          <PageContainer>
            <p className="text-sm text-white/50 leading-relaxed">
              Want to see why your website isn&apos;t converting?{" "}
              <Link href="/free-website-audit" className="text-[#3B82F6] hover:underline font-semibold">
                Get a free website growth audit →
              </Link>
            </p>
          </PageContainer>
        </PageSection>

        {/* ── Related links ────────────────────────────────────────────── */}
        <PageSection variant="surface" padding="md">
          <PageContainer>
            <p className="text-xs font-mono text-white/50 tracking-widest uppercase mb-6">EXPLORE MORE</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-mono text-[#3B82F6] mb-3 uppercase tracking-wider">Our Services</p>
                <ul className="space-y-2">
                  {data.relatedServices.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center gap-2 text-white/50 hover:text-[#3B82F6] transition-colors text-sm">
                        <span className="text-[#3B82F6]/50">→</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-mono text-[#3B82F6] mb-3 uppercase tracking-wider">Other Industries</p>
                <ul className="space-y-2">
                  {data.relatedIndustries.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="flex items-center gap-2 text-white/50 hover:text-[#3B82F6] transition-colors text-sm">
                        <span className="text-[#3B82F6]/50">→</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PageContainer>
        </PageSection>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <PageSection padding="xl">
          <PageContainer size="md">
            <div className="text-center">
              <p className="text-xs font-mono text-[#3B82F6] tracking-widest uppercase mb-4">GET STARTED</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">{data.ctaHeadline}</h2>
              <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto">{data.ctaSubtext}</p>
              <Link
                href="/free-website-audit"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#3B82F6] text-white font-bold rounded-full text-xl hover:bg-[#6366F1] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50"
              >
                Get a Free Growth Audit →
              </Link>
              <p className="mt-4 text-xs font-mono text-white/50">No commitment. Personalised report within 24 hours.</p>
            </div>
          </PageContainer>
        </PageSection>

      </main>
    </>
  )
}

