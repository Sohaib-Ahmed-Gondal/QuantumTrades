'use client';
import { useState } from 'react';
import PayPalButton from '@/components/PayPal/PayPalButton';

export default function CheckoutSection({ cartTotal }) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  
  const handleSuccess = (order) => {
    console.log('Payment completed:', order);
    // Add your post-payment logic here
  };

  return (
    <section className="checkout-section">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>

        {paymentMethod === 'paypal' && (
          <div className="paypal-container mt-4">
            <PayPalButton
              amount={cartTotal}
              onApprove={handleSuccess}
              onError={(err) => console.error('Payment error:', err)}
            />
          </div>
        )}
      </div>
    </section>
  );
}