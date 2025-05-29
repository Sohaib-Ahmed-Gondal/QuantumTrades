const paypal = require('@paypal/checkout-server-sdk');

const configureEnvironment = () => {
  return process.env.NODE_ENV === 'production'
    ? new paypal.core.LiveEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      )
    : new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_SECRET
      );
};

export const client = new paypal.core.PayPalHttpClient(configureEnvironment());

export async function verifyPayment(orderId) {
  const request = new paypal.orders.OrdersGetRequest(orderId);
  const response = await client.execute(request);
  return response.result;
}
