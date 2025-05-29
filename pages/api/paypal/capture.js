import paypal from '@paypal/checkout-server-sdk';
import { client } from '@lib/paypal.mjs';  // Using path alias

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderID } = req.body;
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    const response = await client.execute(request);
    
    res.status(200).json({
      status: 'COMPLETED',
      details: response.result
    });
  } catch (error) {
    console.error('Capture error:', error);
    res.status(500).json({ 
      error: error.message,
      debug_id: error.response?.headers['paypal-debug-id'] 
    });
  }
}