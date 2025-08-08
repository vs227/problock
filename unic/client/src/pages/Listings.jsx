import React, { useState } from "react";
import "./Listings.css";
import logo from "../images/prop.jpg";
import logo2 from "../images/image.png";
import RevealWrapper from "../components/RevealWrapper";

const Listings = () => {
  const [showAll, setShowAll] = useState(true);

  const listingsData = [
    {
      id: 1,
      title: "PropShare Titania (PSTITANIA)",
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

  return (
    <div className="listing">
      <div className="oppor">
        <div className="op">
          <a
            href="/Home"
            className={showAll ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setShowAll(true);
            }}
          >
            <RevealWrapper delay={0.3}>
                <h3>All Opportunities</h3>
            </RevealWrapper>
            
          </a>
        </div>
      </div>

      {showAll && (
        <div className="cards">
          {listingsData.map((listing, index) => (
            <RevealWrapper key={listing.id} delay={index * 0.2}>
              <div className="card">
                <img src={listing.image} alt={listing.title} />
                <div className="card-content">
                  <h3>{listing.title}</h3>
                  <p>{listing.location}</p>
                  <div className="card-meta">
                    <div><strong>Type:</strong> {listing.type}</div>
                    <div><strong>IPO:</strong> {listing.ipo}</div>
                    <div><strong>Yield:</strong> {listing.yield}</div>
                    <div><strong>Min size:</strong> {listing.size}</div>
                  </div>
                  <button>View More →</button>
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
