/**
 * Programmatic SEO Architecture
 *
 * This module provides the data structure and utilities for generating
 * scalable, programmatic SEO pages.
 *
 * Future route examples this supports:
 * - /website-design-for-[industry]
 *   e.g., /website-design-for-restaurants, /website-design-for-lawyers
 *
 * - /website-development-[city]
 *   e.g., /website-development-london, /website-development-manchester
 *
 * Usage:
 * 1. Add industry or city data to the arrays below
 * 2. Create app/(marketing)/website-design-for-[industry]/page.tsx
 * 3. Import `getIndustryPageData` to generate page content dynamically
 * 4. Each page gets a unique title, description, h1, and canonical URL
 */

export interface ProgrammaticIndustry {
  slug: string
  name: string
  pluralName: string
  painPoints: string[]
  keyBenefits: string[]
  primaryKeyword: string
  secondaryKeywords: string[]
}

export interface ProgrammaticCity {
  slug: string
  name: string
  country: string
  region: string
  population: string
  primaryKeyword: string
  nearbyAreas: string[]
}

// ── Industries for /website-design-for-[industry] ───────────────────────────

export const programmaticIndustries: ProgrammaticIndustry[] = [
  {
    slug: "restaurants",
    name: "Restaurant",
    pluralName: "Restaurants",
    primaryKeyword: "restaurant website design",
    secondaryKeywords: ["restaurant website development", "food business website", "online ordering website"],
    painPoints: [
      "Low online reservations despite good foot traffic",
      "No online ordering system losing to delivery apps",
      "Google My Business not optimized",
      "Mobile website looks terrible",
    ],
    keyBenefits: [
      "Online reservation system integration",
      "Digital menu with photos",
      "Google ordering integration",
      "Local SEO optimization",
    ],
  },
  {
    slug: "lawyers",
    name: "Law Firm",
    pluralName: "Law Firms",
    primaryKeyword: "law firm website design",
    secondaryKeywords: ["lawyer website development", "legal website design", "attorney website"],
    painPoints: [
      "Not ranking for practice area keywords",
      "Website doesn't establish authority or trust",
      "No lead capture for potential clients",
      "Competitor firms appearing above you in Google",
    ],
    keyBenefits: [
      "Authority-building design",
      "Practice area SEO pages",
      "Lead qualification forms",
      "Case result showcases",
    ],
  },
  {
    slug: "dentists",
    name: "Dental Practice",
    pluralName: "Dental Practices",
    primaryKeyword: "dental website design",
    secondaryKeywords: ["dentist website development", "dental practice website", "dental marketing website"],
    painPoints: [
      "Empty appointment slots on slow days",
      "Not appearing for 'dentist near me' searches",
      "Website doesn't build trust with nervous patients",
      "No online booking or consultation requests",
    ],
    keyBenefits: [
      "Online appointment booking",
      "Local SEO dominance",
      "Patient trust-building content",
      "Treatment showcase pages",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    pluralName: "Real Estate Agencies",
    primaryKeyword: "real estate website design",
    secondaryKeywords: ["realtor website", "property website development", "estate agent website"],
    painPoints: [
      "Zillow and Realtor.com capturing all organic leads",
      "Property listings not indexed by Google",
      "No lead capture from organic traffic",
      "Website doesn't differentiate from other agents",
    ],
    keyBenefits: [
      "MLS/property listing integration",
      "Neighborhood SEO pages",
      "Lead capture and CRM connection",
      "Agent authority profiles",
    ],
  },
  {
    slug: "photographers",
    name: "Photography Business",
    pluralName: "Photography Businesses",
    primaryKeyword: "photography website design",
    secondaryKeywords: ["photographer website development", "photography portfolio website", "wedding photographer website"],
    painPoints: [
      "Portfolio site doesn't generate inquiry leads",
      "Not ranking for local photography searches",
      "Slow image loading killing conversion",
      "No clear pricing or booking process",
    ],
    keyBenefits: [
      "High-performance image galleries",
      "Local SEO optimization",
      "Inquiry and booking forms",
      "Package showcase pages",
    ],
  },
]

// ── Cities for /website-development-[city] ───────────────────────────────────

export const programmaticCities: ProgrammaticCity[] = [
  {
    slug: "london",
    name: "London",
    country: "UK",
    region: "Greater London",
    population: "9M+",
    primaryKeyword: "website development London",
    nearbyAreas: ["Westminster", "Canary Wharf", "Shoreditch", "Chelsea"],
  },
  {
    slug: "manchester",
    name: "Manchester",
    country: "UK",
    region: "Greater Manchester",
    population: "560K",
    primaryKeyword: "website development Manchester",
    nearbyAreas: ["Salford", "Trafford", "Stockport", "Oldham"],
  },
  {
    slug: "new-york",
    name: "New York",
    country: "US",
    region: "New York State",
    population: "8.3M",
    primaryKeyword: "website development New York",
    nearbyAreas: ["Manhattan", "Brooklyn", "Queens", "Bronx"],
  },
  {
    slug: "mumbai",
    name: "Mumbai",
    country: "India",
    region: "Maharashtra",
    population: "20M+",
    primaryKeyword: "website development Mumbai",
    nearbyAreas: ["Bandra", "Andheri", "Powai", "Thane"],
  },
  {
    slug: "bangalore",
    name: "Bangalore",
    country: "India",
    region: "Karnataka",
    population: "13M+",
    primaryKeyword: "website development Bangalore",
    nearbyAreas: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield"],
  },
]

// ── Utility Functions ─────────────────────────────────────────────────────────

export function getIndustryMetadata(industry: ProgrammaticIndustry) {
  return {
    title: `${industry.name} Website Design | Conversion-Focused ${industry.name} Websites`,
    description: `Kinetic builds conversion-focused websites for ${industry.pluralName.toLowerCase()} that generate leads and grow revenue. ${industry.keyBenefits[0]}, ${industry.keyBenefits[1]}, and more.`,
    canonical: `https://buildwithkinetic.org/website-design-for-${industry.slug}`,
  }
}

export function getCityMetadata(city: ProgrammaticCity) {
  return {
    title: `Website Development ${city.name} | Conversion-Focused Websites in ${city.name}`,
    description: `Kinetic builds high-performance, conversion-focused websites for businesses in ${city.name}. Expert website development, SEO, and digital growth systems.`,
    canonical: `https://buildwithkinetic.org/website-development-${city.slug}`,
  }
}

export function getAllProgrammaticSlugs() {
  return {
    industries: programmaticIndustries.map((i) => i.slug),
    cities: programmaticCities.map((c) => c.slug),
  }
}
