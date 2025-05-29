'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function SubscribeButton({ planId }) {
  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          plan_id: planId
        });
      }}
      onApprove={(data) => {
        // Handle subscription activation
        console.log('Subscription ID:', data.subscriptionID);
      }}
    />
  );
}