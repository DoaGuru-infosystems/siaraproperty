// components/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Dark charcoal footer with 5-column grid
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <FooterWrap>
      <div className="footer-grid">
        {/* Brand column */ }
        <div>
          <div className="footer-logo">Siara Properties</div>
          <p className="footer-desc">
            Jabalpur's most trusted real estate platform. Buy, sell, or rent  everything in one place.
          </p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/profile.php?id=61590581714128" className="social-btn" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/siaraproperties/" className="social-btn" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-btn" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://wa.me/919243066371" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Column 2 */ }
        <div className="footer-col">
          <h4>Residential</h4>
          <ul>
            { [
              "Houses in Jabalpur",
              "Villas in Jabalpur",
              "Plots in Jabalpur",
              "Flats in Jabalpur",
              "Farm House",
              "Farm Land",
              "Commercial",
            ].map((item) => (
              <li key={ item }>
                <a href="/properties">{ item }</a>
              </li>
            )) }
          </ul>
        </div>

        {/* Column 3 */ }
        <div className="footer-col">
          <h4>BHK Searches</h4>
          <ul>
            { [
              "1 BHK Flats",
              "2 BHK Flats",
              "3 BHK Flats",
              "4 BHK Flats",
              "1 BHK House",
              "2 BHK House",
              "3 BHK House",
            ].map((item) => (
              <li key={ item }>
                <a href="/properties">{ item }</a>
              </li>
            )) }
          </ul>
        </div>

        {/* Column 4 */ }
        <div className="footer-col">
          <h4>For Rent</h4>
          <ul>
            { [
              "Houses for Rent",
              "Villas for Rent",
              "Plots for Rent",
              "Flats for Rent",
              "Land for Rent",
              "Farm Lands",
              "Commercial Rent",
            ].map((item) => (
              <li key={ item }>
                <a href="/properties">{ item }</a>
              </li>
            )) }
          </ul>
        </div>

        {/* Column 5 */ }
        <div className="footer-col">
          <h4>Resale</h4>
          <ul>
            { [
              "House Resale",
              "Villa Resale",
              "Plot Resale",
              "Flat Resale",
              "Land Resale",
              "Farm Lands",
              "Farm Houses",
            ].map((item) => (
              <li key={ item }>
                <a href="/properties">{ item }</a>
              </li>
            )) }
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SiaraProperties.com · All Rights Reserved</p>
        <div className="footer-bottom-links">
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </FooterWrap>
  );
}

const FooterWrap = styled.footer`
  background: #2c2c28;
  color: white;
  padding: 64px 8% 32px;

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 56px;

    @media (max-width: 960px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .footer-logo {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 26px;
    font-weight: 300;
    margin-bottom: 16px;
    color: white;
  }

  .footer-desc {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 260px;
  }

  .footer-socials {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    &:hover {
      border-color: #b8895a;
      color: #b8895a;
    }
  }

  .footer-col {
    h4 {
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.35);
      margin-bottom: 20px;
      font-weight: 400;
    }
    ul {
      list-style: none;
    }
    li {
      margin-bottom: 10px;
    }
    a {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.55);
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: #b8895a;
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;

    p {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.25);
    }
  }

  .footer-bottom-links {
    display: flex;
    gap: 20px;
    a {
      color: rgba(255, 255, 255, 0.35);
      text-decoration: none;
      font-size: 12px;
      &:hover {
        color: #b8895a;
      }
    }
  }
`;
