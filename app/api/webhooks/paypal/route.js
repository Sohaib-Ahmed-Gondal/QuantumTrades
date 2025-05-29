import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.text();
  const headers = Object.fromEntries(req.headers.entries());
  
  // Verify webhook signature (pseudo-code)
  const isValid = verifyWebhook(body, headers);
  if (!isValid) return new Response('Invalid signature', { status: 403 });

  const event = JSON.parse(body);
  
  // Handle events
  switch (event.event_type) {
    case 'PAYMENT.CAPTURE.COMPLETED':
      await updateOrderStatus(event.resource.id, 'paid');
      break;
    case 'PAYMENT.CAPTURE.REFUNDED':
      await refundOrder(event.resource.id);
      break;
  }

  return new Response('Webhook processed', { status: 200 });
}