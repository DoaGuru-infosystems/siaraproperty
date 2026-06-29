import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import CarouselPlaceholder from "./CarouselPlaceholder";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { FaRupeeSign } from "react-icons/fa";
import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
const stringSimilarity = require("string-similarity");

const SearchModel = () => {
  const [properties, setProperties] = useState(null);
  const [loading, setLoading] = useState(true);
  const [propertiesImages, setPropertiesImages] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyFor, setPropertyFor] = useState("sale");
  const [propertyBudget, setPropertyBudget] = useState("");

  //     const getAllPropertiesImages = async () => {
  //         try {
  //           const response = await axios.get('http://localhost:4000/api/property/getAllPropertyImages');
  //           setPropertiesImages(response.data);
  //         } catch (error) {
  //           console.error('Error fetching property images:', error);
  //         } finally {
  //           setLoading(false); // Set loading to false regardless of success or error
  //         }
  //       }

  //   const getAllProperties = async () => {
  //        try{
  //           const response = await axios.get('http://localhost:4000/api/property/getAllProperty');

  //           setProperties(response.data);
  //        }
  //        catch(error){
  //         console.error('Error fetching properties:', error);

  //        }
  //        getAllPropertiesImages();
  //   }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/property/getAllProperty",
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    const getAllPropertiesImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/property/getAllPropertyImages",
        );
        setPropertiesImages(response.data);
      } catch (error) {
        console.error("Error fetching property images:", error);
      }
    };

    getAllPropertiesImages();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const isSearchTermEmpty = searchTerm.trim() === "";
  const isPropertyTypeSelected = propertyType !== "";
  const isPropertyForSelected = propertyFor !== "Select Property For Buy/Rent";
  // const isPropertyBudgetSelected = propertyBudget !== "Budget";

  let filteredProperties;
  if (!isSearchTermEmpty || isPropertyForSelected) {
    filteredProperties = properties?.data.filter(
      (property) => {
        const nameSimilarity = stringSimilarity.compareTwoStrings(
          searchTerm.toLowerCase(),
          property?.property_name.toLowerCase(),
        );
        const addressSimilarity = stringSimilarity.compareTwoStrings(
          searchTerm.toLowerCase(),
          property?.property_address.toLowerCase(),
        );

        const includesSearchTerm =
          isSearchTermEmpty || nameSimilarity > 0.2 || addressSimilarity > 0.2; // Adjust threshold as needed
        const matchesPropertyType = isPropertyTypeSelected
          ? property.property_type.toLowerCase() === propertyType.toLowerCase()
          : true;
        const matchesPropertyFor = isPropertyForSelected
          ? property?.property_for.toLowerCase() === propertyFor.toLowerCase()
          : false;
        // const matchesPropertyBudget = isPropertyBudgetSelected ? property.price <= Number(propertyBudget) : true;

        // Include the property address filtering
        // const matchesPropertyAddress =
        //   isSearchTermEmpty ||
        //   property?.property_address.toLowerCase().includes(searchTerm.toLowerCase());
        return includesSearchTerm && matchesPropertyFor && matchesPropertyType;
        // && matchesPropertyBudget && matchesPropertyType;
      },
      // property.property_name.toLowerCase().includes(searchTerm.toLowerCase());
    );
  }

  // If search term is empty, set filteredProperties to an empty array

  // const showZeroPropertyFound = isSearchTermEmpty && !loading;

  return (
    <Wrapper>
      <div className="search-container row justify-content-center mt-md-5 ">
        {/* bootsrap search */}
        <div className="row">
          <div className="col-12  justify-content-center searchLarge">
            <form className=" mt-4  justify-content-center  searchBox ">
              <div className="input-group  d-flex flex-column flex-md-row">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Location Or Project"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search"
                />
                <select
                  className="form-select"
                  onChange={(e) => setPropertyFor(e.target.value)}
                  required
                >
                  <option value="sale">Buy</option>
                  <option value="rent">Rent</option>
                </select>
                <select
                  className="form-select"
                  aria-label="Property Type"
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="flat">Flat</option>
                  <option value="land">Land</option>
                  <option value="farmLand">Farm Land</option>
                  <option value="farmHouse">Farm House</option>
                  <option value="commercial">Commercial</option>
                </select>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="col-12  justify-content-center searchMob">
            <form className="  ">
              <div className="d-flex">
                <div className="form-check form-check-inline ms-3 ps-3">
                  <input
                    className="form-check-input "
                    type="radio"
                    name="propertyFor"
                    id="buyRadio"
                    value="sale"
                    checked={propertyFor === "sale"}
                    onChange={() => setPropertyFor("sale")}
                  />
                  <label
                    className="form-check-label font-weight-bold"
                    htmlFor="buyRadio"
                  >
                    Buy
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="propertyFor"
                    id="rentRadio"
                    value="rent"
                    checked={propertyFor === "rent"}
                    onChange={() => setPropertyFor("rent")}
                  />
                  <label
                    className="form-check-label  font-weight-bold"
                    htmlFor="rentRadio"
                  >
                    Rent
                  </label>
                </div>

                <select
                  className="form-select p-1 typesInput"
                  aria-label="Property Type"
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="plot">Plot</option>
                  <option value="flat">Flat</option>
                  <option value="land">Land</option>
                  <option value="farmLand">Farm Land</option>
                  <option value="farmHouse">Farm House</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="d-flex inputBar mt-2">
                <input
                  className="form-control input"
                  type="text"
                  placeholder="Enter Location Or Project"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search"
                />
                <button
                  type="button"
                  className="btn btn-primary btn-lg searchBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <span className="searchIcon">
                    {" "}
                    <CiSearch />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <div className="row">
            <div className='col-8 mx-auto'>
            <input className="form-control" type="text" placeholder="Enter Location Or Project" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}aria-label="Search"/>
            </div>
            <div className="col-12 d-flex justify-content-center ">
            <form className="d-flex mt-4 justify-content-center  gap-4 searchBox ">
              
        
            
      <select  className="form-select" onChange={(e) => setPropertyFor(e.target.value)} required>
        
        <option value="sale">Buy</option>
        <option value="rent">Rent</option>
      
      </select>
      <select
      className="form-select"
      aria-label="Property Type"
      onChange={(e) => setPropertyType(e.target.value)}
      
    >
      <option value="">All Types</option>
      <option value="house">House</option>
      <option value="villa">Villa</option>
      <option value="plot">Plot</option>
      <option value="flat">Flat</option>
      <option value="land">Land</option>
      <option value="farmLand">Farm Land</option>
      <option value="farmHouse">Farm House</option>
      <option value="commercial">Commercial</option>

      
    </select>
    <div className=''>
      <button type="button" className="btn btn-primary btn-lg"  data-bs-toggle="modal" data-bs-target="#exampleModal" >Search</button>
      </div>
      </form>
     
            </div>
        </div> */}

        {/* model */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-fullscreen "
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title mx-auto" id="exampleModalLabel">
                  Total{" "}
                  {filteredProperties?.length
                    ? filteredProperties?.length
                    : "0"}{" "}
                  Property Found
                </h5>
                <button
                  type="button"
                  className="close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-12">
                  {/*  */}
                  <div className="mb-4">
                    {/* <h3 className="post-heading fw-semibold mb-3 ms-lg-3">
      <p className="text-uppercase text-center">Available </p>
      </h3> */}

                    {loading ? (
                      // <p>Loading...</p>
                      <CarouselPlaceholder />
                    ) : // Render the component only if data is available

                    filteredProperties && filteredProperties?.length > 0 ? (
                      <div className="container-fluid">
                        <div className="row cardBox">
                          {filteredProperties.map((property) => {
                            const matchingImages =
                              propertiesImages?.data.filter(
                                (image) => image?.property_id == property.id,
                              );
                            const imageSrc =
                              matchingImages && matchingImages.length > 0
                                ? matchingImages[0].image
                                : null;
                            console.log(imageSrc);
                            return (
                              <div
                                className="col-lg-4 col-md-6 col-12 mb-4"
                                key={property.id}
                              >
                                <div className="card shadow p-3 mb-5 bg-white rounded">
                                  <a
                                    href={`/property/${property.id}`}
                                    target="blank"
                                  >
                                    <img
                                      src={
                                        imageSrc
                                          ? imageSrc
                                          : "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg?t=st=1701323109~exp=1701326709~hmac=da85cae6601708a5416a585b78ba630517ba8a0b698f72df228ae5ae10f58c58&w=900"
                                      }
                                      className="card-img-top"
                                      alt={`Property ${property.id}`}
                                    />
                                  </a>
                                  <div className="card-body address">
                                    <p className="card-text d-inline text-capitalize">
                                      <span className="fs-5">
                                        <FaLocationDot />
                                      </span>{" "}
                                      {property.property_address}
                                    </p>
                                    <a
                                      href={`/property/${property.id}`}
                                      target="blank"
                                      style={{ textDecoration: "none" }}
                                    >
                                      <h5 className="card-title mt-2 text-capitalize">
                                        {property.property_name}
                                      </h5>
                                    </a>
                                    <h5 className="card-text">
                                      <FaRupeeSign />
                                      {property.price}
                                    </h5>
                                    <p className="card-text">
                                      <small className="text-body-secondary">
                                        <span className="fs-5">
                                          <CgCalendarDates />
                                        </span>{" "}
                                        posted on :{" "}
                                        {moment(property.created_at).fromNow()}
                                      </small>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      // Display a message when no data is available
                      <div className="no-data">
                        <h5 className="text-center">Not available</h5>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-center gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchModel;

const Wrapper = styled.div`
  .searchIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
  }
  .inputBar {
    border-radius: 10px;
    background-color: white;
  }
  .searchBtn {
    margin-top: 5px;
    margin-right: 5px;
    width: 50px;
    height: 40px;
    border-radius: 20px;
  }
  .input {
    height: 50px;
    width: 70vw;
    border-radius: 20px;
    border: none;
    padding: 10px;
  }
  .typesInput {
    width: 40%;
  }

  .searchMob {
    display: none;
    @media only screen and (max-width: 760px) {
      display: flex;
      background-color: grey;
      padding: 10px;
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
  .searchLarge {
    display: flex;
    @media only screen and (max-width: 760px) {
      display: none;
    }
  }

  .searchBox {
    display: flex;
    width: 60%;
    @media only screen and (max-width: 760px) {
      width: 80%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: auto;
    }
    input {
      width: 40%;

      @media only screen and (max-width: 760px) {
        width: 80%;
        border-radius: 0;

        margin: 10px 0;
      }
      @media screen and (min-width: 768px) and (max-width: 1024px) {
      }
    }
    select {
      width: 20%;
      @media only screen and (max-width: 760px) {
        width: 80%;
        margin: 10px 0;
      }
    }
    .input-group {
      @media only screen and (max-width: 760px) {
        margin-left: 35px;
      }
    }
    button {
      @media only screen and (max-width: 760px) {
        width: 80%;
        border-radius: 0;
      }
      @media screen and (min-width: 768px) and (max-width: 1024px) {
      }
    }
  }

  .address {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .post-heading {
    @media only screen and (max-width: 768px) {
      font-size: 20px;
      text-align: center;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 20px;
    }
  }
  h3 {
    font-family: "Playpen Sans", cursive;
  }
  .card {
    border: none;
    margin: 1rem;

    img {
      border-radius: 10px;
      transition: 0.4s ease-in-out;
      cursor: pointer;
      height: 12rem;
    }
    img:hover {
      transform: scale(1.09);
    }

    .card-body {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .no-data {
    height: 50vh;
  }

  .search-container .main {
    padding: 10px;
    @media screen and (max-width: 768px) {
      padding: 5px;
    }
  }
  #search-heading {
    @media screen and (max-width: 620px) {
      font-size: 15px;
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
    height: 2.1rem;
    @media screen and (max-width: 768px) {
      width: 280px;
    }
  }

  h1 {
    font-family: "Playpen Sans", cursive;
  }
  #btnsearch1 {
    margin-left: 11rem;
    width: 85%;
    border-radius: 5rem;
    height: 42px;
    font-weight: 500;

    @media screen and (max-width: 768px) {
      margin-left: 2rem;
      width: 85%;
      border-radius: 5rem;
      height: 2.6rem;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      margin-left: 2rem;
      width: 115%;
      border-radius: 5rem;
      height: 2.6rem;
    }
    @media screen and (min-width: 1024px) and (max-width: 1400px) {
      margin-left: 8rem;
      width: 115%;
      border-radius: 5rem;
      height: 2.6rem;
    }
  }
  #main-col {
    width: 60rem;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
    }
    @media screen and (min-width: 1024px) and (max-width: 1600px) {
      width: 90%;
    }
  }
  #inner-col {
    @media screen and (max-width: 768px) {
      gap: 1rem;
      width: 90vh;
    }
  }
  #res1 {
    @media screen and (max-width: 768px) {
      margin-left: 0rem;
    }
  }
  #res2 {
    @media screen and (max-width: 767px) {
      margin-left: 2rem;
      width: 80%;
    }
  }
  #res3 {
    @media screen and (max-width: 768px) {
      margin-left: 2.3rem;
    }
  }
  #budget {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    background-color: white;
    @media screen and (max-width: 768px) {
      margin-left: -0.3rem;
      width: 19.5rem;
    }
  }
  #mySelect {
    @media screen and (max-width: 768px) {
      background-color: white;
      width: 19.5rem;
      margin-left: 2rem;
    }
  }
`;
