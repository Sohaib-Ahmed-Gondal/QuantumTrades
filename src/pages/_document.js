import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Add other head tags here (meta, fonts, etc.) */}
      </Head>
      <body>
        {/* 👇 Prevents dark mode flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const stored = localStorage.getItem('darkMode');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (stored === 'true' || (!stored && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );

  <script 
  src="https://www.paypal.com/sdk/js?client-id=AcnoPTFqgaaQ_7mfd7T2lMGOlBCs1XdN5QYhTxQvht7If60fCEvopI1JpEcFKcroymncP32714qu_zGt" 
  data-namespace="paypal" 
/>
}