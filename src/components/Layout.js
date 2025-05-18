import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Layout({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage/system preference
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(saved ? JSON.parse(saved) : systemDark);
  }, []);

  // Apply theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  return (
    <>
      <Head>
        <meta name="theme-color" content={isDark ? '#111827' : '#ffffff'} />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="container mx-auto px-4 py-4 flex justify-end">
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200/80 dark:bg-gray-700/80 rounded-lg shadow hover:bg-gray-300/80 dark:hover:bg-gray-600/80 backdrop-blur-sm transition-all"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <>
                <SunIcon className="w-5 h-5" />
                <span>Light</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                <span>Dark</span>
              </>
            )}
          </button>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </>
  );
}

// Simple SVG icons (or import from react-icons)
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121z" />
  </svg>
);