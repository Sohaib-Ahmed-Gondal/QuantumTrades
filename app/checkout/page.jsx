'use client';
import { useState } from 'react';
import { PayPalButton } from '@/components/PayPal/PayPalButton';
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

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = async (order) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: order.id })
      });

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      window.location.href = `/checkout/success?orderId=${order.id}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <PayPalButton 
        amount={99.99}
        onApprove={handleApprove}
        disabled={isProcessing}
      />
      {isProcessing && (
        <div className="mt-4 text-center">Processing payment...</div>
      )}
    </main>
  );
}