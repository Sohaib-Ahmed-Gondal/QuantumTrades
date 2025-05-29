#!/bin/bash

# Fix PayPal Integration Script

echo "Installing dependencies..."
npm install @paypal/checkout-server-sdk @paypal/react-paypal-js
npm install --save-dev @types/node @types/react @types/react-dom @types/paypal__checkout-server-sdk

echo "Creating tsconfig.json..."
cat > tsconfig.json << 'END_JSON'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  "exclude": ["node_modules"]
}
END_JSON

echo "Creating PayPal components..."
mkdir -p components/PayPal

cat > components/PayPal/PayPalButton.jsx << 'END_COMPONENT'
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
END_COMPONENT

cat > components/PayPal/PayPalProvider.jsx << 'END_PROVIDER'
"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export function PayPalProvider({ children }) {
  return (
    <PayPalScriptProvider 
      options={{ 
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD"
      }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
END_PROVIDER

echo "Creating PayPal client config..."
mkdir -p lib
cat > lib/paypal.mjs << 'END_CLIENT'
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
END_CLIENT

echo "Cleaning and rebuilding..."
rm -rf .next
npm run build

if [ ! -f .env.local ]; then
  echo "Creating .env.local template..."
  cat > .env.local << 'END_ENV'
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_CLIENT_ID=your_api_client_id
PAYPAL_SECRET=your_api_secret
END_ENV
  echo "Please edit .env.local with your actual PayPal credentials"
fi

echo "Setup completed successfully!"
echo "Run: npm run dev"
