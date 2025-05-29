import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';

const client = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID, 
    process.env.PAYPAL_SECRET
  )
);

export async function POST(req) {
  const { orderId } = await req.json();
  
  try {
    const request = new paypal.orders.OrdersGetRequest(orderId);
    const response = await client.execute(request);
    
    return NextResponse.json({
      status: response.result.status,
      details: response.result
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 400 }
    );
  }
}