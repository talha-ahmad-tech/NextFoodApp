/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL_PRODUCTS: 'https://product.preview.fridaypos.com',
    NEXT_PUBLIC_API_URL_SETUP: 'https://setup.preview.fridaypos.com',
    NEXT_PUBLIC_API_URL_CORE: 'https://coreapp.preview.fridaypos.com',
    NEXT_PUBLIC_API_URL: 'http://hq.preview.techverxcloud.com',
    NEXT_PUBLIC_API_URL_FILTERS: 'https://preference.preview.fridaypos.com',
    NEXT_PUBLIC_API_URL_PRODUCT: 'https://product.preview.fridaypos.com',
    NEXT_PUBLIC_API_URL_ORDER: 'https://order.preview.fridaypos.com',
  },
  transpilePackages: ['@fridayfood/shared', '@fridayfood/ui-toolkit'],
  reactStrictMode: false,
  // productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
