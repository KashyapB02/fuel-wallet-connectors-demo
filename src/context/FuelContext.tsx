"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useConnectUI, useDisconnect, useIsConnected, useWallet } from "@fuels/react";
import { Account } from "fuels";

interface FuelContextProviderProps {
  children: React.ReactNode;
}

interface FuelWalletInfo {
  isConnecting: boolean;
  isDisconnecting: boolean;
  isConnected: boolean | null;
  walletAddress: string;
  networkURL: string;
}

interface FuelContextValues {
  contextLoading: boolean;
  setContextLoading: React.Dispatch<React.SetStateAction<boolean>>;
  wallet: Account | null | undefined;
  fuelWalletInfo: FuelWalletInfo;
  connectWallet: () => void;
  disconnectWallet: () => Promise<void>;
}

export const FuelWalletContext = createContext<FuelContextValues | undefined>(undefined);

export const FuelWalletProvider: React.FunctionComponent<Readonly<FuelContextProviderProps>> = ({
  children,
}): JSX.Element => {
  const { connect, isConnecting, error, isError } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { disconnectAsync } = useDisconnect();
  const { wallet } = useWallet();

  const [contextLoading, setContextLoading] = useState<boolean>(true);
  const [isDisconnecting, setIsDisconnecting] = useState<boolean>(false);

  const disconnectWallet = useCallback(async () => {
    setIsDisconnecting(true);

    try {
      const response = await disconnectAsync();
      if (response) toast.success("Successfully disconnected from Fuelet Wallet.");
    } catch (error) {
      console.error("Error disconnecting from Fuelet Wallet: ", { error });
      toast.error("Error disconnecting from selected Wallet.");
    } finally {
      setIsDisconnecting(false);
    }
  }, [disconnectAsync]);

  useEffect(() => {
    if (isConnected === null) setContextLoading(true);
    else setContextLoading(false);
  }, [isConnected]);

  useEffect(() => {
    if (isError) {
      console.error("Error connecting to Fuelet Wallet: ", { error });
      toast.error(error?.message ?? "Error connecting to selected Wallet.");
    }
  }, [error, isError]);

  const providerValues = useMemo<Readonly<FuelContextValues>>(
    () =>
      ({
        contextLoading,
        setContextLoading,
        wallet,
        fuelWalletInfo: {
          isConnecting,
          isDisconnecting,
          isConnected,
          walletAddress: wallet ? wallet.address.toB256() : "",
          networkURL: wallet ? wallet.provider.url : "",
        },
        connectWallet: connect,
        disconnectWallet,
      } as const),
    [connect, contextLoading, disconnectWallet, isConnected, isConnecting, isDisconnecting, wallet]
  );

  return <FuelWalletContext.Provider value={providerValues}>{children}</FuelWalletContext.Provider>;
};
