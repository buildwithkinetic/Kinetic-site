# Kinetic — Cowork Instruction File
# Paste this into your Cowork instruction.md so Claude understands your context instantly.

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
| Primary | Get My Free Website Audit | /free-website-audit |
| Card CTA | Get This Built → | /free-website-audit |
| Offers anchor | See our 5 growth offers → | /services#growth-offers |
| Discovery | Book a Discovery Call | /contact |
| Case study | Work → Sheknowmics | /work/sheknowmics |

**Microcopy beneath primary CTA:** "No spam. No credit card. Just your audit."
**Response commitment:** Audit delivered within 24 hours. Lead acknowledgement: within 60 seconds (automated).

---

## Website Tech Stack

- **Framework:** Next.js 14 App Router (TypeScript)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion (`motion.*`, `useInView`, `useScroll`, `useTransform`)
- **Database:** Supabase
- **Automation:** n8n
- **Hosting:** Vercel
- **Font:** Playfair Display (serif, via `font-[family-name:var(--font-playfair)]`) + system sans

### Brand Colours (Tailwind hex classes)
| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#F5F0E8` | Page background, warm cream |
| Accent | `#C8440A` | Orange — CTAs, highlights, checkmarks |
| Text | `#0F0E0C` | Primary text, headings |
| Muted | `#6B6560` | Body text, secondary copy |
| Subtle | `#9E9890` | Microcopy, mono labels |
| Dark BG | `#0F0E0C` | Dark sections (Problem, Comparison strip) |

---

## Project File Structure

```
/sessions/nice-charming-newton/mnt/kinetic/
├── app/
│   └── (marketing)/
│       ├── page.tsx                    ← Homepage metadata
│       ├── services/page.tsx           ← 5 Growth Offers page
│       ├── about/page.tsx              ← Founder page (Ayush, first-person)
│       ├── free-website-audit/page.tsx ← Audit form + "What Happens Next"
│       ├── contact/page.tsx
│       ├── blog/
│       └── work/sheknowmics/           ← Only case study (replaces /portfolio)
├── components/
│   ├── marketing/
│   │   └── HomepageClient.tsx          ← Main homepage (1300+ lines, "use client")
│   └── forms/
│       └── WebsiteAuditForm.tsx        ← 2-step form (Name/Email/URL → optional)
├── public/
│   └── ayush.jpg                       ← Founder headshot (must be placed here manually)
└── INSTRUCTION.md                      ← This file
```

### Key Component Map (HomepageClient.tsx)
- `Navbar` — sticky, "Work" → `/work/sheknowmics`, CTA → `/free-website-audit`
- `Hero` — headline, subheadline, primary + secondary CTAs, "See our 5 growth offers →" link
- `TrustStrip` — "Trusted By" with Sheknowmics
- `ProblemSection` — dark bg, before/after diagram
- `HowItWorks` — id="how-it-works", 3 steps
- `SolutionSection` — id="services", 6 service cards (no prices shown)
- `Portfolio` — Sheknowmics case study + testimonial blockquote
- `TechStack`
- `WhyKinetic`
- `FounderCard` — Ayush's photo (`/ayush.jpg`), bio, LinkedIn
- `MidPageAuditCTA`
- `CTASection`
- `ContactForm`
- `FloatingMobileCTA` — appears on scroll, mobile only
- `ExitIntentPopup` — fires on mouse leave

---

## Coding Conventions

- **Always run TypeScript check** after edits: `node_modules/.bin/tsc --noEmit`
- **Use Python `open().read()/write()`** for multi-line file patches — never bash heredocs for code (parenthesis escaping issues)
- **"use client"** required on any component using Framer Motion, hooks, or event listeners
- **Nav and footer are inlined** per page — there is no shared `<Navbar>` or `<Footer>` component
- **Framer Motion pattern:** wrap sections in `<motion.div>` with `variants={fadeUp}` inside a `<Section>` component that uses `useInView`
- **Image tag:** use `{/* eslint-disable-next-line @next/next/no-img-element */}` before `<img>` tags; no `next/image` for the founder photo
- **No prices** on the homepage SolutionSection cards — prices only appear on the `/services` page
- **No fake testimonials** — only use real quotes from Sheknowmics

---

## Content Rules

- Write in first-person where Ayush is speaking ("I build...", "I'll review personally...")
- No "team", no "our team", no "we have X developers"
- No fake social proof — don't invent clients, users, or stats beyond what's confirmed (Sheknowmics, 1,200+ users)
- Avoid jargon in client-facing copy — plain English ("automatically follows up" not "orchestrates async webhook triggers")
- Always include a guarantee line beneath CTAs on offer cards
- Outcome statements should be **specific and measurable** — avoid vague claims like "grow your business"

---

## Confirmed Client Work

**Sheknowmics** — Women's health & hormone-testing platform
- Route: `/work/sheknowmics`
- Testimonial: real quote approved for use on homepage
- Stats: real metrics from the project (confirmed in case study)
- URL: `/work/sheknowmics` (old `/portfolio` redirects here, noindex)

---

## Pages & SEO Titles

| Page | Title |
|------|-------|
| Homepage | Kinetic — Automated Growth Engine for Small Businesses \| Kolkata |
| Services | Growth Offers — Websites, CRM & Automation for Small Businesses \| Kinetic |
| About | About Kinetic — Built by Ayush Gupta, Growth Engineer \| Kolkata |
| Free Audit | Free Website Audit — Get Your Growth Diagnosis in 24 Hours \| Kinetic |

---

## Things Claude Should Never Do on This Project

- Add prices to the homepage SolutionSection cards
- Refer to Kinetic as having a "team" or multiple employees
- Invent new service names outside the 5 listed offers
- Use `git push` unless explicitly asked
- Use `npx tsc` (times out — use `node_modules/.bin/tsc` instead)
- Write bash heredocs for multi-line code patches (use Python file I/O)
- Create a shared Nav/Footer component — the inline pattern is intentional
- Add `next/image` for `/ayush.jpg` — use a plain `<img>` tag with the eslint disable comment
