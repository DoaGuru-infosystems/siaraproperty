import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../Navbar";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog1 from '../../../images/blog1.avif'
import NavbarMob from "../../NavbarMob";
import ReactGA from "react-ga4";
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';


function Singleblog1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const canonicalUrl = 'https://bharatroofers.com' + location.pathname;
  useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const handleTop = () => {
      window.scrollTo(0, 0);
    };
    handleTop();
  },[])
  console.log(window.location.pathname);
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
                The Critical Role of Home Inspections: A Buyer's Guide to
                Informed Decisions
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
              <img
                className="img-fluid images"
                src={blog1}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-5 ">
              <h4>
                Buying a house is an investment. It's important to make sure
                that the property you're interested, in is not only visually
                appealing but also structurally sound. This is where home
                inspections become crucial in the process of buying a home.
              </h4>
            </div>

            <div className="col-12">
              <h4 className="mt-5">Understanding Home Inspections:-</h4>
              <h5 className="subtitle mt-4">1. Revealing Hidden Problems:</h5>
              <p className="Content text-secondary lh-lg mx-3">
                Home inspections are assessments carried out by certified
                inspectors to evaluate the condition of a property. They uncover
                issues that may not be easily noticeable during a walkthrough,
                such as structural problems, electrical issues, plumbing
                concerns, and more.
              </p>
              <h5 className="subtitle mt-4">2. Making Informed Decisions:</h5>
              <p className="Content text-secondary lh-lg mx-3">
                With the insights provided by an inspection report, buyers gain
                an understanding of the condition of the property. This
                knowledge empowers them to make decisions, about whether to
                proceed with the purchase negotiate repairs, or even reconsider
                their decision entirely.
              </p>

              <h5 className="subtitle mt-4">3. Negotiating Advantage:</h5>
              <p className="Content text-secondary lh-lg mx-3">
                When buyers receive an inspection report that highlights issues
                it gives them an edge, in negotiation. They can use it as
                leverage to request repairs or negotiate a sale price. Sellers
                might agree to fix problems or adjust the price to account for
                repairs.
              </p>

              <h5 className="subtitle mt-4">4. Saving for the Long Run:</h5>
              <p className="Content text-secondary lh-lg mx-3">
                Although inspections come with a price tag they often result in
                long-term savings. By identifying problems, costly repairs or
                unexpected maintenance expenses can be avoided in the future.
              </p>
            </div>
          </div>
          <div className="row">
       

            <div className="col-12">
              <h4 className="mt-4">The Importance of Home Inspections for Buyers:
</h4>
              <h5 className="subtitle mt-4">Protecting Your Investment:
</h5>
              <p className="Content text-secondary lh-lg">
              Getting a home inspection is a move to protect both your investment and emotional attachment, to the property. It helps you avoid purchasing a home with expensive issues.

              </p>
              <h5 className="subtitle mt-4">Understanding the Property's Condition:
</h5>
              <p className="Content text-secondary lh-lg">
              Inspections offer an overview of the property's strengths and weaknesses providing buyers with an understanding beyond just its surface appearance.

              </p>

              <h5 className="subtitle mt-4">Ensuring Safety:
</h5>
              <p className="Content text-secondary lh-lg">
              Making sure your future home is safe is important. Inspections help identify safety hazards such as mold, radon, or faulty electrical wiring that could pose risks to the occupants.

              </p>

              <h5 className="subtitle mt-4">Planning, for Repairs or Upgrades:
</h5>
              <p className="Content text-secondary lh-lg">
              Inspection reports assist buyers in planning for repairs or upgrades allowing them to allocate funds accordingly after completing the purchase.

              </p>
              <h6 className="Content text-secondary lh-lg">Essentially, a home inspection is an important step in the home-buying process. It gives you peace of mind, protects your investment, and gives you the knowledge you need to make an informed decision about a property you are considering buying.
</h6>
            </div>
          </div>
          <div className="row">
       

       <div className="col-12">
         <h4 className="mt-4">FAQ’s

</h4>
         <h5 className="subtitle mt-4">1. How long does a typical home inspection take?

</h5>
         <p className="Content text-secondary lh-lg mx-3">
         The length of time varies depending on the size of the property, its age, and any specific areas that need to be scrutinized. An average examination can take 2-4 hours.


         </p>
         <h5 className="subtitle mt-4">2. Do I have to attend the inspection?
</h5>
         <p className="Content text-secondary lh-lg mx-3">
         Buyers are highly recommended to attend the survey. This allows them to ask questions, gain insight directly from the manager, and directly understand the condition of the property.


         </p>

         <h5 className="subtitle mt-4">3. Can a home inspection reveal all possible issues?

</h5>
         <p className="Content text-secondary lh-lg mx-3">
         Even if correct, investigations may not find any potential issues. However, they provide a comprehensive overview highlighting key areas of concern.


         </p>

         <h5 className="subtitle mt-4">4. Do I need additional specialized care?

</h5>
         <p className="Content text-secondary lh-lg mx-3">
         Depending on the property manager and findings, radon, pest, mold, architectural inspections or special inspections may be recommended.



         </p>
         
       </div>
     </div>
          
        </div>
      </Container>
    </>
  );
}

export default Singleblog1;

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
