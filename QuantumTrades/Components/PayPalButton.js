"use client";
import { useEffect, useState } from 'react';

export default function PayPalButton() {
  const [loading, setLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load PayPal JS SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to create order');
      const { id } = await res.json();
      return id;
    } finally {
      setLoading(false);
    }
  };

  const onApprove = async (data) => {
    try {
      const res = await fetch('/api/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderID: data.orderID })
      });
      if (!res.ok) throw new Error('Payment failed');
      alert('Payment successful!');
      // Add any post-payment logic here
    } catch (error) {
      alert(error.message);
    }
  };

  const loadPayPalButton = () => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder,
        onApprove,
        onError: (err) => {
          console.error('PayPal error:', err);
          alert('Payment error occurred');
        }
      }).render('#paypal-button-container');
    }
  };

  return (
    <div>
      <div id="paypal-button-container" className="min-h-[50px]">
        {!paypalLoaded && (
          <button 
            disabled={true}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded cursor-not-allowed"
          >
            Loading PayPal...
          </button>
        )}
      </div>
      <button 
        onClick={loadPayPalButton}
        disabled={!paypalLoaded || loading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-600"
        style={{ display: paypalLoaded ? 'none' : 'inline-block' }}
      >
        {loading ? 'Processing...' : 'Checkout with PayPal'}
      </button>
    </div>
  );
}