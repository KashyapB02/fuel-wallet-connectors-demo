import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fuel Wallet Connectors Demo",
  description:
    "This is a demo application that demonstrates how to use the Fuel Wallet Connectors library to interact with the Fuel Wallet API and the Fuel Wallet Connectors API in Next.js 14 applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
