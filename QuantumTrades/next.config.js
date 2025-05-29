/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  // Essential for ESM modules (.mjs files)
  experimental: {
    esmExternals: true,
  },

  // Expose environment variables
  env: {
    PAYPAL_CLIENT_ID: process.env.AcnoPTFqgaaQ_7mfd7T2lMGOlBCs1XdN5QYhTxQvht7If60fCEvopI1JpEcFKcroymncP32714qu_zGt,
    PAYPAL_SECRET: process.env.EFXLiSBXDBt7IXGDjYPbZMnP16RZiC0-IUB7-oEx4hlsJ9hVmIfcRLi_NISlNS6r9szBHbxAhl7f1_LT,
    // Add other vars as needed:
    NEXT_PUBLIC_BINANCE_API_KEY: process.env.sqYrLgYpGzwxji75Uyg2DXcIqtYkmAEdsRVZUgF1ulI0tJu34bVI4yYLZDaaIcs7
  }
};

module.exports = nextConfig;