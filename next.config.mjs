import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';

/** @type {import('next').NextConfig} */
const nextConfig = withPlugins(
  [[withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })]],
  {
    reactStrictMode: true,
    trailingSlash: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, must-revalidate',
            },
          ],
        },
      ];
    },
    images: {
      imageSizes: [256, 384],
      deviceSizes: [320, 500, 750, 1080, 1200],
      minimumCacheTTL: 31_556_926,
      formats: ['image/webp'],
      domains: ['raw.githubusercontent.com'],
    },
  },
);

export default nextConfig;
