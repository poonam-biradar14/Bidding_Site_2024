// Footer.js
import React from 'react';
import './footer.css'; // Custom styles
import footerLogo from '../../images/footerlogo.PNG'

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Logo and Company Info */}
          <div className="col-md-4 col-sm-12 mb-3 text-center text-md-left">
            <img src={footerLogo} alt="Genix Auctions" className="footer-logo mb-2" />
            <h5>Genix Auctions</h5>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 col-sm-6 mb-3">
            <h6>Company</h6>
            <ul className="list-unstyled">
              <li><a href="/products" className="text-white">Products</a></li>
              <li><a href="/about-us" className="text-white">About us</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-2 col-sm-6 mb-3">
            <h6>Explore</h6>
            <ul className="list-unstyled">
              <li><a href="/auctions" className="text-white">Auctions</a></li>
              <li><a href="/bidding" className="text-white">Bidding</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-2 col-sm-12 text-center text-md-right mb-3">
            <h6>Follow Us</h6>
            <div className="social-icons">
              <a href="https://twitter.com" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
              <a href="https://facebook.com" className="text-white mx-2"><i className="fab fa-facebook"></i></a>
              <a href="https://instagram.com" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
              <a href="https://github.com" className="text-white mx-2"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0">&copy; 2024 Genix Auctions, All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
