import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Listings.css";
import logo from "../images/prop.jpg";
import logo2 from "../images/image.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Listings = () => {
  const [showAll, setShowAll] = useState(true);
  const navigate = useNavigate();

  const listingsData = [
    {
      id: 1,
      title: "River view city",
      location: "River view city, Pune",
      type: "Bungalow",
      ipo: "21-25 June ‘25",
      yield: "9.0%",
      size: "₹10,00,000",
      image: logo
    },
    {
      id: 2,
      title: "Seasons Commercial",
      location: "Seasons, Pune",
      type: "Office",
      ipo: "2-4 Dec ‘24",
      yield: "9.0%",
      size: "₹10,00,000",
      image: logo2
    }
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
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              All Opportunities
            </motion.h3>
          </a>
        </div>
      </div>

      {showAll && (
        <motion.div
          className="cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {listingsData.map((listing) => (
            <motion.div key={listing.id} className="card" variants={itemVariants}>
              <img
                src={listing.image}
                alt={listing.title}
                loading="lazy"
              />
              <div className="card-content">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <div className="card-meta">
                  <div><strong>Type:</strong> {listing.type}</div>
                  <div><strong>IPO:</strong> {listing.ipo}</div>
                  <div><strong>Yield:</strong> {listing.yield}</div>
                  <div><strong>Min size:</strong> {listing.size}</div>
                </div>
                <button onClick={() => navigate(`/token/${listing.id}`)}>
                  View More →
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Listings;
