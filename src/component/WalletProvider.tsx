"use client";

import React from "react";
import { FuelProvider } from "@fuels/react";
import { defaultConnectors } from "@fuels/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FuelWalletProvider } from "@/context";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const WalletProvider: React.FunctionComponent<Readonly<Props>> = ({ children }) => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <FuelProvider
          theme="dark"
          fuelConfig={{
            connectors: defaultConnectors({
              devMode: true,
              wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
            }),
          }}
        >
          <FuelWalletProvider>{children}</FuelWalletProvider>
        </FuelProvider>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={true} />
    </React.Fragment>
  );
};
