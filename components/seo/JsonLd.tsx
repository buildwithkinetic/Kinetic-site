interface JsonLdProps {
  schema: Record<string, unknown>
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Schema Builders ──────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://buildwithkinetic.org/#organization",
    name: "Kinetic",
    url: "https://buildwithkinetic.org",
    logo: {
      "@type": "ImageObject",
      url: "https://buildwithkinetic.org/favicon.svg",
      width: 512,
      height: 512,
    },
    description:
      "Kinetic builds websites, full stack apps, custom software, AI-driven marketing systems, AI agents, and AI chatbots — production-grade and handed over running.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      "@id": "https://buildwithkinetic.org/#ayush",
      name: "Ayush Gupta",
      url: "https://buildwithkinetic.org/about",
      sameAs: ["https://www.linkedin.com/in/21-ayushgupta"],
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    sameAs: ["https://www.linkedin.com/in/21-ayushgupta"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "hello@buildwithkinetic.org",
      url: "https://buildwithkinetic.org/contact",
    },
  }
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://buildwithkinetic.org/#business",
    name: "Kinetic",
    alternateName: "Kinetic Growth Systems",
    url: "https://buildwithkinetic.org",
    logo: "https://buildwithkinetic.org/favicon.svg",
    image: "https://buildwithkinetic.org/og-image.png",
    description:
      "Kinetic builds websites, full stack apps, custom software, AI-driven marketing systems, AI agents, and AI chatbots — production-grade and handed over running.",
    founder: {
      "@type": "Person",
      name: "Ayush Gupta",
      url: "https://buildwithkinetic.org/about",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    serviceType: [
      "Website Development",
      "Full Stack App Development",
      "Custom Software Development",
      "AI-Driven Marketing",
      "AI Agents",
      "AI Chatbots",
    ],
    priceRange: "\u20b9\u20b9",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank Transfer, UPI",
    openingHours: "Mo-Fr 09:00-18:00",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://buildwithkinetic.org/contact",
      email: "hello@buildwithkinetic.org",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: ["https://www.linkedin.com/in/21-ayushgupta"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Growth Offers",
      itemListElement: [
        {
          "@type": "Offer",
          name: "The Visibility Fix",
          description: "SEO + Google Business Profile optimisation. First-page Google ranking in 30 days or I keep working free.",
          price: "25000",
          priceCurrency: "INR",
          url: "https://buildwithkinetic.org/services",
        },
        {
          "@type": "Offer",
          name: "The Lead Capture System",
          description: "Landing page, CRM, and automated follow-up — live in 2\u20133 weeks. No missed leads in 90 days or I fix it free.",
          price: "40000",
          priceCurrency: "INR",
          url: "https://buildwithkinetic.org/services",
        },
        {
          "@type": "Offer",
          name: "The Repeat Revenue Engine",
          description: "Google review automation + retention flow. Review count grows in 60 days or I rebuild it free.",
          price: "30000",
          priceCurrency: "INR",
          url: "https://buildwithkinetic.org/services",
        },
        {
          "@type": "Offer",
          name: "The Full Growth System",
          description: "All five layers: visibility, lead capture, CRM, automation, and retention. 90-day performance guarantee.",
          price: "75000",
          priceCurrency: "INR",
          url: "https://buildwithkinetic.org/services",
        },
        {
          "@type": "Offer",
          name: "The Quick Win Audit",
          description: "A 1-week audit of your website, SEO, and lead flow — with a prioritised action plan. Full refund if not valuable.",
          price: "8000",
          priceCurrency: "INR",
          url: "https://buildwithkinetic.org/services",
        },
      ],
    },
  }
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://buildwithkinetic.org/#ayush",
    name: "Ayush Gupta",
    url: "https://buildwithkinetic.org/about",
    jobTitle: "Founder & Growth Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Kinetic",
      url: "https://buildwithkinetic.org",
    },
    sameAs: [
      "https://www.linkedin.com/in/21-ayushgupta",
      "https://buildwithkinetic.org",
    ],
    description:
      "Ayush Gupta is the founder of Kinetic — building websites, apps, AI systems, and marketing automation for founders and funded companies globally.",
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://buildwithkinetic.org/#website",
    name: "Kinetic",
    url: "https://buildwithkinetic.org",
    description:
      "Websites, apps, custom software, AI marketing, AI agents, and chatbots — built to production standard and handed over running.",
    publisher: {
      "@id": "https://buildwithkinetic.org/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://buildwithkinetic.org/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  price,
}: {
  name: string
  description: string
  url: string
  serviceType: string
  price?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://buildwithkinetic.org/#business",
      name: "Kinetic",
      url: "https://buildwithkinetic.org",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    ...(price && {
      offers: {
        "@type": "Offer",
        price,
        priceCurrency: "INR",
      },
    }),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function articleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  authorName: string
  imageUrl?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      "@id": "https://buildwithkinetic.org/#ayush",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://buildwithkinetic.org/#organization",
      name: "Kinetic",
      url: "https://buildwithkinetic.org",
      logo: {
        "@type": "ImageObject",
        url: "https://buildwithkinetic.org/favicon.svg",
      },
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  }
}
