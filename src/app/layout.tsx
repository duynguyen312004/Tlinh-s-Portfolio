import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Playfair_Display } from 'next/font/google';
import './globals.css';
import { HouseProvider } from '@/context/HouseContext';
import { StarProvider } from '@/context/StarContext';

const displayFont = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tlinh's World",
  description:
    'Portfolio of Nguyen Thao Linh - Third-year International Economics student at Foreign Trade University, aspiring Business Analyst with expertise in market research and business development.',
  keywords: ['Portfolio', 'Business Analyst', 'International Economics', 'Foreign Trade University', 'Nguyen Thao Linh'],
  authors: [{ name: 'Nguyen Thao Linh' }],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🦦%3C/text%3E%3C/svg%3E",
  },
  openGraph: {
    title: "Tlinh's World",
    description: 'Aspiring Business Analyst | FTU Student | Harry Potter Theme',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body suppressHydrationWarning>
        <HouseProvider>
          <StarProvider>
            {children}
          </StarProvider>
        </HouseProvider>
      </body>
    </html>
  );
}
