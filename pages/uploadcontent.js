import { useState, useEffect } from "react";
import axios from "axios";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Provider, Network } from "aptos";
import withWalletProvider from "../utils/withWalletProvider";
const provider = new Provider(Network.DEVNET);
import {
  Account,
  Aptos,
  AptosConfig,
  NetworkToNetworkName,
} from "@aptos-labs/ts-sdk";

const FileUpload = () => {
  const [seen, setSeen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [proposal_id, setproposal_id] = useState([]);
  const [proposal_title, setproposal_title] = useState([]);
  const [proposal_content, setproposal_content] = useState([]);
  const [proposal_proposer, setproposal_proposer] = useState([]);

  const moduleAddress =
    "0x35ce65f9f29128edba76107c5c53adc35bac4e6193451f1fed272c4326db00cc";
  let wallet;
  useEffect(async () => {
    let isPetraInstalled;
    if (typeof window !== "undefined") {
      // Browser context
      isPetraInstalled = window.aptos;
    } else if (typeof global !== "undefined") {
      // Node.js or server-side context
      isPetraInstalled = global.aptos;
    }
    const getAptosWallet = () => {
      if ("aptos" in window) {
        return window.aptos;
      } else {
        window.open("https://petra.app/", `_blank`);
      }
    };
    wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      console.log(response); // { address: string, address: string }

      const account = await wallet.account();
      console.log(account); // { address: string, address: string }
    } catch (error) {}
  }, []);

  const { account, signAndSubmitTransaction } = useWallet();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to your server to get all proposals
        const response = await axios.get(
          "http://localhost:8000/get-all-proposals"
        );
        setProposals(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []);

  // Styles
  const mainDiv = {
    width: "100vw",
    height: "100vh",
    background: "black",
    padding: "20px", // Add padding for better spacing
  };

  const buttonsDiv = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px", // Add margin at the bottom for better separation
  };

  const proposalCreation = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: "20px",
    width : '50%' // Add margin at the bottom for better separation
  };

  const inputStyle = {
    marginBottom: "10px", // Add margin at the bottom of each input
  };

  const [actualPID, setActualPID] = useState("");
  async function handleCreateProposal() {
    setSeen(!seen);
    try {
      const response = await axios.post("http://localhost:8000/save-proposal", {
        proposal_id: proposal_id,
        proposal_title: proposal_title,
        proposal_content: proposal_content,
        proposal_proposer: proposal_proposer,
      });
      setActualPID(response.data.orderId);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    const transaction = {
      arguments: [proposal_id, actualPID],
      function: `${moduleAddress}::Staking::stake`,
      type: "entry_function_payload",
      type_arguments: [],
    };
    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(
        transaction
      );
      console.log(pendingTransaction);

      // const txn = await client.waitForTransactionWithResult(pendingTransaction.hash);
    } catch (error) {
      // see "Errors"
    }
  }
  const [radioCoin, setRadioCoin] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const handleBuyRadCoin = async () => {
    const transaction = {
      arguments: [targetAddress, radioCoin * 100000],
      function: `${moduleAddress}::OnChainRadioCoin::buy`,
      type: "entry_function_payload",
      type_arguments: [],
    };
    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(
        transaction
      );
      console.log(pendingTransaction);

      // const txn = await client.waitForTransactionWithResult(pendingTransaction.hash);
    } catch (error) {
      // see "Errors"
    }
  };
  const buyRadioSection = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "20vh",
  };
  const buttonStyle = {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    border: "2px solid #8A2BE2" /* Purple color */,
    color: "#fff" /* Text color */,
    backgroundColor: "#8A2BE2" /* Purple color */,
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
    "&:hover": {
      backgroundColor: "#663399" /* Darker purple on hover */,
      borderColor: "#663399" /* Darker purple on hover */,
      color: "#fff" /* Text color on hover */,
    },
  };
  const buyRadioSectionFeild = {
    display : 'flex',
    justifyContent : 'space-between',
    width : '100vh'
  }
  const inputField = {
    width: '100%', // Take half the screen width
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxSizing: 'border-box',
  }
  const inputFieldContent = {
    width: '100%', // Take half the screen width
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  boxSizing: 'border-box',
  height: '20vh'
  }

  return (
    <div style={mainDiv}>
      <div style={buttonsDiv}>
        <div style={buyRadioSection}>
          <div style={buyRadioSectionFeild}>
            <label style={{ color: "white" }}>
              radio_coin
              <input
                style={inputField}
                type="text"
                value={radioCoin}
                onChange={(e) => setRadioCoin(e.target.value)}
              />
            </label>
            <label style={{ color: "white" }}>
              address
              <input
                type="text"
                style={inputField}
                value={targetAddress}
                onChange={(e) => setTargetAddress(e.target.value)}
              />
            </label>
          </div>
          <button style={buttonStyle} onClick={handleBuyRadCoin}>
            Buy RadCoins
          </button>
        </div>
      </div>
      <hr />
      <div style={proposalCreation}>
        <label style={{ color: "white" }}>
          stake:
          <input
          style={inputField}
            type="text"
            value={proposal_id}
            onChange={(e) => setproposal_id(e.target.value)}
          />
        </label>
        <label style={{ color: "white" }}>
          title:
          <input
          style={inputField}
            type="text"
            value={proposal_title}
            onChange={(e) => setproposal_title(e.target.value)}
          />
        </label>
        <label style={{ color: "white" }}>
          content:
          <input
          style={inputFieldContent}
            type="text"
            value={proposal_content}
            onChange={(e) => setproposal_content(e.target.value)}
          />
        </label>
        <label style={{ color: "white" }}>
          proposer[address]:
          <input
          style={inputField}
            type="text"
            value={proposal_proposer}
            onChange={(e) => setproposal_proposer(e.target.value)}
          />
        </label>
      </div>
      <button style={buttonStyle} onClick={handleCreateProposal}>Create Proposal</button>
      <div style={{ color: "white" }}>
        <h2>All Proposals</h2>
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal._id}>
              <strong>Title:</strong> {proposal.proposal_id} |
              <strong> Content:</strong> {proposal.proposal_title} |
              <strong> Content:</strong> {proposal.proposal_content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default withWalletProvider(FileUpload);
