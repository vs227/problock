import React, { Component } from "react";
import "./Why.css";
import acre from "../images/acre.png";
import broker from "../images/broker.png";
import housing from "../images/housing.png";
import magic from "../images/magic.jpg";
import { motion } from "framer-motion";

export class Why extends Component {
  render() {
    const listItems = [
      "Affordable financing options.",
      "Wide range of properties.",
      "Expert guidance throughout the process.",
      "Transparent and hassle-free transactions.",
      "Strong community and support network.",
    ];

    const partnerLogos = [acre, broker, housing, magic];

    return (
      <section id="Why">
        <motion.div
          className="Why1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <ul>
            <motion.li
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h1>Why Choose Us?</h1>
            </motion.li>

            {listItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="Why2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h1>PARTNERS</h1>
          <div className="partner-logos">
            {partnerLogos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt={`partner-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.div>
      </section>
    );
  }
}

export default Why;
