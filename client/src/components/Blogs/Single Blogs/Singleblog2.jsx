import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../Navbar";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog2 from "../../../images/blog2.avif";
import NavbarMob from "../../NavbarMob";
import ReactGA from "react-ga4";
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';


function Singleblog2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const canonicalUrl = 'https://bharatroofers.com' + location.pathname;
 
  useEffect(()=>{
    const handleTop = () => {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname });
      window.scrollTo(0, 0);
    };
    handleTop();
  },[])
  return (
    <>
      <Container>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className="nav1"><Navbar  isScrolled={isScrolled} /></div>
          <div className="nav2"><NavbarMob /> </div>
        <div className="container mt-5">
          <div className="row p-4 heading">
            <div className="col-12 text-center mt-4">
              <p className="card-text d-inline p-4">
                <span className="fs-5">
                  <i class="bi bi-file-post"></i>
                </span>
                Blog
              </p>
              <h1 className="">
                New Construction vs. Resale Homes: Making the Right Choice for
                Your Next Property
              </h1>
              <p className="card-text">
                <small className="text-body-secondary">
                  {" "}
                  <span className="fs-5">
                    <CgCalendarDates />
                  </span>{" "}
                  AUGUST 24, 2022
                </small>
              </p>
            </div>
          </div>

          <div className="row mt-4 ">
            <div className="col-12">
              <img className="img-fluid images" src={blog2} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-5 ">
              <h4>
                In the quest for a new home, buyers often face the dilemma of
                choosing between new construction and resale properties. Each
                option comes with its own set of advantages and drawbacks,
                making the decision a crucial one in the home-buying journey.
              </h4>
            </div>

            <div className="col-12">
              <h3 className="mt-5">
                Pros and Cons of Buying New Construction Homes:-
              </h3>
              <h4>Pros:</h4>

              <h5 className="subtitle mt-4">
                Benefits of Customization and Modern Features:
              </h5>
              <p className="Content text-secondary lh-lg ">
                When you opt for a construction home, you can customize it
                according to your preferences. You can have a say in everything
                from the layout to the finishes, making it your dream home.
              </p>
              <h5 className="subtitle mt-4">
                Energy Efficiency for Savings and Sustainability:{" "}
              </h5>
              <p className="Content text-secondary lh-lg ">
                These built homes are equipped with energy-efficient
                technologies. This not only helps you save on utility bills but
                also reduces your carbon footprint contributing to the
                environment.
              </p>

              <h5 className="subtitle mt-4">
                Warranty and Ease of Maintenance:{" "}
              </h5>
              <p className="Content text-secondary lh-lg ">
                Builders usually provide warranties that cover components of the
                home for a period. Moreover, new homes generally require
                maintenance compared to older properties allowing you to enjoy
                worry-free living.
              </p>

              <h5 className="subtitle mt-4">Enhanced Community Living:</h5>
              <p className="Content text-secondary lh-lg ">
                Many new construction neighborhoods offer an array of amenities,
                like parks, pools, and gyms. These amenities foster a sense of
                community where residents can come together and enjoy shared
                spaces.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Cons:</h4>

              <h5 className="subtitle mt-4">Higher Price Tag:</h5>
              <p className="Content text-secondary lh-lg ">
                New construction homes often come at a premium compared to
                similar-sized resale properties in the same area.
              </p>
              <h5 className="subtitle mt-4">
              Completion Time: 
              </h5>
              <p className="Content text-secondary lh-lg ">
              Construction delays are possible, leading to extended wait times before moving in.
              </p>

              <h5 className="subtitle mt-4">
              Restricted Character and Mature Landscaping: 
              </h5>
              <p className="Content text-secondary lh-lg ">
              Recently assembled homes could lack the unique charm and laid-out finishing viewed as in more established, resale properties.

              </p>

              <h5 className="subtitle mt-4">Potential for Unknown Development: </h5>
              <p className="Content text-secondary lh-lg ">
              Purchasing in another space could mean vulnerability about future improvements that could affect your way of life or property estimation.

              </p>
            </div>
          </div>
          <div className="row">
           

            <div className="col-12">
              <h3 className="mt-5">
              Pros and Cons of Buying Resale Homes:-
              </h3>
              <h4>Pros:</h4>

              <h5 className="subtitle mt-4">
              Established neighborhoods:
              </h5>
              <p className="Content text-secondary lh-lg ">
              Resale houses are typically located in established communities, with grown trees beautifully landscaped surroundings, and a strong sense of community.

              </p>
              <h5 className="subtitle mt-4">
              Price bargaining: 
              </h5>
              <p className="Content text-secondary lh-lg ">
              When it comes to resale homes there is usually flexibility to negotiate the price compared to constructed properties.

              </p>

              <h5 className="subtitle mt-4">
              Charm and history: 
              </h5>
              <p className="Content text-secondary lh-lg ">
              Older homes often showcase one-of-a-kind elements and carry a rich historical background that adds allure and character.

              </p>

              <h5 className="subtitle mt-4">Immediate move-in:</h5>
              <p className="Content text-secondary lh-lg ">
              Unlike constructions, resale homes are typically ready for occupancy, after the purchase.

              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Cons:</h4>

              <h5 className="subtitle mt-4">Potential Maintenance: </h5>
              <p className="Content text-secondary lh-lg ">
              Older houses may need repairs or renovations, in the future, which can increase the overall expenses
              </p>
              <h5 className="subtitle mt-4">
              Outdated Systems and Energy Inefficiency:
              </h5>
              <p className="Content text-secondary lh-lg ">
              These homes might need energy features and could have older systems that would benefit from upgrades.

              </p>

              <h5 className="subtitle mt-4">
              Limited Personalization: 
              </h5>
              <p className="Content text-secondary lh-lg ">
              Unlike constructed properties, there might be limitations, in customizing owned homes according to your specific preferences.

              </p>

              <h5 className="subtitle mt-4">Chance of Competitive Offers:</h5>
              <p className="Content text-secondary lh-lg ">
              In competitive markets buying a resale home could potentially result in bidding wars driving up the final cost.


              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h4 className="mt-4">FAQ’s</h4>
              <h5 className="subtitle mt-4">
              1. Which option tends to increase in value over time?

              </h5>
              <p className="Content text-secondary lh-lg mx-3">
              The appreciation, in value relies on factors, such as the location, market trends and the overall condition and appeal of the property.

              </p>
              <h5 className="subtitle mt-4">
              2. Is it possible to negotiate the price of a built home?

              </h5>
              <p className="Content text-secondary lh-lg mx-3">
              While there may be some room for negotiation builders typically have flexibility when it comes to pricing compared to sellers of pre-owned properties.

              </p>

              <h5 className="subtitle mt-4">
              3. Are constructed homes more energy efficient?

              </h5>
              <p className="Content text-secondary lh-lg mx-3">
              In general constructed homes are designed with energy efficiency in mind; however, existing homes can also be retrofitted with energy-saving features.

              </p>

              <h5 className="subtitle mt-4">
              4. Which option is more favorable for investment purposes?

              </h5>
              <p className="Content text-secondary lh-lg mx-3">
              Both built homes and pre-owned properties have the potential to yield profits as investments. Conducting market research and understanding your investment goals are essential, in making a decision.

              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Singleblog2;

const Container = styled.div`
  .heading {
    border-bottom: 1px solid #d8d2d2;
  }
  .images {
    /* @media only screen and (min-width: 768px) {
      width: 1160px;
      height: 462px;
      border-radius: 10px;
    } */
    border-radius: 10px;
    width: 100%;
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
`;
