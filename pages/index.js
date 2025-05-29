// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/paypal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(await response.text() || 'Payment failed to initiate');
      }

      const data = await response.json();
      const approvalLink = data.links.find(link => link.rel === 'approve');
      
      if (!approvalLink) {
        throw new Error('No PayPal approval link found in response');
      }
      
      window.location.href = approvalLink.href;
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to QuantumTrades</h1>
      
      <button 
        onClick={handlePayment}
        className="paypal-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <span className="paypal-logo">Pay</span> with PayPal
          </>
        )}
      </button>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <style jsx>{`
        .container {
          text-align: center;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .paypal-button {
          position: relative;
          background: #FFC439;
          color: #111;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          min-width: 200px;
          height: 48px;
        }
        
        .paypal-button:hover:not(:disabled) {
          background: #F0B72B;
        }
        
        .paypal-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .paypal-logo {
          color: #003087;
        }
        
        .spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          border-top-color: #003087;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-message {
          color: #d32f2f;
          margin-top: 1rem;
          padding: 0.5rem;
          background: #ffebee;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}