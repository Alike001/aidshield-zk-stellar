import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "AidShield | Privacy-preserving aid claims on Stellar",
  description:
    "AidShield proves aid eligibility with zero-knowledge and settles claims on Stellar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <div className="app-shell">
          <SiteNav />
          <div className="app-shell-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
