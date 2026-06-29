import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchModel from "./SearchModel";

export default function () {
  return (
    <div>
      <Wrapper>
        <section>
          <div className="container-fluid mb-4 px-0 py-0">
            <div className="border border-1 rounded py-md-4 my-md-2">
              <SearchModel />
              <h1 className="text-center fw-bold mt-5" id="search-heading">
                Explore Our Properties
              </h1>

              <div className="row links">
                <ul className="d-flex flex-column flex-md-row mt-5 mb-2 justify-content-center text-center cat-list ">
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/house" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 w-md-50 house"
                      >
                        <h3>House</h3>
                      </button>
                    </a>
                  </div>
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/villa" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 w-md-50 villa"
                      >
                        <h3>Villa</h3>
                      </button>
                    </a>
                  </div>
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/plot" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 w-md-50 plot"
                      >
                        <h3>Plot</h3>
                      </button>
                    </a>
                  </div>
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/flat" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 w-md-50 flat"
                      >
                        <h3>Flat</h3>
                      </button>
                    </a>
                  </div>
                </ul>
              </div>

              <div className="row links">
                <ul className="d-flex flex-column flex-md-row mt-lg-4 mb-2 justify-content-center text-center cat-list">
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/land" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 land"
                      >
                        <h3>Land</h3>
                      </button>
                    </a>
                  </div>
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/farmLand" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 farmland"
                      >
                        <h3>Farm Land</h3>
                      </button>
                    </a>
                  </div>
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/farmHouse" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 farmhouse"
                      >
                        <h3>Farm House</h3>
                      </button>
                    </a>
                  </div>
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertyType/commercial" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 commercial"
                      >
                        <h3>Commercial</h3>
                      </button>
                    </a>
                  </div>
                </ul>
              </div>
              <div className="row links">
                <ul className="d-flex flex-column flex-md-row mt-lg-4 mb-5 justify-content-center text-center cat-list">
                  <div className="col-md-3 col-12 mb-3 button">
                    <a href="/property/propertiesForRent" target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-75 rent"
                      >
                        <h3>Property For Rent</h3>
                      </button>
                    </a>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  .button {
    :hover {
      transform: scale(1.1);
      transition: 0.3s ease-in-out;
    }
  }
  .house {
    background-color: #312244;
    color: white;
  }
  .villa {
    background-color: #4d194d;
    color: white;
  }
  .land {
    background-color: #013a63;
    color: white;
  }
  .plot {
    background-color: #532c1e;
    color: white;
  }
  .flat {
    background-color: #453a49;
    color: white;
  }
  .farmland {
    background-color: #193d31;
    color: white;
  }
  .farmhouse {
    background-color: #364156;
    color: white;
  }
  .commercial {
    background-color: #40434e;
    color: white;
  }
  .rent {
    background-color: #6d2e46;
    color: white;
  }

  .links {
    width: 100vw;
  }
  .cat-list {
    list-style: none;
  }

  .search-container .main {
    padding: 10px;
    @media screen and (max-width: 768px) {
      padding: 5px;
    }
  }
  #search-heading {
    @media screen and (max-width: 620px) {
      font-size: 25px;
      text-align: center;
    }
    @media only screen and (min-width: 620px) and (max-width: 768px) {
      font-size: 30px;
      text-align: center;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 35px;
    }
    @media screen and (min-width: 1024px) and (max-width: 1600px) {
      font-size: 40px;
    }
  }
  input#search-box {
    width: 300px;
    @media screen and (max-width: 620px) {
      width: 250px;
    }
    @media only screen and (min-width: 620px) and (max-width: 768px) {
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
    }
    @media screen and (min-width: 1024px) and (max-width: 1600px) {
    }
  }

  h1 {
    font-family: "Playpen Sans", cursive;
  }
  #btnsearch {
    margin-left: 3.5rem;
    @media screen and (max-width: 768px) {
      margin-left: 1.5rem;
    }
  }
  #main-col {
    width: 60rem;
    @media screen and (min-width: 1024px) and (max-width: 1600px) {
      width: 58rem;
    }
  }
  #inner-col {
    @media screen and (max-width: 768px) {
      gap: 1rem;
    }
  }
  #res1 {
    @media screen and (max-width: 768px) {
      margin-left: 1rem;
    }
  }
  #res2 {
    @media screen and (max-width: 768px) {
      margin-left: 1rem;
    }
  }
  #res3 {
    @media screen and (max-width: 768px) {
      margin-left: 1.5rem;
    }
  }
  #budget {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    background-color: white;
    @media screen and (max-width: 768px) {
      margin-left: -0.3rem;
    }
  }
  #mySelect {
    @media screen and (max-width: 768px) {
      background-color: white;
    }
  }
`;
