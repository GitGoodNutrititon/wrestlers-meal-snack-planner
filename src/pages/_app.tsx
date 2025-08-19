import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { initializeAuth } from '@/lib/auth';
import { initializeIframe } from '@/lib/iframe';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize authentication check
    initializeAuth();
    
    // Initialize iframe communication
    initializeIframe();
  }, []);

  return <Component {...pageProps} />;
}
