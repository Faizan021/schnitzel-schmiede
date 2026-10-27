import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { CartProvider } from '@/components/providers/CartContext';
import { LanguageProvider } from '@/components/providers/LanguageContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { CartSlideOver } from '@/components/cart/CartSlideOver';
import { FloatingWhatsAppFAB } from '@/components/ui/FloatingWhatsAppFAB';
import { getRestaurantJsonLd } from '@/lib/seo/schema-org';

export const viewport: Viewport = {
  themeColor: '#faf7f2',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Schnitzel Schmiede Mönchengladbach | Echtes Handwerk, Knusprig & Golden',
  description:
    'Handpanierte Schnitzel nach Wiener Art, Kalbsschnitzel, zarte Geflügelschnitzel, hausgemachte Saucen und knusprige Beilagen in Mönchengladbach. 1-Klick WhatsApp Bestellung & Tischreservierung.',
  keywords: [
    'Schnitzel Mönchengladbach',
    'Schnitzel Schmiede MG',
    'Schnitzel bestellen Mönchengladbach',
    'Dohler Straße Mönchengladbach',
    'Tisch reservieren Mönchengladbach',
    'Catering Mönchengladbach',
    'Beste Schnitzel Gladbach',
  ],
  authors: [
    { name: 'Schnitzel Schmiede Mönchengladbach' },
    { name: 'Speisely Gastro-Engine', url: 'https://speisely.de' },
  ],
  creator: 'Speisely (https://speisely.de)',
  publisher: 'Speisely Gastronomie-Netzwerk Deutschland',
  metadataBase: new URL('https://schnitzel-schmiede-mg.de'),
  openGraph: {
    title: 'Schnitzel Schmiede Mönchengladbach | Echtes Handwerk',
    description:
      'Goldbraun soufflierte Schnitzel, frisches Butterschmalz, regionale Spezialitäten und Knusper-Garantie in Mönchengladbach.',
    url: 'https://schnitzel-schmiede-mg.de',
    siteName: 'Schnitzel Schmiede Mönchengladbach',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/images/stitch/schnitzel-hero-stitch.jpg',
        width: 1200,
        height: 630,
        alt: 'Goldbraunes Schnitzel Wiener Art in Butterschmalz souffliert',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getRestaurantJsonLd();

  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col min-w-0 max-w-full overflow-x-hidden bg-[#faf7f2] text-[#16202a] selection:bg-[#ffedd5] selection:text-[#9a3412]">
        <SmoothScrollProvider>
          <LanguageProvider>
            <CartProvider>
              <Header />
              <main className="flex-1 min-w-0 max-w-full overflow-x-hidden pb-mobile-safe md:pb-0">{children}</main>
              <Footer />
              <CartSlideOver />
              <FloatingWhatsAppFAB />
              <MobileBottomNav />
            </CartProvider>
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
