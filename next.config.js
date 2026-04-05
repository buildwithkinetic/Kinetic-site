/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: [],
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/growth-offers',
        permanent: true,
      },
      {
        source: '/free-website-audit',
        destination: '/growth-offers/quick-win-audit#quiz',
        permanent: false,
      },
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
        destination: '/growth-offers',
        permanent: false,
      },
      {
        source: '/growth-offers/custom-build',
        destination: '/growth-offers',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig