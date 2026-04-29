const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://buildwithkinetic.org/#business",
  name: "Kinetic",
  description:
    "Kinetic builds websites, full stack apps, custom software, AI-driven marketing systems, AI agents, and AI chatbots — production-grade and handed over running.",
  url: "https://buildwithkinetic.org",
  logo: "https://buildwithkinetic.org/favicon.svg",
  email: "hello@buildwithkinetic.org",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Ayush Gupta",
    jobTitle: "Founder & Growth Engineer",
    sameAs: "https://linkedin.com/in/21-ayushgupta",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  knowsAbout: [
    "Website Development",
    "Full Stack App Development",
    "AI Agents",
    "AI-Driven Marketing",
    "Marketing Automation",
    "Lead Generation",
    "n8n",
    "Next.js",
    "Supabase",
  ],
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://buildwithkinetic.org/#organization",
  name: "Kinetic",
  url: "https://buildwithkinetic.org",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kinetic Services",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Website & Landing Page Development",
        description:
          "Conversion-focused websites and landing pages built in Next.js — live in 1–2 weeks.",
        url: "https://buildwithkinetic.org/services",
      },
      {
        "@type": "Offer",
        name: "Full Stack Web App Development",
        description:
          "End-to-end web applications with backend, database, and auth — built to production standard.",
        url: "https://buildwithkinetic.org/services",
      },
      {
        "@type": "Offer",
        name: "AI-Driven Digital Marketing",
        description:
          "SEO, content, email, and paid ads — orchestrated with AI to compound over time.",
        url: "https://buildwithkinetic.org/services",
      },
      {
        "@type": "Offer",
        name: "AI Agents & Automation",
        description:
          "Custom AI agents and n8n automation workflows that run your business operations automatically.",
        url: "https://buildwithkinetic.org/services",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
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
