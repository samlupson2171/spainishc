import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spanish Conveyancing | Costa del Sol Lawyer Referrals for Estate Agents",
  description: "Partner with vetted Spanish conveyancing lawyers on the Costa del Sol. Earn 20-25% commission on referrals. 36,806 properties sold in Malaga province in 2025.",
  keywords: "Costa del Sol conveyancing lawyers for agents, Spanish property lawyers, estate agent referrals, Marbella conveyancing",
  openGraph: {
    title: "Spanish Conveyancing | Costa del Sol Lawyer Referrals for Estate Agents",
    description: "Partner with vetted Spanish conveyancing lawyers on the Costa del Sol. Earn 20-25% commission on referrals. 36,806 properties sold in Malaga province in 2025.",
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
    title: "Spanish Conveyancing | Costa del Sol Lawyer Referrals for Estate Agents",
    description: "Partner with vetted Spanish conveyancing lawyers on the Costa del Sol. Earn 20-25% commission on referrals.",
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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
