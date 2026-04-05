import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/(auth)/"],
      },
    ],
    sitemap: "https://buildwithkinetic.org/sitemap.xml",
    host: "https://buildwithkinetic.org",
  }
}
