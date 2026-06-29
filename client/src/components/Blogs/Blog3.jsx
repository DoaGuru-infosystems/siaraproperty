import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog3 from '../../images/blog3.avif'


function Blog3() {
  return (
    <>
    <Container>
    <div className="card shadow p-3 mb-5 bg-white rounded" id="cont">
   <Link to="/blogs/single-blog3" > <img  src={blog3} className="card-img-top" alt="..."/> </Link>
    <div className="card-body">
        
        <p className="card-text d-inline"><span className="fs-5"><i class="bi bi-file-post"></i></span>Blog</p>
        <Link to="/blogs/single-blog3" style={{textDecoration: 'none'}} >  <h5 className="card-title mt-2">Looking for1 BHK Apartment Duplex

</h5> </Link>
      <p className="card-text">Imagine having a cozy yet multi-level living space. That's precisely what a 1 BHK apartment duplex offers - a one-bedroom home spread across two levels, typically featuring a bedroom, a living area, and a kitchen. It's a smart fusion of compactness and practicality.


</p>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
    </div>
  </div>

  </Container>
  </>
  )


}



export default Blog3

const Container = styled.div`
.card{
    border: none;
    margin: 1rem;
    
    img{
        border-radius: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;
        height: 19.4rem;
        @media screen and (max-width: 768px) {
    height: 10rem;
  }
        @media screen and (min-width: 768px) and (max-width: 1020px) {
          height: 10rem;
        }
        
        @media screen and (min-width: 1020px) and (max-width: 1600px) {
          height: 15rem;
        }
        
    }
    img:hover{
             transform: scale(1.09);
        }
    
    .card-body{
        padding-left: 0;
        padding-right: 0;

    }
}
#cont{
  height: 37rem;
  @media screen and (max-width: 768px) {
    height: 35rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
          height: 37rem;
        }
  @media screen and (min-width: 1024px) and (max-width: 1200px) {
          height: 43rem;
        }
}
    
`;
