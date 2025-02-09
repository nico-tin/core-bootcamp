"use client";
import { contractABI, contractAddress } from "@/lib/contract";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function Home() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<ethers.Contract>();
  const [count, setCount] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        const account = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (account) {
          setAccount(account[0]);

          const contractInstance = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setContract(contractInstance);
          fetchCount(contractInstance);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchCount = async (contractInstance: ethers.Contract) => {
    if (contractInstance) {
      const value = await contractInstance.getCounter();
      setCount(value);
    }
  };

  const increment = async () => {
    if (contract) {
      const tx = await contract.increment();
      await tx.wait();
      fetchCount(contract);
    }
  };

  const decrement = async () => {
    if (contract) {
      const tx = await contract.decrement();
      await tx.wait();
      fetchCount(contract);
    }
  };

  useEffect(() => {
    connectWallet();
  });

  return (
<>
  <div className="flex justify-center items-center h-screen bg-black text-white relative overflow-hidden">
    {/* Background Glow & Animations */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-purple-900 opacity-50 animate-pulse"></div>
    <div className="absolute w-full h-full flex items-center justify-center">
      <div className="absolute w-[500px] h-[500px] bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
    </div>

    {/* Main Container */}
    <div className="relative z-10 bg-white/10 backdrop-blur-lg border border-cyan-400/30 rounded-3xl p-10 text-center w-[450px] shadow-[0px_0px_50px_cyan]">
      <h1 className="text-1xl font-extrabold text-cyan-400 tracking-widest animate-pulse">
        🚀 BEMBANG COIN COUNTER 🚀
      </h1>

      {/* Glitch Animation */}
      <p className="text-sm text-gray-400 mt-2 uppercase tracking-wider glitch-text">
        Blockchain Synced • Live Data • Secure
      </p>

      {/* Connect Wallet Button */}
      <button
        className="bg-cyan-500 hover:bg-cyan-700 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-xl transform hover:scale-110 hover:shadow-cyan-500/50 mt-6 animate-flicker"
        onClick={connectWallet}
      >
        Connect Wallet 🔗
      </button>

      {/* Connected Account */}
      <div className="mt-6">
        <p className="font-medium text-lg text-gray-300">Account:</p>
        <p className="text-cyan-400 font-mono bg-black/30 px-3 py-2 rounded-lg break-all">
          {account ? account : "Not Connected"}
        </p>
      </div>

      {/* Counter Display */}
      <div className="mt-6 text-5xl font-bold text-cyan-400 tracking-widest shadow-lg">
        {count}
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center gap-5 mt-6">
        <button
          className="bg-green-500 hover:bg-green-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-green-500/50 animate-float"
          onClick={increment}
        >
          ➕ Augment
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg transform hover:scale-110 hover:shadow-red-500/50 animate-float"
          onClick={decrement}
        >
          🔻 Reduce
        </button>
      </div>
    </div>
  </div>
</>

  );
}