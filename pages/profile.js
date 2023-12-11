


// components/Header.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import withWalletProvider from "../utils/withWalletProvider";
const provider = new Provider(Network.DEVNET);


const Profile = () => {
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
      console.log(ArtistWorkResource, "profile");
      setAccountHasArtistWork(true);
      setProfileResource(ArtistWorkResource);
    } catch (e) {
      setAccountHasArtistWork(false);
    }
  }



  useEffect(() => {
    getAccountDetails();
  }, [account?.address]);

  return (
    <div>
      <h1>
      {profileResource ? JSON.stringify(profileResource) : "No profile data"}
      </h1>
    </div>
  )

};

export default withWalletProvider(Profile);
