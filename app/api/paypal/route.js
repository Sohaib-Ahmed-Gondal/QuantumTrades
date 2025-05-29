import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';

// PayPal client configuration
function createPayPalClient() {
  const environment = process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      );
  return new paypal.core.PayPalHttpClient(environment);
}

// API route handler
export async function POST(request) {
  try {
    const client = createPayPalClient();
    const { amount } = await request.json();
    
    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString() // Ensure string value
        }
      }]
    });

    const response = await client.execute(orderRequest);
    
    return NextResponse.json({
      id: response.result.id,
      status: response.result.status
    });
    
  } catch (error) {
    console.error('PayPal API error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed', details: error.message },
      { status: 500 }
    );
  }
}
