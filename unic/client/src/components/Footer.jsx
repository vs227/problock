import React from 'react';
import './Footer.css';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col logo-col">
          <h2 className="logo">PropShare</h2>
          <p><strong>PropShare Investment Manager Private Limited</strong></p>
          <p>MIT ADT University ,Pune 412201</p>
          <p>+91 9579437409</p>
          <p>vaishnavshinde186@gmail.com</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Disclaimer</a></li>
            <li><a href="#">ODR - Circular</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Investor Relations</h4>
          <ul>
            <li><a href="#">Investor Overview</a></li>
            <li><a href="#">Results & Publications</a></li>
            <li><a href="#">Distribution History</a></li>
            <li><a href="#">Events & Webcasts</a></li>
            <li><a href="#">Regulatory Filings</a></li>
            <li><a href="#">Unit Information</a></li>
            <li><a href="#">IPO Information</a></li>
            <li><a href="#">Investor Charter & Complaints</a></li>
            <li><a href="#">Disclosure</a></li>
            <li><a href="#">Corporate Overview</a></li>
            <li><a href="#">Corporate Governance</a></li>
            <li><a href="#">Announcements</a></li>
            <li><a href="#">IR Contacts</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-disclaimer">
        <hr />
        <p>
          PropShare Investment Manager Private Limited is the Investment Manager to Property Share Investment Trust ("Trust") and schemes registered under the Trust (Small and Medium Real Estate Investment Trust registered with SEBI).
        </p>
        <p>
          For direct filing of complaints on SCORES in a few quick steps (a) Register on SCORES portal (b) Fill in all the mandatory details for filing complaints on SCORES - name, PAN, address, mobile number, email ID. Benefits for this will be effective communication and speedy redressal of the grievances.
        </p>
        <p>
          SEBI Scores Portal: <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer">https://scores.sebi.gov.in</a> | ODR Portal: <a href="https://smartodr.in/login" target="_blank" rel="noreferrer">https://smartodr.in/login</a>
        </p>
        <p>
          For any queries and grievance redressal related matters please write to the compliance officer — Mr. Shreyas Upadhye, Phone no +91 8446859929, Email id - <a href="mailto:compliance.officer@propertyshare.in">compliance.officer@propertyshare.in</a>
        </p>
      </div>

      <div className="footer-bottom">
        <p>Copyright © PropShare Investment Manager Private Limited</p>
        <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaXTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
