/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  transpilePackages: ['@fridayfood/shared', '@fridayfood/ui-toolkit'],
  reactStrictMode: false,
  images: {
    domains: [
      ,
      'product.preview.fridaypos.com',
      'product.uat.fridaypos.com',
      'coreapp.preview.fridaypos.com',
      'core.uat.fridaypos.com',
    ],
  },
};

module.exports = nextConfig;
