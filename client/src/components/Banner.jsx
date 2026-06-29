// import React from "react";
// import styled from "styled-components";

// export default function Banner() {
//   return (
//     <>
//       <Wrapper>
//         <section id="banner" className="banner">
//           <div className="card">
//             <img
//               src="https://res.cloudinary.com/dsujv9zbq/image/upload/v1698824602/3d-rendering-house-model_phslke.jpg"
//               className="card-img rounded-0"
//               alt="banner.jpg"
//             />
//             <div className="card-img-overlay">
//               <div className="d-flex align-items-center justify-content-center h-100">
//                 <h1 className="text-light fw-bold banner-heading">
//                   Find your home with people you trust
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </section>
//       </Wrapper>
//     </>
//   );
// }

// const Wrapper = styled.div`
//   .banner-heading {
//     font-size: 50px;
//     word-spacing: 5px;
//     @media screen and (max-width: 620px) {
//       font-size: 20px;
//       text-align: center;
//     }
//     @media only screen and (min-width: 620px) and (max-width: 768px) {
//       font-size: 30px;
//       text-align: center;
//     }
//     @media screen and (min-width: 768px) and (max-width: 1024px) {
//       font-size: 35px;
//     }
//     @media screen and (min-width: 1024px) and (max-width: 1600px) {
//       font-size: 40px;
//     }
//   }

//   h1 {
//     box-shadow: inset 1px 1px 125px #2f2525;
//     padding: 1rem;
//     border-radius: 1rem;
//   }

// `;


import React from "react";
import styled from "styled-components";
import Background_Computer from "../images/Background-Computer.webp"
import Background_Tab from "../images/Background-Tab.jpg"
import Background_Mobile from "../images/Background-Mobile.jpg"

export default function Banner() {
  return (
    <>
      <Wrapper>
        <section id="banner" className="banner">
          <div className="card">
            <img
              src={Background_Computer}
              className="card-img rounded-0"
              alt="banner.jpg"
            />
            <div className="card-img-overlay">
              <div className="d-flex align-items-center justify-content-center h-100">
                <h1 className="text-light fw-bold banner-heading text-uppercase">
Find Your Homes                </h1>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`

*{
    margin: 0;
    padding: 0;
}
.card{
  width: 100%;
    height: 100vh;
    background-image: url(${Background_Computer});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: table;

    @media only screen and (min-width: 768px) and (max-width: 1025px) {
      
      background-image:url(${Background_Tab});
      
        /* width: 100%;
        height: 100%; */     
    }  
    img{
       display: none;
      @media only screen and  (max-width: 767px){ 
        display: block;
        height:50vh;
    }
    }
    @media only screen and  (max-width: 767px){ 
      background-image: url();
      height:0;
      
     
      
      
  
      
    }
    
}
.banner{
  overflow: hidden;
 
}


   
   

  .banner-heading {
    font-size: 50px;
    word-spacing: 5px;
    @media screen and (max-width: 620px) {
      font-size: 20px;
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

  h1 {
    box-shadow: inset 1px 1px 125px #2f2525;
    padding: 1rem;
    border-radius: 1rem;
  }

`;