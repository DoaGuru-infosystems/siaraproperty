import React from "react";
import styled from "styled-components";
import { BsFacebook, BsWhatsapp, BsInstagram } from "react-icons/bs";

import { IoLogoYoutube } from "react-icons/io";
import { BiLogoInstagramAlt, BiLogoWhatsappSquare } from "react-icons/bi";

import logo from "../images/Real-Estate-Logo.png";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

const Footer = () => {
  return (
    <>
      <Container>
        <div className="container-fluid footmain">
          <div className="p-4">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <h6 className="text-center">
                  Popular Residential Property Searches
                </h6>
                <ul>
                  <a href="/property/propertyType/house" target="blank">
                    { " " }
                    <li>Houses in Jabalpur</li>{ " " }
                  </a>
                  <a href="/property/propertyType/villa" target="blank">
                    { " " }
                    <li>Villas in Jabalpur</li>
                  </a>
                  <a href="/property/propertyType/plot" target="blank">
                    { " " }
                    <li>Plots in Jabalpur</li>
                  </a>
                  <a href="/property/propertyType/flat" target="blank">
                    { " " }
                    <li>Flats in Jabalpur</li>
                  </a>
                  <a href="/property/propertyType/land" target="blank">
                    { " " }
                    <li>Land in Jabalpur</li>
                  </a>
                  <a href="/property/propertyType/farmLand" target="blank">
                    { " " }
                    <li>Farm Land in Jabalpur</li>
                  </a>
                  <a href="/property/propertyType/farmHouse" target="blank">
                    { " " }
                    <li>Farm House in Jabalpur</li>
                  </a>
                  <a href="/property/propertyType/commercial" target="blank">
                    { " " }
                    <li>Commercial Property in Jabalpur</li>
                  </a>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <h6 className="text-center">Popular BHK Searches</h6>
                <ul>
                  <a href="/property/flat/1" target="blank">
                    { " " }
                    <li>1 BHK Flats in Jabalpur</li>
                  </a>
                  <a href="/property/flat/2" target="blank">
                    { " " }
                    <li>2 BHK Flats in Jabalpur</li>
                  </a>
                  <a href="/property/flat/3" target="blank">
                    { " " }
                    <li>3 BHK Flats in Jabalpur</li>
                  </a>
                  <a href="/property/flat/4" target="blank">
                    { " " }
                    <li>4 BHK Flats in Jabalpur</li>
                  </a>
                  <a href="/property/house/1" target="blank">
                    { " " }
                    <li>1 BHK House for Sale in Jabalpur</li>
                  </a>
                  <a href="/property/house/2" target="blank">
                    { " " }
                    <li>2 BHK House for Sale in Jabalpur</li>
                  </a>
                  <a href="/property/house/3" target="blank">
                    { " " }
                    <li>3 BHK House for Sale in Jabalpur</li>
                  </a>
                  <a href="/property/house/4" target="blank">
                    { " " }
                    <li>4 BHK House for Sale in Jabalpur</li>
                  </a>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <h6 className="text-center">
                  Popular Rental Property Searches
                </h6>
                <ul>
                  <a href="/property/propertiesForRent/house" target="blank">
                    <li>Houses for Rent in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForRent/villa" target="blank">
                    { " " }
                    <li>Villas for Rent in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForRent/plot" target="blank">
                    { " " }
                    <li>Plots for Rent in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForRent/flat" target="blank">
                    { " " }
                    <li>Flats for Rent in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForRent/land" target="blank">
                    { " " }
                    <li>Land for Rent in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForRent/farmLand" target="blank">
                    { " " }
                    <li>Farm Lands for Rent in Jabalpur</li>
                  </a>
                  <a
                    href="/property/propertiesForRent/farmHouse"
                    target="blank"
                  >
                    { " " }
                    <li>Farm House for Rent in Jabalpur</li>
                  </a>
                  <a
                    href="/property/propertiesForRent/commercial"
                    target="blank"
                  >
                    { " " }
                    <li>Commercial Property for Rent in Jabalpur</li>
                  </a>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                <h6 className="text-center">
                  Popular Resale Property Searches
                </h6>
                <ul>
                  <a href="/property/propertiesForResale/house" target="blank">
                    { " " }
                    <li>House for Resale in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForResale/villa" target="blank">
                    { " " }
                    <li>Villas for Resale in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForResale/plot" target="blank">
                    { " " }
                    <li>Plots for Resale in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForResale/flat" target="blank">
                    { " " }
                    <li>Flats for Resale in Jabalpur</li>
                  </a>
                  <a href="/property/propertiesForResale/land" target="blank">
                    { " " }
                    <li>Lands for Resale in Jabalpur</li>
                  </a>
                  <a
                    href="/property/propertiesForResale/farmLand"
                    target="blank"
                  >
                    { " " }
                    <li>Farm Lands for Resale in Jabalpur</li>
                  </a>
                  <a
                    href="/property/propertiesForResale/farmHouse"
                    target="blank"
                  >
                    { " " }
                    <li>Farm Houses for Resale in Jabalpur</li>
                  </a>
                  <a
                    href="/property/propertiesForResale/commercial"
                    target="blank"
                  >
                    <li>Commercials Property for Resale in Jabalpur</li>
                  </a>
                </ul>
              </div>
              <div className="d-flex justify-content-center">
                <ul className="text-center">
                  <li>
                    { " " }
                    <img
                      src={ logo }
                      height={ 100 }
                      width={ 100 }
                      alt=""
                      className="rounded-3"
                    />{ " " }
                  </li>
                  <li>
                    <h5 className="mt-3 mx-5">Follow us on</h5>
                  </li>
                  <li>
                    <div className="d-flex gap-4 mt-3">
                      <Link
                        to={ "https://www.facebook.com/profile.php?id=61590581714128" }
                        target="blank"
                      >
                        { " " }
                        <BsFacebook
                          size={ 30 }
                          className="fbIcon"
                          style={ { color: "#316FF6" } }
                        />
                      </Link>
                      <Link
                        to={
                          "https://www.instagram.com/siaraproperties/"
                        }
                        target="blank"
                      >
                        { " " }
                        <BsInstagram size={ 30 } style={ { color: "#E4405F" } } />
                      </Link>
                      <Link
                        className=""
                        to={ "https://wa.me/+918839280515" }
                        target="blank"
                      >
                        <BsWhatsapp
                          size={ 30 }
                          style={ { color: "#128C7E" } }
                          onMouseOver={ ({ target }) =>
                            (target.style.color = "#128C7E")
                          }
                          onMouseOut={ ({ target }) =>
                            (target.style.color = "#128C7E")
                          }
                        />
                      </Link>
                      <IoLogoYoutube size={ 30 } style={ { color: "#CD201F" } } />
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-white text-center fs-6">
                  Copyright &copy; 2024 SiaraProperties.com | All Rights
                  Reserved
                </h5>
                <p className="text-white text-center fs-6">
                  { " " }
                  <a
                    href="http://localhost:4000/info/terms-and-conditions"
                    target="blank"
                    className="terms"
                  >
                    <span className="text-white">Terms and Conditions</span>
                  </a>{ " " }
                  |{ " " }
                  <a
                    href="http://localhost:4000/info/privacy-policy"
                    target="blank"
                    className="terms"
                  >
                    <span className="text-white">Privacy Policy</span>{ " " }
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
          <div className="container pt-3 pb-3">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <div>
                  <h5>MakanOnline</h5>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                <div>
                  <h5>@2023 Doaguruinfosystems. All Right Reserved</h5>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                <div className="d-flex justify-content-evenly">
                  <BsFacebook />
                  <BsInstagram />
                  <BsWhatsapp />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Container>
    </>
  );
};

export default Footer;
const Container = styled.div`
  .footmain {
    background-color: #000;
  }

  h6 {
    color: white;
    border-bottom: 1px solid #ff7675;
    padding-bottom: 0.5rem;
  }
  ul {
    a {
      text-decoration: none;
      :hover {
        color: red;
      }
    }
    li {
      list-style-type: none;
      color: white;
    }
  }
  .terms {
    text-decoration: none;
  }
  .fbIcon {
    :hover {
      color: #316ff6;
    }
  }
`;
