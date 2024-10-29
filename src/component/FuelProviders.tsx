"use client";

import { DEFAULT_WAGMI_CONFIG } from "@/configs";
import { createConfig, defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { CHAIN_IDS, Provider } from "fuels";
import { useState } from "react";

const NETWORKS = [
  {
    chainId: CHAIN_IDS.fuel.testnet,
    url: "https://testnet.fuel.network/v1/graphql",
  },
];

const FUEL_CONFIG = createConfig(() => {
  return {
    connectors: defaultConnectors({
      devMode: true,
      wcProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
      ethWagmiConfig: DEFAULT_WAGMI_CONFIG,
      chainId: NETWORKS[0].chainId,
      fuelProvider: Provider.create(NETWORKS[0].url),
    }),
  };
});

export const FuelProviders = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <>
      <button type="submit" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Switch theme {theme}
      </button>
      <FuelProvider theme={theme} fuelConfig={FUEL_CONFIG} networks={NETWORKS}>
        {children}
      </FuelProvider>
    </>
  );
};
