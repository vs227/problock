import React, { Component } from "react";
import "./Res.css";
import { motion } from "framer-motion";

const cityData = {
  PUNE: [
    "PARK STREET",
    "TARA CITY",
    "JANNAT",
    "LODHA BELMONDO",
    "PALM ATLANTIS",
    "JSM",
    "RADHA LIVIN",
    "LAKE TOWN",
    "PRIDE WORLD CITY",
    "KENDRIYA VIHAR",
  ],
  BANGALORE: [
    "BRIGADE GATEWAY",
    "PRESTIGE LAKESIDE",
    "SOBHA CITY",
    "RMZ GALLERIA",
  ],
  AHMEDABAD: [
    "GIFT CITY",
    "SATYAMEV HEIGHTS",
    "ADANI SHANTIGRAM",
    "MAPLE COUNTY",
  ],
  MUMBAI: [
    "LODHA PARK",
    "RUNWAL ELEGANTE",
    "RAHEJA EXOTICA",
    "HIRANANDANI ESTATE",
  ],
  Satara: ["SATARA CITY", "SATARA GARDENS", "SATARA RESIDENCY", "SATARA PALMS"],
  Nashik: [
    "NASHIK HEIGHTS",
    "NASHIK GARDENS",
    "NASHIK RESIDENCY",
    "NASHIK PALMS",
  ],
  Mahabaleshwar: [
    "MAHABALESHWAR HILLS",
    "MAHABALESHWAR RESORTS",
    "MAHABALESHWAR VILLAS",
    "MAHABALESHWAR ESTATE",
  ],
  Kolhapur: [
    "KOLHAPUR CITY",
    "KOLHAPUR GARDENS",
    "KOLHAPUR RESIDENCY",
    "KOLHAPUR PALMS",
  ],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export class Res extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: "PUNE",
      renderKey: 0,
    };
  }

  handleCityChange = (city) => {
    this.setState({
      selectedCity: city,
      renderKey: this.state.renderKey + 1,
    });
  };

  render() {
    const { selectedCity, renderKey } = this.state;
    const properties = cityData[selectedCity];

    return (
      <section id="Res">
        <motion.div
          className="title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
        >
          <h2>Browse Residential Projects in Top 5 Cities</h2>
        </motion.div>

        <motion.div
          className="city-tabs"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Object.keys(cityData).map((city, index) => (
            <motion.button
              key={city}
              className={`tab-button ${selectedCity === city ? "active" : ""}`}
              onClick={() => this.handleCityChange(city)}
              variants={fadeUpVariants}
              transition={{ delay: index * 0.1 }}
            >
              {city}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="property-grid"
          key={renderKey}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {properties.map((property, index) => (
            <motion.div
              key={index}
              className="property-item"
              variants={fadeUpVariants}
              transition={{ delay: index * 0.05 }}
            >
              {property}
            </motion.div>
          ))}
        </motion.div>
      </section>
    );
  }
}

export default Res;
