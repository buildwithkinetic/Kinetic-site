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
    name: "Kinetic",
    url: "https://buildwithkinetic.org",
    logo: "https://buildwithkinetic.org/favicon.svg",
    description:
      "Kinetic builds conversion-focused websites, web apps, CRM dashboards, and automation systems for startups, gyms, and service businesses.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "hello@kinetic.systems",
    },
  }
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kinetic",
    url: "https://buildwithkinetic.org",
    description: "Conversion-focused website development and digital growth systems.",
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
}: {
  name: string
  description: string
  url: string
  serviceType: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType,
    provider: {
      "@type": "Organization",
      name: "Kinetic",
      url: "https://buildwithkinetic.org",
    },
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
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

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
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
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
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
