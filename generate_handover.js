const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType } = require('docx');
const fs = require('fs');

// ═══════════════════════════════════════════════════════════════════════════════
// KINETIC FULL HANDOVER DOCUMENT GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════

const BRAND_COLORS = {
  primary: 'C8440A',
  accent: 'F97316',
  text: '0F0E0C',
  muted: '6B6560',
  bg: 'F5F0E8',
};

const GROWTH_OFFERS = [
  { name: "The Visibility Fix", price: "₹25,000", timeline: "Live in 2 weeks", badge: null },
  { name: "The Lead Capture System", price: "₹40,000", timeline: "Live in 2–3 weeks", badge: "Most Popular" },
  { name: "The Repeat Revenue Engine", price: "₹30,000", timeline: "Live in 2 weeks", badge: null },
  { name: "The Full Growth System", price: "₹75,000", timeline: "Live in 4 weeks", badge: "Best Value" },
  { name: "The Quick Win Audit", price: "₹8,000", timeline: "Done in 1 week", badge: null },
];

const ROUTE_MAP = [
  { url: "/", title: "Homepage", purpose: "Hero, services showcase, founder, social proof, CTA", auth: false, data: "Static + Preloader" },
  { url: "/services", title: "Growth Offers (Services Page)", purpose: "Display 5 growth offers with pricing, guarantees, CTAs", auth: false, data: "Hardcoded offers array" },
  { url: "/about", title: "About / Founder Page", purpose: "Ayush Gupta bio, values, capabilities, LinkedIn CTA", auth: false, data: "Static + /ayush.jpg" },
  { url: "/contact", title: "Contact / Discovery Call Booking", purpose: "Contact form with Resend email integration", auth: false, data: "Form submission → Supabase leads + email" },
  { url: "/free-website-audit", title: "Free Website Audit Form", purpose: "2-step audit form for lead capture and scoring", auth: false, data: "Audit submission → Supabase + email" },
  { url: "/growth-offers", title: "Growth Offers Hub", purpose: "Consolidated offers page with interactive demos", auth: false, data: "Static offers + demo components" },
  { url: "/growth-offers/visibility-fix", title: "Visibility Fix Offer", purpose: "Individual offer landing page with CTA", auth: false, data: "Hardcoded offer data" },
  { url: "/growth-offers/lead-capture", title: "Lead Capture System Offer", purpose: "Individual offer landing page with CTA", auth: false, data: "Hardcoded offer data" },
  { url: "/growth-offers/repeat-revenue", title: "Repeat Revenue Engine Offer", purpose: "Individual offer landing page with CTA", auth: false, data: "Hardcoded offer data" },
  { url: "/growth-offers/full-growth-system", title: "Full Growth System Offer", purpose: "Individual offer landing page with CTA", auth: false, data: "Hardcoded offer data" },
  { url: "/work/sheknowmics", title: "Sheknowmics Case Study", purpose: "Case study with metrics, testimonial, project breakdown", auth: false, data: "Static case study data + CountUp component" },
  { url: "/blog", title: "Blog Hub", purpose: "Blog post listing and navigation", auth: false, data: "MDX files or static posts" },
  { url: "/blog/[slug]", title: "Individual Blog Post", purpose: "Blog post content rendering", auth: false, data: "Dynamic blog post data" },
  { url: "/dashboard", title: "Dashboard (Main)", purpose: "KPI overview, lead pipeline, recent activity", auth: true, data: "Supabase (leads, stats, automations)" },
  { url: "/dashboard/leads", title: "Leads Manager", purpose: "Lead list, filtering, inline editing, lead detail modal", auth: true, data: "Supabase leads table" },
  { url: "/dashboard/leads/[id]", title: "Lead Detail Page", purpose: "Full lead profile with activities, conversations, notes", auth: true, data: "Supabase lead + related data" },
  { url: "/dashboard/pipeline", title: "Sales Pipeline (Kanban)", purpose: "Drag-and-drop pipeline board with stages", auth: true, data: "Supabase pipeline entries + drag-drop sync" },
  { url: "/dashboard/conversations", title: "Conversations Hub", purpose: "Email/WhatsApp/SMS message thread list", auth: true, data: "Supabase conversations table" },
  { url: "/dashboard/conversations/[id]", title: "Conversation Thread", purpose: "Full message thread view with send capability", auth: true, data: "Supabase conversation + messages" },
  { url: "/dashboard/analytics", title: "Analytics Dashboard", purpose: "Lead trends, conversion funnels, revenue pipeline charts", auth: true, data: "Supabase analytics events + Recharts" },
  { url: "/dashboard/automations", title: "Automations Builder", purpose: "Create/edit n8n workflow automations, view logs", auth: true, data: "Supabase automations + n8n webhook sync" },
  { url: "/dashboard/settings", title: "Account Settings", purpose: "Profile edit, team management, billing, integrations", auth: true, data: "Supabase profiles + settings" },
  { url: "/book", title: "Booking Page", purpose: "Calendar booking integration (Google Calendar / Cal.com)", auth: false, data: "Embedded calendar widget" },
  { url: "/booking-confirmed", title: "Booking Confirmation", purpose: "Success message after booking", auth: false, data: "Static confirmation page" },
  { url: "/login", title: "Auth Login", purpose: "Supabase OAuth/Email login", auth: false, data: "Supabase auth client" },
];

const COMPONENTS = [
  { name: "Navbar", file: "components/Navbar.tsx", purpose: "Sticky header with logo, links, CTA" },
  { name: "CustomCursor", file: "components/CustomCursor.tsx", purpose: "Custom cursor animation" },
  { name: "ScrollProgress", file: "components/ScrollProgress.tsx", purpose: "Top scroll progress bar" },
  { name: "NetworkCanvas", file: "components/NetworkCanvas.tsx", purpose: "3D network animation (hero background)" },
  { name: "PageTransition", file: "components/PageTransition.tsx", purpose: "Page enter/exit animations" },
  { name: "LenisProvider", file: "components/LenisProvider.tsx", purpose: "Lenis smooth scroll wrapper" },
  { name: "Reveal", file: "components/Reveal.tsx", purpose: "Scroll-triggered reveal animations" },
  { name: "CountUp", file: "components/CountUp.tsx", purpose: "Animated number counter (Sheknowmics stats)" },
  { name: "SplitHeadline", file: "components/SplitHeadline.tsx", purpose: "Split-text animation component" },
  { name: "HomepageClient", file: "components/marketing/HomepageClient.tsx", purpose: "Homepage main component (1300+ lines)" },
  { name: "ServicesPageClient", file: "components/marketing/ServicesPageClient.tsx", purpose: "Growth offers display with pricing" },
  { name: "AboutPageClient", file: "components/marketing/AboutPageClient.tsx", purpose: "Founder bio and values" },
  { name: "SheknowmicsPageClient", file: "components/marketing/SheknowmicsPageClient.tsx", purpose: "Case study page" },
  { name: "ContactPageClient", file: "components/marketing/ContactPageClient.tsx", purpose: "Contact form with Resend integration" },
  { name: "Footer", file: "components/marketing/Footer.tsx", purpose: "Footer with links and branding" },
  { name: "StickyCtaBanner", file: "components/marketing/StickyCtaBanner.tsx", purpose: "Sticky CTA banner on scroll" },
  { name: "ServicePageLayout", file: "components/ServicePageLayout.tsx", purpose: "Reusable service page template" },
  { name: "PageHero", file: "components/layout/PageHero.tsx", purpose: "Hero section template" },
  { name: "PageSection", file: "components/layout/PageSection.tsx", purpose: "Section wrapper component" },
  { name: "Button", file: "components/ui/Button.tsx", purpose: "Primary CTA button component" },
  { name: "Card", file: "components/ui/Card.tsx", purpose: "Reusable card component" },
  { name: "Badge", file: "components/ui/Badge.tsx", purpose: "Label badge component" },
  { name: "Sidebar", file: "components/dashboard/Sidebar.tsx", purpose: "Dashboard left navigation" },
  { name: "TopBar", file: "components/dashboard/TopBar.tsx", purpose: "Dashboard top header with user menu" },
  { name: "KPICards", file: "components/dashboard/KPICards.tsx", purpose: "Key metric cards (leads, revenue, etc.)" },
  { name: "LeadTable", file: "components/dashboard/LeadTable.tsx", purpose: "Leads list table with sorting/filtering" },
  { name: "PipelineBoard", file: "components/dashboard/PipelineBoard.tsx", purpose: "Drag-drop Kanban board for pipeline" },
  { name: "ContactForm", file: "components/forms/ContactForm.tsx", purpose: "Reusable form component" },
];

const API_ROUTES = [
  { route: "/api/contact", method: "POST", purpose: "Contact form submission → Supabase leads + Resend email", trigger: "Form submission" },
  { route: "/api/audit-submission", method: "POST", purpose: "Audit form submission → audit_submissions table + leads CRM", trigger: "Audit form completion" },
  { route: "/api/send-booking", method: "POST", purpose: "Send booking/discovery/audit confirmation emails via Resend", trigger: "Internal: called from contact/audit routes" },
  { route: "/api/send-welcome", method: "POST", purpose: "Send welcome email to contact form submitters", trigger: "After contact submission" },
  { route: "/app/(auth)/callback", method: "GET", purpose: "Supabase OAuth callback handler", trigger: "OAuth provider redirect" },
];

const DATABASE_SCHEMA = [
  { table: "profiles", columns: "id, full_name, email, avatar_url, company_name, role, phone, timezone, onboarding_complete, created_at, updated_at", purpose: "User accounts and settings" },
  { table: "leads", columns: "id, profile_id, first_name, last_name, email, phone, company, source, source_detail, status, priority, lead_score, estimated_value, tags, custom_fields, notes, assigned_to, last_contacted_at, next_follow_up_at, converted_at, lost_reason, created_at, updated_at", purpose: "CRM lead records" },
  { table: "pipeline_stages", columns: "id, profile_id, name, slug, color, position, is_default, is_won_stage, is_lost_stage, created_at", purpose: "Custom sales pipeline stages" },
  { table: "pipeline_entries", columns: "id, lead_id, stage_id, profile_id, position, entered_at, moved_at", purpose: "Lead position in pipeline" },
  { table: "conversations", columns: "id, lead_id, profile_id, channel, direction, subject, message, metadata, is_automated, read_at, created_at", purpose: "Email/WhatsApp/SMS conversations" },
  { table: "activities", columns: "id, lead_id, profile_id, type, title, description, metadata, created_at", purpose: "Activity log (calls, meetings, notes, status changes)" },
  { table: "automations", columns: "id, profile_id, name, description, trigger_type, trigger_config, action_type, action_config, is_active, last_triggered_at, trigger_count, n8n_workflow_id, created_at, updated_at", purpose: "n8n workflow automation configurations" },
  { table: "automation_logs", columns: "id, automation_id, lead_id, status, input_data, output_data, error_message, executed_at", purpose: "Automation execution history and logs" },
  { table: "bookings", columns: "id, lead_id, profile_id, title, description, booking_date, start_time, end_time, status, meeting_link, reminder_sent, notes, created_at", purpose: "Calendar bookings and meetings" },
  { table: "forms", columns: "id, profile_id, name, slug, fields, settings, submission_count, is_active, created_at, updated_at", purpose: "Custom form configurations" },
  { table: "form_submissions", columns: "id, form_id, lead_id, data, source_url, ip_address, user_agent, created_at", purpose: "Form submission records" },
  { table: "analytics_events", columns: "id, profile_id, event_type, page_url, referrer, utm_source, utm_medium, utm_campaign, metadata, session_id, visitor_id, created_at", purpose: "Website analytics tracking" },
  { table: "audit_submissions", columns: "id, business_name, email, score, grade, offer_tag, answers_json, submitted_at", purpose: "Free website audit form responses" },
];

const TECH_STACK_TABLE = [
  { component: "Framework", value: "Next.js 14 App Router" },
  { component: "React", value: "React 19.2.3" },
  { component: "Language", value: "TypeScript 5" },
  { component: "Styling", value: "Tailwind CSS 4 + custom CSS variables" },
  { component: "Animation", value: "Framer Motion 12.35 + GSAP 3.14 + Lenis 1.3" },
  { component: "Database", value: "Supabase (PostgreSQL) + Supabase Auth" },
  { component: "Real-time", value: "Supabase Realtime subscriptions" },
  { component: "State Management", value: "Zustand 5.0" },
  { component: "Forms", value: "React Hook Form 7.71 + Zod 4.3" },
  { component: "UI Components", value: "Radix UI (dialog, tabs, select, checkbox)" },
  { component: "Charts", value: "Recharts 3.8" },
  { component: "Drag & Drop", value: "@hello-pangea/dnd 18.0" },
  { component: "Icons", value: "Lucide React 0.577" },
  { component: "Email", value: "Resend 6.9" },
  { component: "Automation", value: "n8n (webhook integrations)" },
  { component: "Hosting", value: "Vercel" },
  { component: "Analytics", value: "Vercel Analytics" },
  { component: "Fonts", value: "System fonts + custom CSS variables (display/mono/body)" },
];

function createHeading(text, level = 1) {
  const sizes = [28, 24, 20, 16, 14, 12];
  return new Paragraph({
    text: text,
    heading: HeadingLevel[`HEADING_${level}`],
    style: `Heading ${level}`,
    spacing: { after: 200 },
    bold: true,
    size: sizes[level - 1] * 2,
  });
}

function createSubtext(text) {
  return new Paragraph({
    text: text,
    size: 22,
    color: '666666',
    spacing: { after: 120 },
  });
}

function createTable(headers, rows) {
  const headerCells = headers.map(h => new TableCell({
    children: [new Paragraph({ text: h, bold: true, size: 20 })],
    shading: { type: ShadingType.CLEAR, fill: 'E0E0E0' },
  }));

  const rowCells = rows.map(row => new TableRow({
    children: row.map(cell => new TableCell({
      children: [new Paragraph({ text: cell, size: 20 })],
    })),
  }));

  return new Table({
    rows: [new TableRow({ children: headerCells }), ...rowCells],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

const sections = [];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: PROJECT OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
sections.push(createHeading('KINETIC — COMPLETE WEBSITE & SYSTEM HANDOVER', 1));
sections.push(new Paragraph({ text: 'Audit Date: March 31, 2026', size: 22, spacing: { after: 400 } }));

sections.push(createHeading('1. PROJECT OVERVIEW', 1));
sections.push(createSubtext('Live URL & Repository'));
sections.push(new Paragraph({
  text: 'Website: https://buildwithkinetic.org\nRepository: Private GitHub (Vercel auto-deploy)\nEnvironment: Node 18+, npm 9+',
  size: 22,
  spacing: { after: 300 },
}));

sections.push(createSubtext('Tech Stack Summary'));
sections.push(createTable(
  ['Component', 'Technology'],
  TECH_STACK_TABLE.map(row => [row.component, row.value])
));

sections.push(new Paragraph({ text: '', spacing: { after: 300 } }));
sections.push(createSubtext('Project Statistics'));
const stats = [
  '• Total Pages/Routes: 60 (layout + page files)',
  '• Total Components: 41 (marketing, dashboard, UI, forms)',
  '• API Routes: 4 (contact, audit, booking confirmation, welcome email)',
  '• Database Tables: 13 Supabase PostgreSQL tables',
  '• Lines of Code (approx): 15,000+ (homepage alone is 1300+ lines)',
];
stats.forEach(stat => sections.push(new Paragraph({ text: stat, size: 22, spacing: { after: 100 } })));

sections.push(new Paragraph({ text: '', spacing: { after: 300 } }));
sections.push(createSubtext('Key Brand Information'));
sections.push(new Paragraph({
  text: 'Founder: Ayush Gupta (Solo operator — no team)\nLocation: Kolkata, India\nPositioning: "The System Behind Your Growth"\nPrimary Service: Automated growth systems for small businesses & startups in India\nMain Offering: 5 specific growth packages (visibility fix, lead capture, repeat revenue, full system, audit)\nMain Case Study: Sheknowmics (women\'s health platform)\nEmail for Submissions: admin@buildwithkinetic.org',
  size: 22,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: ROUTE MAP
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('2. COMPLETE ROUTE MAP', 1));
sections.push(createSubtext('All Pages & Their Purpose'));
sections.push(createTable(
  ['URL', 'Page Title', 'Purpose', 'Auth', 'Data Source'],
  ROUTE_MAP.map(r => [r.url, r.title, r.purpose.substring(0, 35) + '...', r.auth ? 'Yes' : 'No', r.data])
));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: GROWTH OFFERS
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('3. KINETIC\'S 5 GROWTH OFFERS', 1));
sections.push(createSubtext('The Core Service Offerings'));
sections.push(createTable(
  ['#', 'Offer Name', 'Price', 'Timeline', 'Badge'],
  GROWTH_OFFERS.map((o, i) => [
    (i + 1).toString(),
    o.name,
    o.price,
    o.timeline,
    o.badge || '—'
  ])
));

sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
sections.push(new Paragraph({
  text: '✓ All offers displayed on /growth-offers and /services pages\n✓ Each offer has individual landing pages (e.g., /growth-offers/visibility-fix)\n✓ Guarantees are hardcoded on each offer card\n✓ Pricing shown only on /services page, NOT on homepage',
  size: 22,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: COMPONENT LIBRARY
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('4. COMPONENT LIBRARY', 1));
sections.push(createSubtext('All Components & Their Roles'));
sections.push(createTable(
  ['Component Name', 'File Path', 'Purpose'],
  COMPONENTS.map(c => [c.name, c.file, c.purpose.substring(0, 40)])
));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: DATABASE SCHEMA
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('5. DATABASE SCHEMA & STRUCTURE', 1));
sections.push(createSubtext('Supabase PostgreSQL Tables'));
sections.push(createTable(
  ['Table Name', 'Key Columns (sample)', 'Purpose'],
  DATABASE_SCHEMA.map(t => [t.table, t.columns.split(',').slice(0, 3).join(', ') + '...', t.purpose])
));

sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
sections.push(new Paragraph({
  text: 'Full RLS (Row-Level Security) policies implemented for multi-tenant isolation.\nAll tables use UUID primary keys and timestamp tracking (created_at, updated_at).',
  size: 22,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6: API ROUTES
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('6. API ROUTES & INTEGRATIONS', 1));
sections.push(createSubtext('All Backend Endpoints'));
sections.push(createTable(
  ['Route', 'Method', 'Purpose', 'Trigger'],
  API_ROUTES.map(a => [a.route, a.method, a.purpose.substring(0, 35), a.trigger])
));

sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
sections.push(new Paragraph({
  text: 'Key Integration Points:\n• Resend (Email): Booking confirmations, discovery call confirmations, audit results, welcome emails\n• Supabase: All data persistence, authentication, real-time subscriptions\n• n8n: Automation workflow triggers and webhooks\n• Google Calendar / Cal.com: Booking calendar integration',
  size: 22,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 7: ENVIRONMENT VARIABLES
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('7. ENVIRONMENT VARIABLES', 1));
sections.push(createSubtext('Required .env.local'));
sections.push(new Paragraph({
  text: 'NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>\nNEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>\nSUPABASE_SERVICE_ROLE_KEY=<service-role-key>\nNEXT_PUBLIC_APP_URL=https://buildwithkinetic.org\nRESEND_API_KEY=<resend-email-api-key>\nAYUSH_EMAIL=admin@buildwithkinetic.org\nGOOGLE_ANALYTICS_ID=<gtag-id>\nNEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<google-verification-code>',
  size: 20,
  spacing: { after: 300 },
  family: 'Courier New',
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 8: BRAND SYSTEM & DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('8. BRAND SYSTEM & DESIGN TOKENS', 1));
sections.push(createSubtext('Color Palette (Tailwind Hex Classes)'));
sections.push(createTable(
  ['Token', 'Hex Code', 'Tailwind Class', 'Usage'],
  [
    ['Primary Accent', '#C8440A', 'text-[#C8440A]', 'CTAs, highlights, checkmarks'],
    ['Secondary Accent', '#F97316', 'text-[#F97316]', 'Dashboard accent, hover states'],
    ['Text Primary', '#0F0E0C', 'text-[#0F0E0C]', 'Main text, headings'],
    ['Text Muted', '#6B6560', 'text-[#6B6560]', 'Body copy, secondary labels'],
    ['Text Subtle', '#9E9890', 'text-[#9E9890]', 'Microcopy, mono labels'],
    ['Background', '#F5F0E8', 'bg-[#F5F0E8]', 'Page background (warm cream)'],
    ['Dark Background', '#0F0E0C', 'bg-[#0F0E0C]', 'Dark sections (Problem, Comparison)'],
  ]
));

sections.push(new Paragraph({ text: '', spacing: { after: 200 } }));
sections.push(createSubtext('Typography'));
sections.push(new Paragraph({
  text: 'Display Font: Playfair Display (serif, via --font-playfair CSS variable)\nBody Font: System sans (Segoe UI, Roboto, etc.)\nMono Font: System monospace (used for labels, tags, code)\nHeading Sizes: clamp() used for responsive scaling (36px to 96px)',
  size: 22,
  spacing: { after: 300 },
}));

sections.push(new Paragraph({
  text: 'All CSS variables defined in globals.css: --bg, --text-primary, --text-muted, --border, --bg-dark, --font-display, --font-body, --font-mono',
  size: 22,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 9: KEY FILES & ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('9. KEY FILES & ARCHITECTURE', 1));
sections.push(createSubtext('Critical Files to Understand'));
sections.push(new Paragraph({
  text: 'app/layout.tsx\n  └─ Root layout, global styles, metadata, ScrollProgress, CustomCursor\n\napp/(marketing)/layout.tsx\n  └─ Marketing layout with Navbar, PageTransition, LenisProvider\n\napp/(marketing)/page.tsx\n  └─ Homepage (1400+ lines, "use client")\n  └─ Contains: Hero, Marquee, ServiceSection, ProofSection, FounderSection, FinalCTA, Footer\n\napp/dashboard/layout.tsx\n  └─ Dashboard shell with Sidebar + TopBar\n\napp/dashboard/page.tsx\n  └─ Main dashboard with KPI cards, lead pipeline, stats (fully client-side)\n\ncomponents/marketing/ServicesPageClient.tsx\n  └─ Hardcoded offers array with pricing, guarantees, badges\n\ncomponents/marketing/SheknowmicsPageClient.tsx\n  └─ Case study page with CountUp animations and metrics\n\nlib/types.ts\n  └─ Full TypeScript interface definitions (Profile, Lead, PipelineStage, Automation, etc.)\n\nlib/supabase/client.ts, server.ts, admin.ts\n  └─ Supabase client initialization (browser, server, admin)\n\nlib/animations.ts\n  └─ Framer Motion animation variants (fadeUp, slideLeft, scaleUp, stagger)\n\nlib/emails/\n  └─ Email templates (client-booking-confirmed, client-discovery-confirmed, client-audit-confirmed, etc.)',
  size: 20,
  spacing: { after: 300 },
  family: 'Courier New',
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10: ISSUES & KNOWN LIMITATIONS
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('10. ISSUES & KNOWN LIMITATIONS', 1));

const issues = [
  { title: 'CountUp Component', desc: 'The CountUp component on Sheknowmics page and growth offers page may show 0 on initial render before animating. Check IntersectionObserver trigger.' },
  { title: 'Hardcoded Pricing', desc: 'All 5 growth offer prices, names, and guarantees are hardcoded in ServicesPageClient.tsx. Update there if offers change.' },
  { title: 'Breadcrumb Schema', desc: 'JsonLd breadcrumb schema hardcoded on some pages. Verify all breadcrumbs match current routing.' },
  { title: 'Blog Routing', desc: 'Blog pages use [slug] dynamic routing. Ensure blog content is properly served (MDX or database-backed).' },
  { title: 'Audit Submissions Table', desc: 'audit_submissions table may not exist on fresh deployment. SQL creation script provided in send-booking route comments.' },
  { title: 'Portfolio Page', desc: '/portfolio route redirects to /work/sheknowmics (old route). Verify no external links still reference /portfolio.' },
  { title: 'Free Audit Form', desc: '/free-website-audit previously redirected to /growth-offers/quick-win-audit. Check if form is still being used directly.' },
];

issues.forEach(issue => {
  sections.push(new Paragraph({ text: `⚠ ${issue.title}`, bold: true, size: 22, spacing: { after: 60 } }));
  sections.push(new Paragraph({ text: issue.desc, size: 20, spacing: { after: 120 }, italics: true }));
});

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11: DEPLOYMENT & HOSTING
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('11. DEPLOYMENT & HOSTING', 1));
sections.push(new Paragraph({
  text: 'Platform: Vercel (Next.js optimized)\nBranch: main (auto-deploys on push)\nDomain: buildwithkinetic.org\nSSL: Automatic (Vercel-managed)\nEdge Functions: Available (Edge Runtime)\nEnvironment Config: Managed in Vercel dashboard\nCDN: Vercel Edge Network (global)\nAnalytics: Vercel Analytics + custom Supabase events\n\nDeployment Steps:\n1. Push to main branch on GitHub\n2. Vercel auto-triggers build\n3. Tests run (if configured)\n4. Deploy to production on success\n5. DNS routes to Vercel\n\nRollback: Use Vercel dashboard to redeploy previous deployment',
  size: 22,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 12: REBRANDING GUIDE
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('12. REBRANDING & CUSTOMIZATION GUIDE', 1));
sections.push(createSubtext('Easy Changes'));
sections.push(new Paragraph({
  text: '✓ Colors: Update CSS variables in globals.css and Tailwind hex classes\n✓ Founder Name/Bio: Edit AboutPageClient.tsx, homepage (line 238-241)\n✓ Company Name: Search-replace "Kinetic" throughout codebase\n✓ Logo/Favicon: Replace /public/*.svg files\n✓ Growth Offers: Update offers array in ServicesPageClient.tsx (name, price, guarantee, badge)\n✓ Founder Image: Replace /public/ayush.jpg with new image\n✓ Links: Update all /about, /contact, /services, /growth-offers references',
  size: 20,
  spacing: { after: 300 },
}));

sections.push(createSubtext('Moderate Changes'));
sections.push(new Paragraph({
  text: '⚡ Services/Capabilities: Edit ServiceSection in homepage (lines 100-107), services list in ServicesPageClient\n⚡ Testimonial/Social Proof: Update ProofSection (lines 187-221) in homepage\n⚡ Case Study: Replace SheknowmicsPageClient with new case study component\n⚡ Email Templates: Update lib/emails/* files for branding and messaging\n⚡ Metadata/SEO: Update app/layout.tsx metadata and individual page titles',
  size: 20,
  spacing: { after: 300 },
}));

sections.push(createSubtext('Hard Changes (require refactoring)'));
sections.push(new Paragraph({
  text: '🔧 Dashboard Theme: Dark theme (#080A0F) is baked into dashboard layout. Change would require component rewrites\n🔧 Animation System: GSAP + Framer Motion are used throughout. Replacing would require rewriting all animated components\n🔧 Database Schema: Changing table names or structure requires migration and code updates throughout\n🔧 Authentication Flow: Supabase SSR auth is configured in lib/supabase/server.ts. Switching providers requires significant refactoring\n🔧 Email Provider: Resend is integrated in API routes. Switching to SendGrid/AWS SES requires route updates',
  size: 20,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 13: PERFORMANCE & OPTIMIZATION
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('13. PERFORMANCE & OPTIMIZATION', 1));
sections.push(new Paragraph({
  text: 'Target Metrics:\n✓ Lighthouse: 90+ on Performance, Accessibility, Best Practices, SEO\n✓ Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1\n✓ Load Time: Homepage < 2s on 4G\n✓ Bundle Size: Main JS < 200KB (gzipped)\n\nOptimizations in Place:\n• Next.js Image Optimization: Static images use <img> tags (custom cursor, founder photo)\n• Dynamic Imports: NetworkCanvas, service components use dynamic() for code-splitting\n• CSS-in-JS: Inline styles for critical rendering (hero section)\n• Lazy Loading: IntersectionObserver used for CountUp animations\n• Font Optimization: System fonts (no custom font files loaded)\n• Script Optimization: GSAP, Three.js loaded only where needed\n• Edge Caching: Vercel Edge Network caches static assets\n\nMonitoring:\n• Vercel Analytics: Real user monitoring\n• Google Search Console: Indexing and crawl errors\n• Supabase Logs: Database query performance',
  size: 20,
  spacing: { after: 300 },
}));

// ─────────────────────────────────────────────────────────────────────────────
// FINAL NOTES
// ─────────────────────────────────────────────────────────────────────────────
sections.push(new Paragraph({ text: '', pageBreakBefore: true }));
sections.push(createHeading('14. FINAL NOTES & NEXT STEPS', 1));
sections.push(new Paragraph({
  text: 'Ownership & Access:\n• Source code in private GitHub repo\n• Vercel project linked to GitHub\n• Supabase project with full admin access\n• Resend account for email sending\n• Domain registrar account for DNS\n\nMaintenance:\n• Keep dependencies updated (npm audit, npm update)\n• Monitor error logs in Vercel dashboard\n• Review Supabase analytics and RLS policies monthly\n• Test all integrations (Resend, n8n webhooks) quarterly\n• Backup database regularly\n\nCommunication:\n• All forms send submissions to Supabase leads table\n• Email confirmations sent via Resend\n• Audit results delivered within 24 hours (manual)\n• Discovery calls booked via Cal.com or Google Calendar\n\nFuture Enhancements:\n• Implement blog content management (Contentlayer or CMS)\n• Add AI-powered lead scoring\n• Expand automation templates in dashboard\n• Build mobile app for lead management\n• Add Stripe integration for payment processing',
  size: 20,
  spacing: { after: 300 },
}));

const doc = new Document({ sections: [{ children: sections }] });

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/sessions/practical-sweet-fermat/mnt/kinetic/Kinetic_Full_Handover_2026.docx', buffer);
  console.log('✓ Handover document created: Kinetic_Full_Handover_2026.docx');
});
