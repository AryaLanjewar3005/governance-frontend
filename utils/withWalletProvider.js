// withWalletProvider.js
import React from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const wallets = [new PetraWallet()];

const withWalletProvider = (WrappedComponent) => {
  const WithWalletProvider = (props) => {
    return (
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <WrappedComponent {...props} />
      </AptosWalletAdapterProvider>
    );
  };

  return WithWalletProvider;
};

export default withWalletProvider;
