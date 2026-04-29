const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kinetic",
  description:
    "A digital systems studio that builds websites, web apps, AI agents, CRM automation, and SEO systems for startups and businesses globally.",
  url: "https://buildwithkinetic.org",
  email: "hello@buildwithkinetic.org",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Ayush Gupta",
    jobTitle: "Founder & Growth Engineer",
    sameAs: "https://linkedin.com/in/21-ayushgupta",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "Website Development",
    "Web Application Development",
    "AI Agents",
    "SEO",
    "CRM Automation",
    "Marketing Automation",
    "Lead Generation",
    "SaaS Development",
    "Next.js",
    "Supabase",
    "n8n",
  ],
  sameAs: ["https://linkedin.com/in/21-ayushgupta"],
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kinetic — Digital Growth Systems",
  url: "https://buildwithkinetic.org",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kinetic Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Website & Landing Page Development",
        description:
          "Conversion-focused websites and landing pages in Next.js — live in 1–2 weeks.",
        url: "https://buildwithkinetic.org/services/website-development",
      },
      {
        "@type": "Offer",
        name: "Full Stack Web App Development",
        description:
          "End-to-end web applications with backend, database, and auth — production-grade and handed over running.",
        url: "https://buildwithkinetic.org/services/full-stack",
      },
      {
        "@type": "Offer",
        name: "AI-Driven Digital Marketing",
        description:
          "SEO, content, email, and paid ads — orchestrated with AI to compound over time.",
        url: "https://buildwithkinetic.org/services/seo",
      },
      {
        "@type": "Offer",
        name: "AI Agents & Automation",
        description:
          "Custom AI agents and n8n automation workflows that run business operations automatically.",
        url: "https://buildwithkinetic.org/services/ai-agents",
      },
      {
        "@type": "Offer",
        name: "Android App Development",
        description:
          "Native Android apps connected to your existing web infrastructure.",
        url: "https://buildwithkinetic.org/services",
      },
    ],
  },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Kinetic different from a regular web agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most agencies deliver a website and disappear. Kinetic builds the full system — website, app, automations, AI agents, and marketing — and hands it over running. You get measurable outcomes, not just a design.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to go live?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Websites and chatbots are typically live in 1–2 weeks. AI agents and marketing systems in 2–3 weeks. Full stack apps and custom software are scoped per project — typically 4–8 weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What if I already have a website?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We audit your existing setup first. If it can be rebuilt on top of, we do that. If it's beyond repair, we replace it. Either way you end up with a system that generates leads, not just a redesign.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a guarantee?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Every service comes with a specific performance guarantee. Websites come with a 30-day Google ranking guarantee. AI agents come with a 60–90 day failure guarantee — if the system fails its core function, we rebuild it free.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with international clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the entire process is remote. Strategy call, build, and handover all happen online. Kinetic works with funded startups and founders across the US, UK, and India.",
      },
    },
  ],
};

export default function SchemaMarkup() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
