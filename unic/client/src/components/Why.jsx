import React, { Component } from "react";
import "./Why.css";
import acre from "../images/acre.png";
import broker from "../images/broker.png";
import housing from "../images/housing.png";
import magic from "../images/magic.jpg";

export class Why extends Component {
  render() {
    return (
      <section id="Why">
        <div className="Why1">
          <ul>
            <li>
              <h1>Why Choose Us?</h1>
            </li>
            <li>Affordable financing options.</li>
            <li>Wide range of properties.</li>
            <li>Expert guidance throughout the process.</li>
            <li>Transparent and hassle-free transactions.</li>
            <li>Strong community and support network.</li>
          </ul>
        </div>
        <div className="Why2">
          <h1>PARTNERS</h1>
          <div className="partner-logos">
            <img src={acre} alt="acre" />
            <img src={broker} alt="broker" />
            <img src={housing} alt="housing" />
            <img src={magic} alt="magic" />
          </div>
        </div>
      </section>
    );
  }
}

export default Why;
