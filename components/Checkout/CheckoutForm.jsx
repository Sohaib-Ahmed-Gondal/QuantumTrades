'use client';
import PayPalButton from '@/components/PayPal/PayPalButton';

export default function PaymentPage() {
  const handleApprove = (order) => {
    console.log('Payment completed:', order);
    // Add your post-payment logic here (e.g., redirect)
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete Payment</h1>
      <PayPalButton amount={99.99} onApprove={handleApprove} />
    </main>
  );
}