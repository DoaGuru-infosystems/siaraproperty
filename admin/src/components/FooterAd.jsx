import React from "react";
import styled from "styled-components";
import { BsFacebook, BsWhatsapp, BsInstagram } from "react-icons/bs";
import { BiLogoInstagramAlt, BiLogoWhatsappSquare } from "react-icons/bi";

import logo from '../images/Makaan_logo.jpg'
import { Link } from "react-router-dom";

const FooterAd = () => {
  return (
    <>
      <Container>
        <div className="container-fluid footmain">
          <div className="p-4">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <h6 className="text-center">Popular Residential Searches</h6>
                <ul>
                  <li>Property for sale in Jabalpur</li>
                  <li>Flats in Jabalpur</li>
                  <li>Studio Apartments in Jabalpur</li>
                  <li>Resale House in Jabalpur</li>
                  <li>Property in Jabalpur</li>
                  <li>House in Jabalpur</li>
                  <li>Farm House in Jabalpur</li>
                  <li>House for Sale in Jabalpur</li>
                  <li>Plots for Sale in Jabalpur</li>
                  <li>Villas for Sale in Jabalpur</li>
                  <li>Penthouse in Jabalpur</li>
                  <li>Resale Flats in Jabalpur</li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <h6 className="text-center">Popular BHK Searches</h6>
                <ul>
                  <li>1 BHK Flats in Jabalpur</li>
                  <li>2 BHK Flats in Jabalpur</li>
                  <li>3 BHK Flats in Jabalpur</li>
                  <li>4 BHK Flats in Jabalpur</li>
                  <li>1 BHK House for Sale in Jabalpur</li>
                  <li>2 BHK House for Sale in Jabalpur</li>
                  <li>3 BHK House for Sale in Jabalpur</li>
                  <li>4 BHK House for Sale in Jabalpur</li>
                  <li>2 BHK Villa for Sale in Jabalpur</li>
                  <li>3 BHK Villa for Sale in Jabalpur</li>
                  <li>4 BHK Villa for Sale in Jabalpur</li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <h6 className="text-center">Popular Flat Searches</h6>
                <ul>
                  <li>Flats for Sale in Nagpur Road Jabalpur</li>
                  <li>Flats for Sale in Katangi Jabalpur</li>
                  <li>Flats for Sale in Maharajpur</li>
                  <li>Flats for Sale in Madan Mahal</li>
                  <li>Flats for Sale in Ranjhi</li>
                </ul>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <h6 className="text-center">Popular House Searches</h6>
                <ul>
                  <li>House for Sale in Nagpur Road Jabalpur</li>
                  <li>House for Sale in Katangi Jabalpur</li>
                  <li>House for Sale in Maharajpur</li>
                  <li>House for Sale in Madan Mahal</li>
                  <li>House for Sale in Ranjhi</li>
                </ul>
                <div className="">
                <ul>
                  <li> <img src={logo}  alt="" className=" img rounded-3" /> </li>
                  <li><h5 className="hdd mt-3 ">Follow us on</h5></li>
                  <li><div className="icon d-flex mt-3">
                    
                  <BsFacebook size={30}    onMouseOver={({ target }) =>
                        (target.style.color = "blue")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "white")
                      } />
                  <BsInstagram size={30} onMouseOver={({ target }) =>
                        (target.style.color = "red")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "white")
                      }  />
                  <Link className="text-white" to={"https://wa.me/+918839280515"}><BsWhatsapp size={30} onMouseOver={({ target }) =>
                        (target.style.color = "green")
                      }
                      onMouseOut={({ target }) =>
                        (target.style.color = "white")
                        
                    } /></Link>
                        
                </div></li>
                 
                </ul>
                 
                   
                </div>
              
              
              </div>
             
              <div>
                  <h5 className="text-white text-center">@2023 Doaguruinfosystems. All Right Reserved</h5> 
                
                </div>
            </div>
          </div>
        </div>
        {/* <div className="container-fluid">
          <div className="container pt-3 pb-3">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                <div>
                  <h5>MakanOnline</h5>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                <div>
                  <h5>@2023 Doaguruinfosystems. All Right Reserved</h5>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                <div className="d-flex justify-content-evenly">
                  <BsFacebook />
                  <BsInstagram />
                  <BsWhatsapp />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </Container>
    </>
  );
};

export default FooterAd;
const Container = styled.div`
  .footmain {
    background-color: #000;
  }

  h6 {
    color: white;
    border-bottom: 1px solid #ff7675;
    padding-bottom: 0.5rem;
  }
  ul {
    li {
      list-style-type: none;
      color: white;
    }
  }
  .img{
    height:100px;
     width:200px;
     @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 135px;
     }
  }
  .hdd{
    margin-left: 3rem;
    margin-right: 3rem;
     @media screen and (min-width: 768px) and (max-width: 1020px) {
      width: 8rem;
      margin-left: 0rem;
     }
  }
  .icon{
    gap: 3rem;
     @media screen and (min-width: 768px) and (max-width: 1020px) {
      gap: 1rem;
     }
  }
`;
