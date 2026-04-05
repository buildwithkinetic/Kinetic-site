import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/book/", "/booking-confirmed/", "/dashboard/"],
      },
    ],
    sitemap: "https://buildwithkinetic.org/sitemap.xml",
    host: "https://buildwithkinetic.org",
  }
}
