import type { Metadata } from "next";
import Link from "next/link";
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
  title: "AidShield",
  description:
    "Privacy-preserving aid distribution using zero-knowledge proofs on Stellar blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav className="border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold"
            >
              AidShield
            </Link>

            <div className="flex gap-6">
              <Link href="/">Home</Link>
              <Link href="/verify">Verify</Link>
              <Link href="/claim">Claim</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
