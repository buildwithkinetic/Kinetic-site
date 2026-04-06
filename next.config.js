/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [],
  async redirects() {
    return [
      // ── Old /growth-offers structure → actual existing pages ────────────────
      // /growth-offers itself doesn't exist — send to /services (the 5 offers page)
      {
        source: '/growth-offers',
        destination: '/services',
        permanent: true,
      },
      // /growth-offers sub-pages → correct service pages
      {
        source: '/growth-offers/visibility-fix',
        destination: '/services/seo',
        permanent: true,
      },
      {
        source: '/growth-offers/lead-capture',
        destination: '/services/lead-generation',
        permanent: true,
      },
      {
        source: '/growth-offers/repeat-revenue',
        destination: '/services/automation',
        permanent: true,
      },
      {
        source: '/growth-offers/full-growth-system',
        destination: '/services/website-development',
        permanent: true,
      },
      {
        source: '/growth-offers/quick-win-audit',
        destination: '/free-website-audit',
        permanent: true,
      },
      {
        source: '/growth-offers/custom-build',
        destination: '/services',
        permanent: true,
      },
      // ── /work-with-us sub-routes that don't exist as pages ───────────────────
      {
        source: '/work-with-us/quick-win-audit',
        destination: '/free-website-audit',
        permanent: true,
      },
      {
        source: '/work-with-us/quick-win-audit/:path*',
        destination: '/free-website-audit',
        permanent: true,
      },
      {
        source: '/work-with-us/custom-build',
        destination: '/book-call',
        permanent: true,
      },
      {
        source: '/work-with-us/custom-build/:path*',
        destination: '/book-call',
        permanent: true,
      },
      // ── /book → /book-call ───────────────────────────────────────────────────
      {
        source: '/book',
        destination: '/book-call',
        permanent: true,
      },
      // ── Legacy paths ─────────────────────────────────────────────────────────
      {
        source: '/portfolio',
        destination: '/work/sheknowmics',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/services',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
