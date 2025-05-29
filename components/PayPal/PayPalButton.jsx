"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";

export function PayPalButton({ amount, onApprove }) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: amount } }],
        });
      }}
      onApprove={onApprove}
    />
  );
}
