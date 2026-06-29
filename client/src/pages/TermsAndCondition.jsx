import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import styled from "styled-components";
import NavbarMob from '../components/NavbarMob';
import ReactGA from "react-ga4";
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';


const TermsAndCondition = () => {
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
    <div className="nav1"><Navbar/></div>
        <div className="nav2"><NavbarMob /> </div>
        <div className="container mt-5">
      <h1 className="mb-4 mt-5 text-center">Terms and Conditions</h1>
       
      {/* Add your terms and conditions content here */}
       
      <div className="mt-5">
        
        <p className='text-secondary'>
        Welcome to bharatroofers.com! <br></br>
These terms and conditions outline the rules and regulations for the use of bharatroofers's Website, located at https://bharatroofers.com/.
<br></br>
By accessing this website we assume you accept these terms and conditions. Do not continue to use bharatroofers.com if you do not agree to take all of the terms and conditions stated on this page. <br></br>
The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of in. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.

        </p>

        {/* Add more content as needed */}
      </div>

      <div className="mt-5">
         <h5>Cookies</h5>
        <p className='text-secondary'>
        We employ the use of cookies. By accessing bharatroofers.com, you agreed to use cookies in agreement with the bharatroofers's Privacy Policy. <br></br>
Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.

        </p>

        {/* Add more content as needed */}
      </div>

      <div className="mt-5">
         
        <p className='text-secondary'>
      
        You must not:<br></br>
        •	Republish material from bharatroofers.com <br></br>
•	Sell, rent or sub-license material from bharatroofers.com <br></br>
•	Reproduce, duplicate or copy material from bharatroofers.com <br></br>
•	Redistribute content from bharatroofers.com <br></br>
This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the Free Terms and Conditions Generator.<br></br>
Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. bharat roofers does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of bharat roofers,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, bharatroofers shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.<br></br>
bharatroofers reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.<br></br>
You warrant and represent that:<br></br>
•	You are entitled to post the Comments on our website and have all necessary licenses and consents to do so; <br></br>
•	The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;<br></br>
•	The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy<br></br>
•	The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.<br></br>
You hereby grant bharatroofers a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.<br></br>




        </p>

        {/* Add more content as needed */}
      </div>

      
      <div className="mt-5">
         <h5>iFrames</h5>
        <p className='text-secondary'>
        Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.<br></br>
       
        </p>

        {/* Add more content as needed */}
      </div>
      <div className="mt-5">
         <h5>Content Liability</h5>
        <p className='text-secondary'>
        We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.<br></br>
       
        </p>

        {/* Add more content as needed */}
      </div>
      <div className="mt-5">
         <h5>Reservation of Rights</h5>
        <p className='text-secondary'>
        We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.<br></br>
       
        </p>

        {/* Add more content as needed */}
      </div>
      <div className="mt-5">
         <h5>Removal of links from our website</h5>
        <p className='text-secondary'>
        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.<br></br>
        We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
       
        </p>

        {/* Add more content as needed */}
      </div>
      <div className="mt-5">
         <h5>Disclaimer</h5>
        <p className='text-secondary'>
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:<br></br>

        •	limit or exclude our or your liability for death or personal injury; <br></br>
•	limit or exclude our or your liability for fraud or fraudulent misrepresentation;<br></br>
•	limit any of our or your liabilities in any way that is not permitted under applicable law; or<br></br>
•	exclude any of our or your liabilities that may not be excluded under applicable law.<br></br>
The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.<br></br>
As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.

        </p>

        {/* Add more content as needed */}
      </div>
    </div>
    </Container>
  </>
  )
}

export default TermsAndCondition;

const Container = styled.div`
 
  .nav1{
    display: block;
    margin-bottom: 100px;
    @media screen and (max-width: 1000px) {
    
    display: none;
    
  }
}
  .nav2{
    display: none;
  
    @media screen and (max-width: 1000px) {
   display: block;
   margin-bottom: 100px;
   
 }
   
  }
`;