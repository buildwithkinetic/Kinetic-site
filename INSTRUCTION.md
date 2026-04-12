# Kinetic — Project Instruction File

---

## Who I Am

- **Name:** Ayush Gupta
- **Role:** Founder & sole operator of Kinetic
- **Location:** Kolkata, India
- **Email:** admin@buildwithkinetic.org
- **LinkedIn:** https://www.linkedin.com/in/21-ayushgupta
- **Website:** https://buildwithkinetic.org

I am a solo growth engineer — there is no team. When Claude refers to "the team" or "our team," correct it. First-person or "Ayush + you" framing is preferred.

---

## What Kinetic Does

Kinetic builds automated growth systems for small businesses and startups in India. Not just websites — full systems: lead capture, CRM, automation, and analytics, installed and running before handover.

**Positioning statement (use this verbatim when relevant):**
> "Most agencies build you a website and disappear. Most platforms give you a tool and leave you to figure it out. Kinetic does neither — we build the system, install it in your business, and make sure it runs."

**Tagline:** "The System Behind Your Growth."

---

## The 5 Growth Offers

These are the only offers Kinetic sells. Always reference these — never invent new service names.

| # | Name | Price | Timeline | Badge |
|---|------|-------|----------|-------|
| 1 | The Visibility Fix | ₹25,000 | Live in 2 weeks | — |
| 2 | The Lead Capture System | ₹40,000 | Live in 2–3 weeks | Most Popular |
| 3 | The Repeat Revenue Engine | ₹30,000 | Live in 2 weeks | — |
| 4 | The Full Growth System | ₹75,000 | Live in 4 weeks | Best Value |
| 5 | The Quick Win Audit | ₹8,000 | Done in 1 week | — |

### Offer Guarantees (use verbatim)
- **Offer 1:** "If you don't appear on the first page of Google for your primary keyword in 30 days, I'll keep working at no extra charge."
- **Offer 2:** "If you miss a single lead due to a system failure in the first 90 days, I fix it free."
- **Offer 3:** "If your Google review count doesn't increase within 60 days, I'll audit and rebuild the flow free."
- **Offer 4:** "90-day performance guarantee — if the system doesn't generate measurable lead growth, I keep working until it does."
- **Offer 5:** "If you don't find the audit valuable, I'll refund it in full — no questions asked."

---

## Key CTAs & Links

Always use these — never invent new CTA copy.

| CTA | Copy | URL |
|-----|------|-----|
| Primary | Book a Free Strategy Call | /book-call |
| Secondary | See how it works | scrolls to #system-details |
| Mobile floating | Book a Free Call | /book-call |
| Navbar CTA | Book a Strategy Call | /book-call |
| Case study | Work → Sheknowmics | /work/sheknowmics |

**Microcopy beneath primary CTA:** "30-minute call · No pitch · No retainer"

---

## Website Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion (`motion.*`, `useInView`, `Variants`) + GSAP (imported in some components)
- **Smooth Scroll:** Lenis
- **3D:** Three.js (HeroCanvas particle network)
- **Database:** Supabase
- **Automation:** n8n
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4 (G-B73G9G4SBL) + Vercel Analytics
- **Font:** Inter (Google Fonts, weights 300–800) — used for both display and body
- **UI Primitives:** Radix UI (Dialog, Select, Tabs, Toast, Checkbox, Dropdown Menu)
- **Forms:** React Hook Form + Zod

### Brand Colours (CSS custom properties defined in globals.css)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0A0A0A` | Page background, near-black |
| `--bg-card` | `#111111` | Card backgrounds, elevated surfaces |
| `--bg-card-2` | `#1A1A1A` | Secondary card / muted card bg |
| `--bg-dark` | `#050505` | Deepest dark sections |
| `--t1` | `#FFFFFF` | Primary text, headings |
| `--t2` | `#E4E4E7` | Secondary text |
| `--t3` | `#A1A1AA` | Muted body text |
| `--t4` | `#52525B` | Subtle text, labels, microcopy |
| `--blue` / `--accent` | `#3B82F6` | Primary accent — CTAs, highlights, glows |
| `--purple` | `#8B5CF6` | Gradient endpoint |
| `--gradient` | `linear-gradient(135deg, #3B82F6, #8B5CF6)` | Primary CTA gradient |
| `--green` | `#22C55E` | Success / live indicators |
| `--border` | `rgba(255,255,255,0.08)` | Default border color |
| `--border-dark` | `rgba(255,255,255,0.12)` | Hover / active border |

**Note:** The legacy `--orange` variable exists but is mapped to `#3B82F6` (blue). The site does NOT use orange anywhere.

---

## Project File Structure

```
Kinetic-website/
├── app/
│   ├── globals.css                          ← Design system tokens (CSS custom props)
│   ├── layout.tsx                           ← Root layout (Inter font, GA4, Footer, CustomCursor, ScrollProgress)
│   ├── (marketing)/
│   │   ├── layout.tsx                       ← Marketing layout (Navbar, LenisProvider, PageTransition)
│   │   ├── page.tsx                         ← Homepage metadata + JSON-LD
│   │   ├── services/page.tsx                ← 5 Growth Offers page
│   │   ├── about/page.tsx                   ← Founder page (Ayush, first-person)
│   │   ├── free-website-audit/page.tsx      ← Audit form
│   │   ├── book-call/                       ← Strategy call booking page
│   │   ├── contact/page.tsx
│   │   ├── results/page.tsx                 ← Results / social proof page
│   │   ├── lead-generation-system/page.tsx  ← Systems Catalogue (Industry Systems)
│   │   ├── blog/
│   │   ├── work-with-us/                    ← System tiers page
│   │   ├── portfolio/                       ← Redirects to /work/sheknowmics (noindex)
│   │   └── [programmatic SEO pages]/        ← website-development-kolkata, seo-agency-kolkata, etc.
│   ├── work/                                ← Case studies
│   ├── book/                                ← Booking routes
│   ├── dashboard/                           ← Internal CRM dashboard
│   └── api/                                 ← API routes
├── components/
│   ├── Navbar.tsx                            ← Shared floating pill nav (used via marketing layout)
│   ├── Footer.tsx                            ← Shared footer (rendered in root layout)
│   ├── Reveal.tsx                            ← Scroll-reveal animation wrapper (Framer Motion)
│   ├── CustomCursor.tsx                      ← Custom cursor (desktop only)
│   ├── ScrollProgress.tsx                    ← Scroll progress indicator
│   ├── HeroCanvas.tsx                        ← Three.js particle network (hero background)
│   ├── LenisProvider.tsx                     ← Lenis smooth scroll wrapper
│   ├── PageTransition.tsx                    ← Route transition wrapper
│   ├── ServicePageLayout.tsx                 ← Template for programmatic SEO service pages
│   ├── DiscoveryButton.tsx                   ← Animated CTA button component
│   ├── marketing/
│   │   ├── HomepageClient.tsx                ← Main homepage (~1200 lines, "use client")
│   │   ├── SystemPageClient.tsx              ← Industry Systems catalogue page
│   │   ├── ServicesPageClient.tsx            ← Growth Offers page client
│   │   ├── AboutPageClient.tsx               ← About page client
│   │   ├── ContactPageClient.tsx             ← Contact page client
│   │   ├── ResultsPageClient.tsx             ← Results page client
│   │   ├── WorkWithUsPageClient.tsx          ← Work With Us page client
│   │   ├── SheknowmicsPageClient.tsx         ← Case study page
│   │   ├── IndustryPageTemplate.tsx          ← Template for industry pages (gym, cafe, etc.)
│   │   ├── ServicePageTemplate.tsx           ← Template for individual service pages
│   │   └── StickyCtaBanner.tsx               ← Sticky CTA banner component
│   ├── forms/
│   │   └── ContactForm.tsx
│   ├── seo/
│   │   └── JsonLd.tsx                        ← Structured data (WebSite, Org, LocalBusiness, FAQ, Breadcrumbs)
│   ├── ui/                                   ← Reusable UI primitives (Button, Card, Badge, SectionHeader)
│   ├── dashboard/                            ← Internal CRM dashboard components
│   ├── layout/                               ← Layout-level components
│   └── lead/                                 ← Lead management components
├── lib/
│   ├── analytics.ts                          ← GA4 event tracking helpers
│   ├── animations.ts                         ← Shared easing / animation config
│   ├── blog.ts                               ← Blog content data
│   ├── programmatic-seo.ts                   ← pSEO page data generation
│   ├── types.ts                              ← Shared TypeScript types
│   ├── utils.ts                              ← Utility functions
│   ├── supabase/                             ← Supabase client config
│   └── emails/                               ← Email templates (Resend)
├── public/
│   ├── ayush.jpg                             ← Founder headshot
│   ├── favicon.svg / icon.svg                ← Site favicons
│   └── llms.txt                              ← LLM-friendly site description
└── CLAUDE.md                                 ← This file
```

### Key Homepage Sections (HomepageClient.tsx)
- `Hero` — full-viewport, Three.js particle bg, headline "Scale your revenue. Not your workload.", CTA → `/book-call`
- `TrustBar` — horizontal strip: "Websites · Web Apps · AI Agents | Delivered in 2–4 weeks | B2B solutions..."
- `ProblemSection` — "Most businesses don't have a system." + 3 pain-point cards
- `SystemDetails` — id="system-details", 5-step flow bar (Traffic → Conversion), "The System Behind Predictable Growth"
- `HowItWorks` — "Four steps to a system that runs itself." + numbered timeline
- `WhatWeBuild` — 3×2 capability grid (6 cards: Conversion Website, Web App/SaaS, AI Agents, SEO, CRM, Automation)
- `LeadMagnet` — Mid-page CTA card with gradient background
- `Results` — id="results", metrics bar + Sheknowmics case study
- `FAQ` — 5 accordion questions
- `FinalCTA` — Bottom CTA section
- `FloatingMobileCTA` — Fixed bottom CTA (mobile only, appears after 600px scroll)
- `StickyCtaBanner` — Sticky banner component

### Navbar Structure
- Floating pill design, fixed top center, frosted glass backdrop
- Links: Services, Systems, Results, About
- CTA: "Book a Strategy Call" → `/book-call`
- Mobile: hamburger menu with staggered link animation
- Service dropdown links in mobile menu: Website Development, SEO Agency, Lead Generation, CRM & Automation, Web App Development

---

## Coding Conventions

- **Always run TypeScript check** after edits: `node_modules/.bin/tsc --noEmit`
- **"use client"** required on any component using Framer Motion, hooks, or event listeners
- **Shared Navbar and Footer** — Navbar is rendered via `(marketing)/layout.tsx`; Footer is rendered in root `layout.tsx`
- **Reveal component** — use `<Reveal>` wrapper for scroll-triggered fade-up animations (supports `fadeUp`, `fadeIn`, `scaleIn` variants)
- **Framer Motion pattern:** use `motion.*` elements with `Variants` objects (`fadeUp`, `stagger`, `cardFadeUp`) and `whileInView` for scroll-triggered animation
- **Image tag:** use `{/* eslint-disable-next-line @next/next/no-img-element */}` before `<img>` tags; no `next/image` for the founder photo
- **No prices** on the homepage capability cards — prices only appear on the `/services` page
- **No fake testimonials** — only use real quotes from Sheknowmics
- **Inline styles** are the dominant styling pattern in marketing pages (not Tailwind utility classes, despite Tailwind being available)
- **CSS custom properties** (`var(--bg)`, `var(--t1)`, etc.) are used throughout for consistent theming
- **Button patterns:** `btnPrimary` (gradient blue→purple, pill shape) and `btnGhost` (transparent, border, pill shape) as `React.CSSProperties` objects
- **Hover effects:** implemented via `onMouseEnter`/`onMouseLeave` handlers that mutate `e.currentTarget.style`

---

## Content Rules

- Write in first-person where Ayush is speaking ("I build...", "I'll review personally...")
- No "team", no "our team", no "we have X developers"
- No fake social proof — don't invent clients, users, or stats beyond what's confirmed (Sheknowmics)
- Avoid jargon in client-facing copy — plain English ("automatically follows up" not "orchestrates async webhook triggers")
- Always include a guarantee line beneath CTAs on offer cards
- Outcome statements should be **specific and measurable** — avoid vague claims like "grow your business"

---

## Confirmed Client Work

**Sheknowmics** — Women's health & hormone-testing platform
- Route: `/work/sheknowmics`
- Component: `SheknowmicsPageClient.tsx`
- Testimonial: real quote approved for use on homepage
- Stats: real metrics from the project (confirmed in case study)
- URL: `/work/sheknowmics` (old `/portfolio` redirects here, noindex)

---

## Pages & SEO Titles

| Page | Route | Title |
|------|-------|-------|
| Homepage | `/` | Kinetic — Automated Growth Systems for Businesses \| Kolkata |
| Services | `/services` | Growth Offers — Websites, CRM & Automation for Businesses \| Kinetic |
| Systems | `/lead-generation-system` | Industry Systems \| Kinetic |
| About | `/about` | About Kinetic — Built by Ayush Gupta, Growth Engineer \| Kolkata |
| Results | `/results` | Results \| Kinetic |
| Free Audit | `/free-website-audit` | Free Website Audit |
| Book Call | `/book-call` | Book a Strategy Call |
| Work With Us | `/work-with-us` | Work With Us |
| Blog | `/blog` | Blog |
| Contact | `/contact` | Contact |

---

## Industry Systems (Systems Catalogue)

The `/lead-generation-system` page is a **Systems Catalogue** — showcasing industry-specific growth systems.

| System | Status | Industry |
|--------|--------|----------|
| Kinetic Gym OS | ● Live | Fitness & Gyms |
| Kinetic Cafe OS | Coming Soon | Cafes & Restaurants |

Cards are built with an expandable content area (`data-expandable-content`) ready for future detail views.

---

## Things Claude Should Never Do on This Project

- Add prices to the homepage capability cards
- Refer to Kinetic as having a "team" or multiple employees
- Invent new service names outside the 5 listed offers
- Use `git push` unless explicitly asked
- Use `npx tsc` (times out — use `node_modules/.bin/tsc` instead)
- Add `next/image` for `/ayush.jpg` — use a plain `<img>` tag with the eslint disable comment
- Use the old cream/orange color scheme (`#F5F0E8`, `#C8440A`) — the site is fully dark mode now
- Reference `WebsiteAuditForm.tsx` — this component no longer exists
- Reference fonts like Playfair Display or Syne — the site uses Inter exclusively