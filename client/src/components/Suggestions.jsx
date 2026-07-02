import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./responsive";
import CarouselPlaceholder from "./CarouselPlaceholder";
import { FaRupeeSign } from "react-icons/fa";
import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";

export default function Suggestions() {
  const [properties, setProperties] = useState(null);
  const [propertiesImages, setPropertiesImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAllProperties = async () => {
    try {
      const response = await axios.get(
        "/api/property/getSuggestedProperty",
      );
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const getAllPropertiesImages = async () => {
    try {
      const response = await axios.get(
        "/api/property/getSuggestedPropertyImages",
      );
      setPropertiesImages(response.data);
    } catch (error) {
      console.error("Error fetching property images:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  useEffect(() => {
    getAllProperties();
    getAllPropertiesImages();
  }, []);

  console.log(properties);
  console.log(propertiesImages);

  return (
    <Wrapper>
      <div className="mb-4">
        <h3 className="post-heading fw-semibold mb-3 ms-lg-3">Suggestions</h3>

        {loading ? (
          // <p>Loading...</p>
          <CarouselPlaceholder />
        ) : // Render the component only if data is available
        properties && properties.data && properties.data.length > 0 ? (
          <div className="row cardBox">
            <Carousel responsive={responsive} showDots={true} infinite={true}>
              {properties.data.map((property) => {
                const matchingImages = propertiesImages?.data.filter(
                  (image) => image.property_id == property.id,
                );
                const imageSrc =
                  matchingImages && matchingImages.length > 0
                    ? matchingImages[0].image
                    : null;
                console.log(imageSrc);
                return (
                  <div className="col-12 col-md-4 mb-4" key={property.id}>
                    <div className="card shadow mx-auto m-0 p-3 mb-5 bg-white rounded">
                      <Link to={`/property/${property.id}`}>
                        <img
                          src={
                            imageSrc
                              ? imageSrc
                              : "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg?t=st=1701323109~exp=1701326709~hmac=da85cae6601708a5416a585b78ba630517ba8a0b698f72df228ae5ae10f58c58&w=900"
                          }
                          className="card-img-top"
                          alt={`Property ${property.id}`}
                        />
                      </Link>
                      <div className="card-body address">
                        <p className="card-text d-inline text-capitalize">
                          <span className="fs-5">
                            <FaLocationDot />
                          </span>{" "}
                          {property.property_address}
                        </p>
                        <Link
                          to={`/property/${property.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <h5 className="card-title mt-2 text-capitalize">
                            {property.property_name}
                          </h5>
                        </Link>
                        <h5 className="card-text">
                          <FaRupeeSign />
                          {property.price}
                        </h5>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            <span className="fs-5">
                              <CgCalendarDates />
                            </span>{" "}
                            posted on : {moment(property.created_at).fromNow()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        ) : (
          // Display a message when no data is available
          <p className="ms-lg-3">Not available</p>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .cardBox {
    @media only screen and (max-width: 768px) {
      width: 100vw;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 100vw;
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
    width: 23rem;

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
`;
