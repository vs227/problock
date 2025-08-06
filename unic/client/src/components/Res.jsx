import React, { Component } from "react";
import './Res.css';

const cityData = {
  PUNE: ["PARK STREET", "TARA CITY", "JANNAT", "LODHA BELMONDO", "PALM ATLANTIS", "JSM", "RADHA LIVIN", "LAKE TOWN", "PRIDE WORLD CITY", "KENDRIYA VIHAR"],
  BANGALORE: ["BRIGADE GATEWAY", "PRESTIGE LAKESIDE", "SOBHA CITY", "RMZ GALLERIA"],
  AHMEDABAD: ["GIFT CITY", "SATYAMEV HEIGHTS", "ADANI SHANTIGRAM", "MAPLE COUNTY"],
  MUMBAI: ["LODHA PARK", "RUNWAL ELEGANTE", "RAHEJA EXOTICA", "HIRANANDANI ESTATE"],
  Satara: ["SATARA CITY", "SATARA GARDENS", "SATARA RESIDENCY", "SATARA PALMS"],
  Nashik: ["NASHIK HEIGHTS", "NASHIK GARDENS", "NASHIK RESIDENCY", "NASHIK PALMS"],
  Mahabaleshwar: ["MAHABALESHWAR HILLS", "MAHABALESHWAR RESORTS", "MAHABALESHWAR VILLAS", "MAHABALESHWAR ESTATE"],
  Kolhapur: ["KOLHAPUR CITY", "KOLHAPUR GARDENS", "KOLHAPUR RESIDENCY", "KOLHAPUR PALMS"]
};

export class Res extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: "PUNE",
      renderKey: 0
    };
  }

  handleCityChange = (city) => {
    this.setState({
      selectedCity: city,
      renderKey: this.state.renderKey + 1 
    });
  };

  render() {
    const { selectedCity, renderKey } = this.state;
    const properties = cityData[selectedCity];

    return (
      <section id="Res">
        <div className="title">
          <h2>Browse Residential Projects in Top 5 Cities</h2>
        </div>

        <div className="city-tabs">
          {Object.keys(cityData).map(city => (
            <button
              key={city}
              className={`tab-button ${selectedCity === city ? 'active' : ''}`}
              onClick={() => this.handleCityChange(city)}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="property-grid" key={renderKey}>
          {properties.map((property, index) => (
            <div
              key={index}
              className="property-item fade-in-stagger"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {property}
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Res;
