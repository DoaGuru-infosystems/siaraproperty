import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import Search from "../components/Search";
import RecentlyPosted from "../components/RecentlyPosted";
import Suggestions from "../components/Suggestions";
import MostViewed from "../components/MostViewed";
import Poshhouse from "../components/Poshhouse";
import Pricedrop from "../components/Pricedrop";
import Luxuaryhouse from "../components/Luxuaryhouse";


import axios from "axios";
import CommercialProperty from "../components/CommercialProperty";
import RentProperty from "../components/RentProperty";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";

export default function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [properties, setProperties] = useState([]);
  const [propertiesImages, setPropertiesImages] = useState([]);
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);
  console.log(canonicalUrl);

  const getAllPropeties = async () => {
    const response = await axios.get(
      "/api/property/getAllProperty",
    );
    setProperties(response.data);
  };
  const getAllPropetiesImages = async () => {
    const response = await axios.get(
      "/api/property/getAllPropertyImages",
    );
    setPropertiesImages(response.data);
  };

  // useEffect( ()=>{
  //    getAllPropeties()
  //    getAllPropetiesImages()

  // },[])
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const handleTop = () => {
      window.scrollTo(0, 0);
    };
    handleTop();
  }, []);

  console.log(window.location.pathname);

  return (
    <Wrapper>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className="nav1">
        
      </div>
      <div className="nav2">
        {" "}
      </div>
      <div>
        <div className="container-fluid">
          <div className="bannerdiv">
            <Banner />
          </div>

          <Search />

          <section className="mx-2">
            <div className="">
              <div>
                <section className="p-md-3">
                  <RecentlyPosted />
                  <RentProperty />
                  <Suggestions />
                  <MostViewed />
                  <Poshhouse />
                  <CommercialProperty />
                  <Pricedrop />
                  <Luxuaryhouse />
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .nav-tabs {
    border-bottom: none; /* Remove the bottom border */
  }
  .nav-tabs .nav-item .nav-link {
    border: none;
    color: black;
  }
  .nav-tabs .nav-item .nav-link.active {
    color: #712cf9;
    font-weight: bold;
  }

  #search-box {
    border: none;
  }
  #search-box:focus {
    outline: none;
  }

  #mySelect {
    outline: 0px;
    border: 0px;
  }
  #budget {
    outline: 0px;
    border: 0px;
  }
  // -----------------------End------------------------------
  // For Different screens

  .container-fluid {
    padding: 0;
    @media only screen and (max-width: 768px) {
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

  .bannerdiv {
    position: relative;
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
`;
