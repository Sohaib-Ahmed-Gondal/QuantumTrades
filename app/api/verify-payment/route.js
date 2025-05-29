// app/api/verify-payment/route.js
import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
// [Same content as above route.js]
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

// Duplicate environment and client declarations removed

export async function POST(request) {
  const { orderID } = await request.json();
  
  try {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    return NextResponse.json(response.result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

