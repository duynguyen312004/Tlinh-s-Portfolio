import type { Metadata } from 'next';
import { Cinzel, Raleway } from 'next/font/google';
import './globals.css';
import { HouseProvider } from '@/context/HouseContext';
import { StarProvider } from '@/context/StarContext';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Thảo Linh's Magical Portfolio | Business Analyst",
  description:
    'Portfolio of Nguyễn Thảo Linh – Third-year International Economics student at Foreign Trade University, aspiring Business Analyst with expertise in market research and business development.',
  keywords: ['Portfolio', 'Business Analyst', 'International Economics', 'Foreign Trade University', 'Nguyễn Thảo Linh'],
  authors: [{ name: 'Nguyễn Thảo Linh' }],
  openGraph: {
    title: "Thảo Linh's Magical Portfolio",
    description: 'Aspiring Business Analyst | FTU Student | Harry Potter Theme',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${raleway.variable}`}>
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
