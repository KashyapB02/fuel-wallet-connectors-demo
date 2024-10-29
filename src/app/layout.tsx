import { Providers } from "@/component";
import { DEFAULT_WAGMI_CONFIG } from "@/configs";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { Inter } from "next/font/google";
import "./globals.css";

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
  const { get } = headers();
  const wagmiInitialState = cookieToInitialState(DEFAULT_WAGMI_CONFIG, get("cookie"));

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers initialState={wagmiInitialState}>{children}</Providers>
      </body>
    </html>
  );
}
