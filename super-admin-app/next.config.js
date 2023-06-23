/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  transpilePackages: ['@fridayfood/shared', '@fridayfood/ui-toolkit'],
  reactStrictMode: false,
  images: {
    domains: ['coreapp.preview.fridaypos.com', 'core.uat.fridaypos.com'],
  },
};

module.exports = nextConfig;
