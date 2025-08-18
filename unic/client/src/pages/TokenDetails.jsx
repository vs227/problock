import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ethers } from "ethers";
import logo from "../images/prop.jpg";
import logo2 from "../images/image.png";
import "./TokenDetails.css";

const listingsData = [
  {
    id: 1,
    title: "Avenue City",
    location: "Pune, River view city",
    type: "Bungalow",
    ipo: "21-25 June ‘25",
    yield: "9.0%",
    size: "₹10,00,000",
    image: logo,
  },
  {
    id: 2,
    title: "PropShare Platina (PSPLATINA)",
    location: "Seasons, Pune",
    type: "Office",
    ipo: "2-4 Dec ‘24",
    yield: "9.0%",
    size: "₹10,00,000",
    image: logo2,
  },
];

const TokenDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [buying, setBuying] = useState(false);
  const tokenId = parseInt(id);

  const listing = listingsData.find((item) => item.id === tokenId);
  if (!listing)
    return (
      <p style={{ textAlign: "center", marginTop: "3rem" }}>Token not found.</p>
    );

  const yieldValue = parseFloat(listing.yield.replace("%", ""));

  const buyPST = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to buy PST tokens!");
      return;
    }

    try {
      setBuying(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      const contractAddress = "0xYourContractAddressHere";
      const contractABI = ["function buyTokens(uint256 tokenId) public payable"];

      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const ethValue = ethers.parseEther("0.1");

      const tx = await contract.buyTokens(tokenId, { value: ethValue });
      await tx.wait();
      alert("Purchase successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed or rejected.");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="token-details-page">
      <div className="token-details-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate("/listmain")}>
          ⬅ Back to Listings
        </button>

        <div className="token-main">
          {/* Left: Image */}
          <div className="token-image">
            <img src={listing.image} alt={listing.title} />
          </div>

          {/* Middle: Info */}
          <div className="token-info">
            <h2>{listing.title}</h2>
            <p><strong>Location:</strong> {listing.location}</p>
            <p><strong>Type:</strong> {listing.type}</p>
            <p><strong>IPO Dates:</strong> {listing.ipo}</p>
            <p><strong>Minimum Investment:</strong> {listing.size}</p>

            <button className="buy-btn" onClick={buyPST} disabled={buying}>
              {buying ? "Processing..." : "Buy PST Tokens"}
            </button>
          </div>

          {/* Right: Yield Progress */}
          <div className="token-yield">
            <CircularProgressbar
              value={yieldValue}
              maxValue={20}
              text={`${listing.yield}\nYield`}
              styles={buildStyles({
                textSize: "14px",
                pathColor: "#0D47A1",
                textColor: "#000",
                trailColor: "#eee",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
