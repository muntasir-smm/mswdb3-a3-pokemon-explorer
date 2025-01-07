// src/components/Footer.jsx

import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} PokéRealm. All rights reserved.
        </p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a
              //   href="/privacy-policy"
              className="text-white text-decoration-none"
            >
              Privacy Policy
            </a>
          </li>
          <li className="list-inline-item mx-3">|</li>
          <li className="list-inline-item">
            <a
              //   href="/terms-of-service"
              className="text-white text-decoration-none"
            >
              Terms of Service
            </a>
          </li>
          <li>Made by Muntasir Munna</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
