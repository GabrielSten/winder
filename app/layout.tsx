
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Winder",
  description: "Application to check the wind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-bg dark:bg-dark-bg font-mono">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
