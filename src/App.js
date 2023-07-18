import { useState, useEffect } from "react";
import { ethers , utils, providers } from "ethers";
import Web3Modal from "web3modal";
import "./App.css";
import { ABI, NFT_CONTRACT_ADDRESS, WHITELIST_CONTRACT_ADDRESS, WHITELIST_ABI } from "./constant/index.js";

function App() {
  const [account, setAccount] = useState("");
  const [hash, setHash] = useState("");
  
  const connectMetamask = async (event) => {
    event.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const mintNFT = async (event) => {
    event.preventDefault();
    try {
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ABI, signer);
    const whilist_contract = new ethers.Contract(WHITELIST_CONTRACT_ADDRESS, WHITELIST_ABI, signer);
    console.log(contract.address);
    console.log(whilist_contract.address);

    const isWhitelisted = await whilist_contract.whitelistedAddresses(account);
    if (!isWhitelisted) {
      window.alert("Your address is not whitelisted");
      return;
    }

    const tx = await contract.mint({
      value: utils.parseEther("0.001"),
    });
    // wait for the transaction to get mined
    await tx.wait();
    if (tx == "false"){
      window.alert("you are not whitelisted");
    }
    window.alert("You successfully minted a MD Dev!");
    //console.log(tx);
    setHash(tx.hash);
    console.log(tx.hash);
  } catch (error) {
    console.error(error);
  }
  };
  


  return (
    <div className="App">
      <div className="desktop-1">
      <div className="word-break-parent">
      <form className="f1">
      <p className="head">NFT Minting</p>
      {account ==="" ? (
      <p></p>
): account !=="" ?(
      <p className="account">Hello: {account}</p>
      ): null}
      <p className="account">Before Minting the NFT please whitelist your address <a className="url" href="https://goerli.etherscan.io/address/0x4B274e77b551D60ffE3595DDA5B3eF3B40fA5B77">Here</a></p>
      <p className="account">A detailed guide how to whitelist your address <a className ="url" href="https://github.com/Maitrayee94/NFT-minting/blob/master/README.md">Here</a></p>
<<<<<<< HEAD
=======
      
>>>>>>> abfc06dca5ea47fbfe941144cb605e326bc5d697
      <br />
        
        <br />
        <br />
        <button className="connect" onClick={connectMetamask}>
          Connect Metamask
        </button>
        <button className="participate" onClick={mintNFT}>
          Mint NFT
        </button>
      </form>
      
      <br />
      
      {hash.toString() != "" ? (
  <p className="ts">You transaction Hash: {hash}</p>
      ): null}
    </div>
    </div>
    </div>
  );
}

export default App;
