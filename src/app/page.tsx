"use client";

import { NextPage } from "next";
import { WalletConnector } from "@/component";

const FuelWalletConnectorsDemo: NextPage = () => {
  return (
    <main className="w-full max-w-screen-2xl min-h-screen flex flex-col items-center justify-center px-2">
      <h1 className="text-4xl font-bold tracking-wide mb-8">Fuel Wallet Connector Demo</h1>
      <WalletConnector />
    </main>
  );
};

export default FuelWalletConnectorsDemo;
