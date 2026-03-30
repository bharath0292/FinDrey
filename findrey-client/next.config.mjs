/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint warnings/errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during builds
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
