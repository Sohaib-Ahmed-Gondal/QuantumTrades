import paypal from '@paypal/checkout-server-sdk';// [Same content as above route.js]
import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
// Change from
import PayPalButton from '@/components/PayPal/PayPalButton';

// To
import { PayPalButton } from '@/components/PayPal/PayPalButton';

// Configure environment
const baseUrl = process.env.SANDBOX_MODE 
  ? 'https://api-m.sandbox.paypal.com' 
  : 'https://api-m.paypal.com';

const environment = process.env.SANDBOX_MODE
  ? new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_SECRET
    )
  : new paypal.core.LiveEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_SECRET
    );

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  // Your existing order creation logic
}


export const getPaypalClient = () => {
  const baseUrl = process.env.SANDBOX_MODE
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const environment = process.env.SANDBOX_MODE
    ? new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      )
    : new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      );

  return {
    client: new paypal.core.PayPalHttpClient(environment),
    baseUrl
  };
};