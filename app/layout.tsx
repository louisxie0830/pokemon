import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { preconnect, prefetchDNS } from 'react-dom';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokemon',
  description: 'Pokemon dex',
  authors: [{ name: 'Nil Xie' }],
  creator: 'Nil Xie',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  prefetchDNS('https://raw.githubusercontent.com');
  preconnect('https://raw.githubusercontent.com', { crossOrigin: 'anonymous' });
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
