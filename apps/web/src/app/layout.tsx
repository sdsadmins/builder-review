import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuilderReview 🏗️ — Real Builders. Real Reviews. Real Transparency.",
  description:
    "India's most trusted platform for real estate builder reviews. Verified reviews, RERA compliance, and rewards for homebuyers.",
  keywords: ["builder review", "real estate", "RERA", "homebuyer", "India"],
  openGraph: {
    title: "BuilderReview — Real Estate Transparency",
    description: "50,000+ verified reviews from real homebuyers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#0A0A0F", color: "#F8F8FF" }}
      >
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#12121A",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#F8F8FF",
            },
          }}
        />
      </body>
    </html>
  );
}
