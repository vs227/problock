import React from 'react';
import './Footer.css';
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
            <li><Link href="/">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/">Privacy policy</Link></li>
            <li><Link href="/">Terms of service</Link></li>
            <li><Link href="/">Disclaimer</Link></li>
            <li><Link href="/">ODR - Circular</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Investor Relations</h4>
          <ul>
            <li><Link href="/">Investor Overview</Link></li>
            <li><Link href="/">Results & Publications</Link></li>
            <li><Link href="/">Distribution History</Link></li>
            <li><Link href="/">Events & Webcasts</Link></li>
            <li><Link href="/">Regulatory Filings</Link></li>
            <li><Link href="/">Unit Information</Link></li>
            <li><Link href="/">IPO Information</Link></li>
            <li><Link href="/">Investor Charter & Complaints</Link></li>
            <li><Link href="/">Disclosure</Link></li>
            <li><Link href="/">Corporate Overview</Link></li>
            <li><Link href="/">Corporate Governance</Link></li>
            <li><Link href="/">Announcements</Link></li>
            <li><Link href="/">IR Contacts</Link></li>
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
          SEBI Scores Portal: <Link href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer">https://scores.sebi.gov.in</Link> | ODR Portal: <Link href="https://smartodr.in/login" target="_blank" rel="noreferrer">https://smartodr.in/login</Link>
        </p>
        <p>
          For any queries and grievance redressal related matters please write to the compliance officer — Mr. Shreyas Upadhye, Phone no +91 8446859929, Email id - <a href="mailto:compliance.officer@propertyshare.in">compliance.officer@propertyshare.in</a>
        </p>
      </div>

      <div className="footer-bottom">
        <p>Copyright © PropShare Investment Manager Private Limited</p>
        <div className="social-icons">
          <Link href="/"><FaFacebookF /></Link>
          <Link href="/"><FaYoutube /></Link>
          <Link href="/"><FaLinkedinIn /></Link>
          <Link href="/"><FaXTwitter /></Link>
          <Link href="/"><FaInstagram /></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
