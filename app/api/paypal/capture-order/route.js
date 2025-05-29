import { NextResponse } from 'next/server';
import paypal from '@paypal/checkout-server-sdk';
// Change from
import PayPalButton from '@/components/PayPal/PayPalButton';

// To
import { PayPalButton } from '@/components/PayPal/PayPalButton';

function getClient() {
  // [Same client initialization as above]
}

export async function POST(request) {
  const { orderID } = await request.json();
  try {
    const client = getClient();
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    return NextResponse.json({ status: 'COMPLETED' });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
