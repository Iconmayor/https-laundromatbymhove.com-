import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { cpus: 2 },
  async redirects() {
    return [['laundry-dry-cleaning','laundry'],['residential-cleaning','home-cleaning'],['commercial-cleaning','office-cleaning'],['pest-control','fumigation']].map(([old,slug]) => ({
      source: '/services/' + old, destination: '/services/' + slug, permanent: true
    }));
  },
  async headers() {
    return [
      {source: '/:path*', headers: [{key:'X-Content-Type-Options',value:'nosniff'}, {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}, ...(process.env.INDEX_WEBSITE === 'true' ? [] : [{key:'X-Robots-Tag',value:'noindex, nofollow'}])]},
      {source: '/models/:path*', headers: [{key:'Cache-Control',value:'public, max-age=86400, stale-while-revalidate=604800'}]}
    ];
  }
};
const configForPhase = phase => ({...nextConfig, distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next'});

export default configForPhase;
