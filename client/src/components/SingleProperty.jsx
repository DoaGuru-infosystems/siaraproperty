import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { PiArrowFatLineRightFill } from "react-icons/pi";
import ContactUsModel from "./ContactUsModel";
import RelatedProperty from "./RelatedProperty";
import axios from "axios";
import placeholder_img from "../images/placeholder-image.jpeg";
import StickyNavbar from "../components/Navbar";
import NavbarMob from "./NavbarMob";
import { BiCategoryAlt } from "react-icons/bi";




import { Carousel } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // Don't forget to import the styles
import ReactGA from "react-ga4";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";

function SingleProperty() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentUrl = window.location.href;
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  // Function to fetch property details by propertyId
  const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await axios.get(
        `/api/property/getPropertyById/${propertyId}`,
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching property details:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  // Function to fetch property images by propertyId
  const fetchPropertyImages = async (propertyId) => {
    try {
      const response = await axios.get(
        `/api/property/getPropertyImagesById/${propertyId}`,
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching property images:", error);
      return []; // Return an empty array in case of an error
    }
  };

  // Function for fullscreen the image
  // const toggleFullScreen = () => {
  //   const element = document.getElementById("carousel-inner");

  //   const fullscreenChangeHandler = () => {
  //     setIsFullScreen(
  //       document.fullscreenElement ||
  //         document.mozFullScreenElement ||
  //         document.webkitFullscreenElement ||
  //         document.msFullscreenElement
  //     );

  //     // Check if zoomable image exists
  //     const image = document.querySelector(".zoomable-image");
  //     if (image) {
  //       image.classList.remove("zoomed-image");
  //     }
  //   };

  //   if (!isFullScreen) {
  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.mozRequestFullScreen) {
  //       element.mozRequestFullScreen();
  //     } else if (element.webkitRequestFullscreen) {
  //       element.webkitRequestFullscreen();
  //     } else if (element.msRequestFullscreen) {
  //       element.msRequestFullscreen();
  //     }
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen();
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen();
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen();
  //     }
  //   }

  //   // Add event listener for fullscreen change
  //   document.addEventListener("fullscreenchange", fullscreenChangeHandler);
  //   document.addEventListener("mozfullscreenchange", fullscreenChangeHandler);
  //   document.addEventListener(
  //     "webkitfullscreenchange",
  //     fullscreenChangeHandler
  //   );
  //   document.addEventListener("msfullscreenchange", fullscreenChangeHandler);

  //   // Add click event listener for zooming
  //   const image = document.querySelector(".zoomable-image");
  //   if (image) {
  //     image.addEventListener("click", () => {
  //       image.classList.toggle("zoomed-image");
  //     });
  //   }
  // };

  const toggleFullScreen = (event) => {
    const element = event.target;

    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      // Element is in fullscreen mode, so exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      // Element is not in fullscreen mode, so enter fullscreen
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  };

  // useEffect(() => {
  //   // Fetch property details using propertyId
  //   const fetchProperty = async () => {
  //     try {
  //       const response = await axios.get(`/api/property/getPropertyById/${propertyId}`);
  //       console.log(response.data);
  //       setProperty(response.data.data); // Set property in state
  //       setLoading(false); // Set loading to false
  //       // Handle the response data as needed
  //     } catch (error) {
  //       console.error('Error fetching property:', error);
  //       setLoading(false); // Set loading to false in case of an error
  //       // Handle errors
  //     }
  //   };

  //   fetchProperty();
  // }, [propertyId]);

  // useEffect(() => {
  //   // Fetch property details and property images concurrently
  //   const fetchData = async () => {
  //     try {
  //       const [propertyResponse, imagesResponse] = await Promise.all([
  //         axios.get(`/api/property/getPropertyById/${propertyId}`),
  //         axios.get(`/api/property/getPropertyImagesById/${propertyId}`),
  //       ]);

  //       setProperty(propertyResponse.data.data);
  //       setPropertyImages(imagesResponse.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setLoading(false);
  //       // Handle errors
  //     }
  //   };

  //   fetchData();
  // }, [propertyId]);

  useEffect(() => {
    // Fetch property details
    const fetchPropertyData = async () => {
      try {
        const propertyDetails = await fetchPropertyDetails(propertyId);
        setProperty(propertyDetails);

        // Fetch property images
        const images = await fetchPropertyImages(propertyId);
        setPropertyImages(images);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Handle errors
      }
    };

    fetchPropertyData();
    const fetchLatestBlogs = async () => {
      try {
        const response = await axios.get("/api/property/blogs/all");
        if (response.data.success) {
          setLatestBlogs(response.data.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };
    fetchLatestBlogs();
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const handleTop = () => {
      window.scrollTo(0, 0);
    };
    handleTop();
  }, [propertyId]);

  // const iframeCode = property?.property_location;
  // const srcRegex = /src="([^"]+)"/;
  // const match = iframeCode?.match(srcRegex);

  // // Declare srcValue here
  // let srcValue;

  // if (match) {
  //   // Assign the value to srcValue
  //   srcValue = match[1];
  //   console.log(srcValue);
  // } else {
  //   console.error('No src attribute found in the iframe code.');
  // }

  console.log(propertyImages);
  console.log(property);

  return (
    <Container>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div>
        <div className="nav1">
          <StickyNavbar />
        </div>
        <div className="nav2">
          <NavbarMob />{" "}
        </div>
        {loading ? (
          // Loading...
          // placeholder when load the page
          <div class="card" aria-hidden="true">
            <img
              src={placeholder_img}
              class="card-img-top"
              style={{ maxWidth: "100vw", maxHeight: "70vh" }}
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title placeholder-glow">
                <span class="placeholder col-6"></span>
              </h5>
              <p class="card-text placeholder-glow">
                <span class="placeholder col-7"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-4"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-8"></span>
              </p>
              <a
                href="#"
                tabindex="-1"
                class="btn btn-primary disabled placeholder col-6"
              ></a>
            </div>
          </div>
        ) : (
          <>
            <div className="container mt-5">
              <div className="row">
                <div className="col-12 mt-4">
                  <small>
                    {" "}
                    <span className="text-muted text-capitalize">
                      {`All You Need To Know About ${property?.property_name}`}{" "}
                    </span>
                  </small>
                  <h3 className="mt-3 text-capitalize">
                    {property?.property_name}
                  </h3>
                  <div className="d-lg-flex gap-3 justify-content-start">
                    <span className="text-muted text-capitalize">
                      <FaLocationDot /> {property?.property_address}
                    </span>{" "}
                    <h4 className="me-2 text-info">
                      <FaRupeeSign /> {property?.price}
                    </h4>
                  </div>

                  {/* carousel for property images */}

                  {/* {
            propertyImages&& propertyImages?.length>0 ? (
              <>
              <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                {propertyImages &&
                  propertyImages?.map((image, index) => (
                    <button
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                      key={index}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
              </div>
              <div className="carousel-inner" id="carousel-inner">
                {propertyImages &&
                  propertyImages?.map((image, index) => (
                    <div key={image?.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={image?.image} className="d-block img-fluid mx-auto zoomable-image" onClick={toggleFullScreen}  alt="propertyImages" />
                     
                    </div>
                  ))}
              </div>
            
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            </>
            )
            :
            <img src={placeholder_img} className="d-block img-fluid mx-auto" alt="Placeholder" style={{ maxWidth: "100%", maxHeight: "70vh" }} />
           }   */}

                  {/* {propertyImages && propertyImages?.length > 0 ? (
  <Carousel id="carouselExampleIndicators" interval={null}>
    {propertyImages?.map((image, index) => (
      <Carousel.Item key={image?.id} active={index === 0}>
        <img
          src={image?.image}
          className="d-block img-fluid mx-auto zoomable-image"
          onClick={toggleFullScreen}
          alt={`Slide ${index + 1}`}
        />
      </Carousel.Item>
    ))}
  </Carousel>
) : (
  <img src={placeholder_img} className="d-block img-fluid mx-auto" alt="Placeholder" style={{ maxWidth: "100%", maxHeight: "70vh" }} />
)} */}

                  {propertyImages && propertyImages?.length > 0 ? (
                    <>
                      <Carousel
                        id="carouselExampleIndicators"
                        interval={null}
                        className="custom-carousel-transition"
                      >
                        {propertyImages?.map((image, index) => (
                          <Carousel.Item
                            key={image?.id}
                            active={index === 0}
                            onClick={() => setLightboxOpen(true)}
                            className="carousel-inner"
                          >
                            <img
                              src={image?.image}
                              className="d-block img-fluid mx-auto zoomable-image"
                              alt={`Slide ${index + 1}`}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>

                      {lightboxOpen && (
                        <div className="lightbox-fullscreen">
                          <Lightbox
                            mainSrc={propertyImages[photoIndex]?.image}
                            nextSrc={
                              propertyImages[
                                (photoIndex + 1) % propertyImages?.length
                              ]?.image
                            }
                            prevSrc={
                              propertyImages[
                                (photoIndex + propertyImages?.length - 1) %
                                  propertyImages?.length
                              ]?.image
                            }
                            onCloseRequest={() => setLightboxOpen(false)}
                            onMovePrevRequest={() =>
                              setPhotoIndex(
                                (photoIndex + propertyImages?.length - 1) %
                                  propertyImages.length,
                              )
                            }
                            onMoveNextRequest={() =>
                              setPhotoIndex(
                                (photoIndex + 1) % propertyImages?.length,
                              )
                            }
                          />
                          {/* Optional: Close button or any other elements inside the lightbox */}
                          <div
                            className="close-button"
                            onClick={() => setLightboxOpen(false)}
                          >
                            ×
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <img
                      src={placeholder_img}
                      className="d-block img-fluid mx-auto"
                      alt="Placeholder"
                      style={{ maxWidth: "100%", maxHeight: "70vh" }}
                    />
                  )}
                </div>
              </div>

              <div className="row">
                {property?.property_video && (
                  <div className="text-center mt-3">
                    <a href={`${property?.property_video}`} target="blank">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-outline-secondary "
                      >
                        View Property Video
                      </button>
                    </a>
                  </div>
                )}

                <div className="col-12 col-lg-8 mt-5">
                  Share :
                  <FacebookShareButton url={currentUrl}>
                    <FacebookIcon round className="icons" />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton url={currentUrl}>
                    <FacebookMessengerIcon round className="icons" />
                  </FacebookMessengerShareButton>
                  <WhatsappShareButton url={currentUrl}>
                    <WhatsappIcon round className="icons" />
                  </WhatsappShareButton>
                  <TelegramShareButton url={currentUrl}>
                    <TelegramIcon round className="icons" />
                  </TelegramShareButton>
                  <TwitterShareButton url={currentUrl}>
                    <XIcon round className="icons" />{" "}
                  </TwitterShareButton>
                  <h5 className="">PROPERTY DETAILS</h5>
                  <div className="row mt-3 property-detail">
                    <div className="col-4">
                      <span className="d-block">Property Id</span>
                      <span className="fw-semibold">{property?.id}</span>
                    </div>
                    <div className="col-4">
                      <span className="d-block">Type</span>
                      <p className="fw-semibold text-capitalize">
                        {property?.property_type}
                      </p>
                    </div>
                    {property?.property_type === "commercial" && (
                      <div className="col-4">
                        <span className="d-block">
                          Commercial Property Type
                        </span>
                        <p className="fw-semibold text-capitalize">
                          {property?.commercial_property_type}
                        </p>
                      </div>
                    )}
                    <div className="col-4">
                      <span className="d-block">Property For</span>
                      <p className="fw-semibold text-capitalize">
                        {property?.property_for}
                      </p>
                    </div>

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.property_type == "commercial"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Number of BHK</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.bhk}
                        </p>
                      </div>
                    )}

                    {property?.property_for == "sale" && (
                      <div className="col-4">
                        <span className="d-block">New/Resale</span>
                        <span className="fw-semibold text-capitalize">
                          {property?.new_resale}
                        </span>
                      </div>
                    )}
                    {property?.property_for == "sale" && (
                      <div className="col-4">
                        <span className="d-block">TNCP Approved</span>
                        <span className="fw-semibold text-capitalize">
                          {property?.tncp}
                        </span>
                      </div>
                    )}
                    {property?.property_for == "sale" && (
                      <div className="col-4">
                        <span className="d-block">RERA Number</span>
                        <span className="fw-semibold text-capitalize">
                          {property?.rera}
                        </span>
                      </div>
                    )}
                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.property_type == "commercial"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Structure</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.structure}
                        </p>
                      </div>
                    )}
                    <div className="col-4">
                      <span className="d-block">Square Feet</span>
                      <p className="fw-semibold text-capitalize">{`${property?.square_ft} Sq.Ft.`}</p>
                    </div>
                    <div className="col-4">
                      <span className="d-block">Dimention</span>
                      <p className="fw-semibold text-capitalize">
                        {property?.dimension}
                      </p>
                    </div>
                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Car Parking</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.car_parking}
                        </p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.property_type == "commercial"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Modular Kitchen</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.modularKitchen}
                        </p>
                      </div>
                    )}
                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Year Built</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.year_built}
                        </p>
                      </div>
                    )}
                    <div className="col-4">
                      <span className="d-block">Facing</span>
                      <p className="fw-semibold text-capitalize">
                        {property?.facing}
                      </p>
                    </div>
                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Furnishing</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.furnishing}
                        </p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.property_type == "commercial"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Carpet Area</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.carpet_area}
                        </p>
                      </div>
                    )}
                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.property_type == "commercial"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Bathroom</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.bathroom}
                        </p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Property On Floor</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.property_on_floor}
                        </p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Flooring</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.flooring}
                        </p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Age of Property</span>
                        <p className="fw-semibold text-capitalize">{`${property?.age_of_property} years`}</p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.property_type == "commercial"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Parking</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.parking}
                        </p>
                      </div>
                    )}

                    {!(
                      property?.property_type == "plot" ||
                      property?.property_type == "land" ||
                      property?.property_type == "farmLand" ||
                      property?.commercial_property_type == "commercial plot" ||
                      property?.commercial_property_type == "commercial land"
                    ) && (
                      <div className="col-4">
                        <span className="d-block">Lift</span>
                        <p className="fw-semibold text-capitalize">
                          {property?.lift}
                        </p>
                      </div>
                    )}
                  </div>
                  <h5 className="mt-3">ABOUT PROPERTY</h5>
                  <p className="text-muted about-property text-capitalize">
                    {property?.property_description}
                  </p>
                  <div className="row">
                    <div className="col-12 special-highlights">
                      <h5 className="mt-3">SPECIAL HIGHLIGHTS :</h5>

                      <ul className="list p-0">
                        {property?.common_visitor_parking == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Good No. of
                              Common/Visitor Parking
                            </p>
                          </li>
                        )}
                        {property?.main_road_facing == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Main Road Facing
                            </p>
                          </li>
                        )}

                        {property?.good_ceiling_height == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Good Ceiling Height
                            </p>
                          </li>
                        )}
                        {property?.good_natural_light == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Good Natural Light in
                              the unit
                            </p>{" "}
                          </li>
                        )}
                        {property?.attractive_entrance_gate == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Attractive entrance
                              gate
                            </p>{" "}
                          </li>
                        )}
                        {/* { property.(<li><p><PiArrowFatLineRightFill /> Secured compound wall</p>  </li>)} */}
                        {property?.gated_community == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Gated community
                            </p>{" "}
                          </li>
                        )}
                        {property?.property_for == "sale" &&
                          property?.immediate_possession == 1 && (
                            <li>
                              <p>
                                <PiArrowFatLineRightFill /> Immediate possession
                              </p>{" "}
                            </li>
                          )}
                        {/* {property. ( <li><p><PiArrowFatLineRightFill /> Peaceful & Pollution free environment.</p>  </li>)} */}
                        {property?.landscape_garden == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Landscape Garden
                            </p>{" "}
                          </li>
                        )}
                        {property?.water_supply_24_7 == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> 24/7 Water Supply
                            </p>{" "}
                          </li>
                        )}
                        {property?.bore_well_water_24_7 == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> 24/7 Bore Well Water
                            </p>{" "}
                          </li>
                        )}
                        {property?.environment_clearance_available == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Environment Clearance
                              Available
                            </p>{" "}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-12 amenities">
                      <h5 className="mt-5">AMENITIES :</h5>
                      <div className="row mt-3">
                        {property?.swimming_pool == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Swimming Pool
                            </p>
                          </div>
                        )}

                        {property?.fall_ceiling == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Fall Ceiling
                            </p>
                          </div>
                        )}

                        {property?.wallpaper == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Wallpaper
                            </p>
                          </div>
                        )}

                        {property?.lights == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Lights
                            </p>
                          </div>
                        )}

                        {property?.fans == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Fans
                            </p>
                          </div>
                        )}

                        {property?.terrace == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Terrace
                            </p>
                          </div>
                        )}

                        {property?.air_conditioning == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Air Conditioning
                            </p>
                          </div>
                        )}

                        {property?.cable_tv == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Cable TV
                            </p>
                          </div>
                        )}

                        {property?.balcony == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Balcony
                            </p>
                          </div>
                        )}

                        {property?.internet == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Internet
                            </p>
                          </div>
                        )}

                        {property?.computer == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Computer
                            </p>
                          </div>
                        )}

                        {property?.dishwasher == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Dishwasher
                            </p>
                          </div>
                        )}

                        {/* {property?.near_green_zone==1 && ( <div className="col-4">
              <p><PiArrowFatLineRightFill />  Near Green Zone</p>
                  
              </div>)} */}

                        {property?.near_temple == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Near Temple
                            </p>
                          </div>
                        )}

                        {property?.activity_area == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Activity Area
                            </p>
                          </div>
                        )}
                        {property?.security_24_7 == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> 24/7 Security
                            </p>
                          </div>
                        )}

                        {property?.road == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Road
                            </p>
                          </div>
                        )}
                        {property?.drainage == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Drainage
                            </p>
                          </div>
                        )}
                        {property?.roadLight == 1 && (
                          <div className="col-4">
                            <p>
                              <PiArrowFatLineRightFill /> Road Light{" "}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 recommended">
                      <h5 className="mt-3">RECOMMENDED :</h5>
                      <ul className="list p-0 ">
                        {property?.long_term_investment == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Long term investment
                            </p>{" "}
                          </li>
                        )}
                        {property?.own_purpose == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Own purpose
                            </p>{" "}
                          </li>
                        )}
                        {property?.investment == 1 && (
                          <li>
                            <p>
                              <PiArrowFatLineRightFill /> Investment
                            </p>{" "}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  {/* 
              <div className="row ">
                <div className="col-12 ">
                <h5 className="mt-5">LOCATION</h5>

                <div className="map-container border border-primary rounded mt-3">
              
                <iframe className="map" src={srcValue}   allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              
               
                   </div>                 
                </div>
              </div> */}
                </div>
                <div className="col-12 col-lg-4 mt-5 ">
                  {/* <div className="text-center mb-3">         
        <button type="button" className="btn btn-outline-secondary ">
        View Property Video
      </button>

      </div>  */}

                  <ContactUsModel
                    propertyId={propertyId}
                    propertyName={property?.property_name}
                  />

                  <div className="row d-flex justify-content-center mt-5">
                    <div className="col-12">
                      <h5 className="mb-3">Interesting Blogs</h5>
                      {latestBlogs.length === 0 ? (
                        <p className="text-muted small">No blogs available.</p>
                      ) : (
                        latestBlogs.map((blog) => (
                          <div className="card mb-3" style={{ border: "none" }} key={blog.id}>
                            <div className="row g-0 d-flex align-items-center">
                              <div className="col-md-4 mt-2">
                                <Link to={`/blog/${blog.slug}`}>
                                  <img 
                                    src={blog.image || 'https://via.placeholder.com/150x100?text=Blog'} 
                                    className="img-fluid rounded" 
                                    alt={blog.title}
                                    style={{ width: '100%', height: '65px', objectFit: 'cover' }}
                                  />
                                </Link>
                              </div>
                              <div className="col-md-8">
                                <div className="card-body py-0 px-0 px-sm-3">
                                  <p className="card-text d-inline mb-1">
                                    <small className="text-muted"><BiCategoryAlt className="me-1" />{blog.category}</small>
                                  </p>
                                  <Link style={{ textDecoration: 'none' }} to={`/blog/${blog.slug}`}>
                                    <h6 className="card-title mb-0 text-dark fw-bold" style={{ fontSize: '0.88rem', lineHeight: '1.3' }}>{blog.title}</h6>
                                  </Link>
                                  <p className="card-text mb-0">
                                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                      {new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}




                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-12"></div>

                <RelatedProperty
                  propertyType={property?.property_type}
                  propertyFor={property?.property_for}
                  propertyId={property?.id}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default SingleProperty;

const Container = styled.div`
  .custom-carousel-transition .carousel-inner {
    transition: transform 0.2s ease-in-out; /* Adjust the duration as needed */
  }
  .lightbox-fullscreen {
    position: fixed;
    top: 10%;
    right: 5%;

    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lightbox-fullscreen .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
    cursor: pointer;
    font-size: 30px;
  }
  .nav1 {
    display: block;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .nav2 {
    display: none;
    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
  /* CSS Styles for Zooming */
  .zoomable-image {
    cursor: zoom-in;
    transition: transform 0.3s ease-in-out;
  }

  .zoomed-image {
    cursor: zoom-out;
    transform: scale(1.5); /* Adjust the scale factor for zoom level */
  }

  .carousel-inner {
    /* height: 100vh; */
    overflow: hidden;
    background-color: #eaebed;
  }

  .carousel-item {
    @media only screen and (max-width: 1025px) {
      img {
        /* width: 100%;
      height: 100%; */
        max-width: 100%;
        height: 70vh;
      }
    }
    @media only screen and (min-width: 1025px) {
      img {
        object-fit: cover;
        /* width: 100%;
        height: 100%; */
        max-width: 150%;
        height: 100vh;
      }
    }
  }
  .list {
    list-style: none;
  }

  .map-container {
    position: relative;
    overflow: hidden;
    max-width: 100%;
    height: 0;
    padding-bottom: 56.25%; // 16:9 aspect ratio (adjust as needed)
  }

  .map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 768px) {
    .map-container {
      padding-bottom: 75%; // Adjust the aspect ratio for smaller screens
    }
  }
  .property-detail {
    font-size: small;
  }
  .special-highlights {
    font-size: 13px;
  }
  .about-property {
    font-size: 15px;
  }
  .recommended {
    font-size: 13px;
  }
  .other-feature {
    font-size: small;
  }
  .amenities {
    font-size: 13px;
  }
  .icons {
    width: 30px;
    height: 30px;
    margin: 5px;
    @media only screen and (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`;
