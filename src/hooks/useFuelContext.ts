import { useContext } from "react";
import { FuelWalletContext } from "@/context";

export const useFuelContext = () => {
  const context = useContext(FuelWalletContext);

  if (context === undefined) {
    throw new Error("useFuelContext must be used within a FuelWalletProvider.");
  }

  return context;
};
