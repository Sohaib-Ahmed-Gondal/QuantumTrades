import { config } from 'dotenv';
config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    NEXT_PUBLIC_BINANCE_API_KEY: process.env.NEXT_PUBLIC_BINANCE_API_KEY,
  }
};

export default nextConfig;
