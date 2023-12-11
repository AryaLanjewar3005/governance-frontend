// components/Header.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Uploadcontent from '../pages/uploadcontent';

const provider = new Provider(Network.DEVNET);


const Header = () => {
  const { account } = useWallet();
  console.log("Hello world", account)
  const [accountHasArtistWork, setAccountHasArtistWork] = useState(false);
  const [profileResource, setProfileResource] = useState(null);

  const getAccountDetails = async () => {
    const moduleAddress = "0x9ff48a3b1987d3b239a9ad01951aaceb1163a0f65048b2ea3976a76d5e73be5d";

    try {
      const ArtistWorkResource = await provider.getAccountResource(
        account.address,
        `${moduleAddress}::OnChainRadio::Artist_work`
      );
      console.log(ArtistWorkResource.data.Collections.data[0]);
      setAccountHasArtistWork(true);
    } catch (e) {
      setAccountHasArtistWork(false);
    }
  }



  useEffect(() => {
    getAccountDetails();
  }, [account?.address]);


  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#1db954',
    color: '#fff',
  };

  const navStyle = {
    display: 'flex',
    gap: '10px', // Adjust the gap as needed
  };

  const buttonStyle = {
    backgroundColor: '#1db954',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <header style={headerStyle}>
      <h1>OnChainRadio Governance Protocol</h1>

      <WalletSelector />

    </header>
  );
};

export default Header;
