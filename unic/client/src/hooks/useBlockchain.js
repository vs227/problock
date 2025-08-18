import { useState } from "react";
import { ethers } from "ethers";
import addresses from "../contracts/addresses.json";
import PropertyTokenABI from "../contracts/PropertyToken.json";
import PrimarySaleABI from "../contracts/PrimarySale.json";

export default function useBlockchain() {
  const [account, setAccount] = useState(null);
  const [pstBalance, setPstBalance] = useState("0");

  // Connect wallet
  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);

      // Fetch PST balance
      const token = new ethers.Contract(
        addresses.PropertyToken,
        PropertyTokenABI.abi,
        signer
      );
      const bal = await token.balanceOf(addr);
      setPstBalance(ethers.formatUnits(bal, 18));
    } catch (err) {
      console.error("⚠️ connectWallet error:", err);
    }
  }

  // Buy PST tokens
  async function buyPST(amount = "10") {
    if (!account) {
      alert("Connect wallet first!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const sale = new ethers.Contract(
        addresses.PrimarySale,
        PrimarySaleABI.abi,
        signer
      );

      const tx = await sale.buyTokens(ethers.parseUnits(amount, 18));
      await tx.wait();
      alert(`✅ Bought ${amount} PST!`);

      // Refresh balance
      const token = new ethers.Contract(
        addresses.PropertyToken,
        PropertyTokenABI.abi,
        signer
      );
      const bal = await token.balanceOf(account);
      setPstBalance(ethers.formatUnits(bal, 18));
    } catch (err) {
      console.error("⚠️ buyPST error:", err);
      alert("Transaction failed. Check console.");
    }
  }

  return { account, pstBalance, connectWallet, buyPST };
}
