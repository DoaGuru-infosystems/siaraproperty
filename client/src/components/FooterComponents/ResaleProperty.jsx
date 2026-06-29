import React, { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";
import styled from "styled-components";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "../responsive";
import CarouselPlaceholder from "../CarouselPlaceholder"
import { FaRupeeSign } from "react-icons/fa";
import StickyNavbar from "../Navbar";
import NavbarMob from "../NavbarMob";
import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import ReactGA from "react-ga4";
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';


export default function ResaleProperty() {
 

  const [properties, setProperties] = useState(null);
  const [propertiesImages, setPropertiesImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const { propertyType } = useParams();
  const location = useLocation();
  const canonicalUrl = 'https://bharatroofers.com' + location.pathname;

  const getAllProperties = async () => {
    try {
      const response = await axios.get(`https://bharatroofers.com/api/property/getPropertyForResaleByType/${propertyType}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  const getAllPropertiesImages = async () => {
    try {
      const response = await axios.get('https://bharatroofers.com/api/property/getAllPropertyImages');
      setPropertiesImages(response.data);
    } catch (error) {
      console.error('Error fetching property images:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  }

  useEffect(() => {
    getAllProperties();
    getAllPropertiesImages();
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  console.log(properties);
  console.log(propertiesImages);

  return (
    <Wrapper>
       <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
       
        <div className="nav1"><StickyNavbar  /></div>
          <div className="nav2"><NavbarMob /> </div>
         
       
      <div className="mb-4 mt-5 pt-5">
      
        <h3 className="post-heading fw-semibold mb-3 ms-lg-3">
        <p className="text-uppercase text-center">Available {`${propertyType}s`} For Resale</p>
        </h3>
        

        {loading ? (
          // <p>Loading...</p>
              <CarouselPlaceholder/>
        ) : (

        // Render the component only if data is available
        
        properties && properties.data && properties.data.length > 0 ? (
            <div className="container-fluid">
          <div className="row cardBox">
           
              
              {properties.data.map((property) => {
                const matchingImages = propertiesImages?.data.filter(
                  (image) => image.property_id == property.id
                );
                const imageSrc = matchingImages && matchingImages.length  > 0  ? matchingImages[0].image : null;
                console.log(imageSrc)
                return (
                  <div className="col-lg-4 col-md-6 col-12 mb-4" key={property.id}>
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                      <Link to={`/property/${property.id}`}>
                        <img src={imageSrc ? imageSrc : "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg?t=st=1701323109~exp=1701326709~hmac=da85cae6601708a5416a585b78ba630517ba8a0b698f72df228ae5ae10f58c58&w=900" } className="card-img-top" alt={`Property ${property.id}`} />
                      </Link>
                      <div className="card-body address">
                        <p className="card-text d-inline text-capitalize">
                          <span className="fs-5"><FaLocationDot /></span> {property.property_address}
                        </p>
                        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none' }}>
                          <h5 className="card-title mt-2 text-capitalize">{property.property_name}</h5>
                        </Link>
                        <h5 className="card-text"><FaRupeeSign />{property.price}</h5>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            <span className="fs-5"><CgCalendarDates /></span>  posted on : {moment(property.created_at).fromNow()} 
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            
          </div>
          </div>
        ):(
          // Display a message when no data is available
          <div className="no-data">
          <h5 className="text-center">Not available</h5>
          </div>
        )
        )}
      </div>
    </Wrapper>
  );
}



const Wrapper = styled.div`
.address{
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: nowrap;
  
}
.nav1{
    display: block;
    @media screen and (max-width: 1000px) {
   
    display: none;
    
  }
}
  .nav2{
    display: none;
    @media screen and (max-width: 1000px) {
   
   display: block;
   
 }
   
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
.card{
    border: none;
    margin: 1rem;
    
    
    
    img{
        border-radius: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;
        height: 12rem;
        
        
       
        
    }
    img:hover{
             transform: scale(1.09);
        }
    
    .card-body{
        padding-left: 0;
        padding-right: 0;
        
      

    }
}
.no-data{
    height: 50vh;
}
    
`;
