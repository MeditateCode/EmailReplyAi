import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Email Reply AI • AI Email Reply Generator",
  description:
    "Quickly generate smart, professional email replies with our Email Reply AI. Use our AI email reply generator to save time crafting responses.",
  openGraph: {
    title: "Email Reply AI • Smart Email Reply Generator",
    description:
      "Streamline your communication with our AI-powered email reply assistant—generate professional responses instantly.",
    url: "https://yourdomain.com",
    siteName: "Email Reply AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Reply AI • AI Email Reply Generator",
    description:
      "Use our AI email reply generator to craft fast, smart, and professional responses effortlessly.",
  },
  keywords: [
    "AI email reply generator",
    "email reply AI",
    "AI email response generator",
    "generate email replies",
    "smart email reply tool",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
