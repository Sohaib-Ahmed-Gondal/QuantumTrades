// components/PayPalButton.js
import { useState } from 'react'

export default function PayPalButton() {
  const [loading, setLoading] = useState(false)

  const createOrder = async () => {
    setLoading(true)
    const res = await fetch('/api/paypal/create-order', {
      method: 'POST'
    })
    const { id } = await res.json()
    return id
  }

  const onApprove = async (data) => {
    const res = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderID: data.orderID })
    })
    alert('Payment successful!')
  }

  return (
    <button 
      onClick={() => window.paypal.Buttons({
        createOrder,
        onApprove
      }).render('#paypal-button-container')}
      disabled={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      {loading ? 'Processing...' : 'Checkout with PayPal'}
    </button>
  )
}