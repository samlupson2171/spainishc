import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://spanishconveyancing.es"),
  title: "Spanish Conveyancing | Bespoke Property Lawyers in Spain",
  description: "Trusted, multilingual Spanish property lawyers providing bespoke conveyancing support from legal checks to final registration.",
  keywords: "Spanish property lawyers, conveyancing Spain, Costa del Sol property lawyer, buying property in Spain, Marbella conveyancing",
  openGraph: {
    title: "Spanish Conveyancing | Bespoke Property Lawyers in Spain",
    description: "Your property. Our expertise. Total peace of mind. Bespoke legal support for buying property in Spain.",
    images: [
      {
        url: "/images/ogimage.jpg",
        width: 1200,
        height: 630,
        alt: "Spanish Conveyancing",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spanish Conveyancing | Bespoke Property Lawyers in Spain",
    description: "Your property. Our expertise. Total peace of mind. Bespoke legal support for buying property in Spain.",
    images: ["/images/ogimage.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MK1PSHH548"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MK1PSHH548');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
