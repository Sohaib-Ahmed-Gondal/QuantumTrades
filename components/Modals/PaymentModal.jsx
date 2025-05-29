'use client';
import PayPalButton from '@/components/PayPal/PayPalButton';

export default function PaymentModal({ amount, onClose }) {
  const handleSuccess = (order) => {
    console.log('Payment completed:', order);
    onClose(); // Close modal after payment
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4">Pay ${amount}</h2>
        <PayPalButton amount={amount} onApprove={handleSuccess} />
        <button 
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}