/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: './dist',
  reactStrictMode: true,
  eslint: {
    dirs: ['features', 'components'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  compress: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
