import { PayPalProvider } from '@/components/PayPal/PayPalProvider';


export default function Layout({ children }) {
  return (
    <PayPalProvider>
      {children}
    </PayPalProvider>
  );
}