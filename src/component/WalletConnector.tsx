"use client";

import React, { useState } from "react";
import { useFuelContext } from "@/hooks";
import toast from "react-hot-toast";
import { IoCheckmarkDone } from "react-icons/io5";
import { MdOutlineContentCopy } from "react-icons/md";

export const FUEL_RPC_URL_TESTNET = "https://testnet.fuel.network/v1/graphql";

export const WalletConnector: React.FunctionComponent = (): JSX.Element => {
  const { contextLoading, fuelWalletInfo, connectWallet, disconnectWallet } = useFuelContext();
  const [addressCopied, setAddressCopied] = useState<boolean>(false);

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 24)} ... ${address.slice(-20)}`;
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Wallet address copied to clipboard");
        setAddressCopied(true);

        setTimeout(() => {
          setAddressCopied(false);
        }, 2500);
      })
      .catch((err) => console.error("Error in copyToClipboard(): ", err));
  };

  if (fuelWalletInfo.walletAddress) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
            border: "1px solid var(--foreground)",
            padding: "1rem",
            borderRadius: "1rem",
            background: "rgba(255, 255, 255, 0.0325)",
            gap: "1rem",
            width: "40rem",
          }}
        >
          <span>Wallet Address</span>
          <hr style={{ borderColor: "var(--foreground)", width: "100%" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              width: "100%",
            }}
          >
            <span style={{ letterSpacing: "0.05em", fontWeight: "500" }}>
              {formatAddress(fuelWalletInfo.walletAddress)}
            </span>
            <button disabled={contextLoading} onClick={() => copyToClipboard(fuelWalletInfo.walletAddress)}>
              {addressCopied ? <IoCheckmarkDone size={20} /> : <MdOutlineContentCopy size={20} />}
            </button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
            border: "1px solid var(--foreground)",
            padding: "1rem",
            borderRadius: "1rem",
            background: "rgba(255, 255, 255, 0.0325)",
            gap: "1rem",
            width: "40rem",
          }}
        >
          <span>Connected Network</span>
          <hr style={{ borderColor: "var(--foreground)", width: "100%" }} />
          <span style={{ letterSpacing: "0.05em", fontWeight: "500" }}>
            {fuelWalletInfo.networkURL === FUEL_RPC_URL_TESTNET ? "Fuel Testnet" : "Unsupported Network"}
          </span>
        </div>
        <button
          disabled={contextLoading || fuelWalletInfo.isConnecting || fuelWalletInfo.isDisconnecting}
          style={{
            background: "#ffffff",
            color: "var(--background)",
            fontSize: "0.9375rem",
            fontWeight: 700,
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            width: "12rem",
          }}
          onClick={disconnectWallet}
        >
          <span>{fuelWalletInfo.isConnecting ? "Disconnecting..." : "Disconnect Wallet"}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      disabled={contextLoading || fuelWalletInfo.isConnecting || fuelWalletInfo.isDisconnecting}
      onClick={connectWallet}
      style={{
        background: "#ffffff",
        color: "var(--background)",
        fontSize: "0.9375rem",
        fontWeight: 700,
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        width: "11rem",
      }}
    >
      <span>{fuelWalletInfo.isConnecting ? "Connecting..." : "Connect Wallet"}</span>
    </button>
  );
};
