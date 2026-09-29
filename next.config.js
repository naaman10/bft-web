/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimised for Vercel: use default serverless output
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/subjects/maths", destination: "/tutoring/maths", permanent: true },
      { source: "/subjects/english", destination: "/tutoring/english", permanent: true },
      { source: "/subjects/11-plus-preparation", destination: "/tutoring/11-plus", permanent: true },
      { source: "/services/home-education", destination: "/services/home-ed", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
