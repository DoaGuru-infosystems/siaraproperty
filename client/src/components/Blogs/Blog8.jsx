import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog8 from '../../images/blog8.avif'


function Blog8() {
  return (
    <>
    <Container>
    <div className="card shadow p-3 mb-5 bg-white rounded" id="cont">
   <Link to="/blogs/single-blog8" > <img  src={blog8} className="card-img-top" alt="..."/> </Link>
    <div className="card-body">
        
        <p className="card-text d-inline"><span className="fs-5"><i class="bi bi-file-post"></i></span>Blog</p>
        <Link to="/blogs/single-blog8" style={{textDecoration: 'none'}} >  <h5 className="card-title mt-2">Sale on 2-3 BHK House: Navigating the Real Estate Market



</h5> </Link>
      <p className="card-text">Real estate markets have been abuzz with the enticing prospects of buying or selling 2-3 BHK houses. As the real estate landscape continues to evolve, these properties have garnered substantial attention for their versatility.




</p>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
    </div>
  </div>

  </Container>
  </>
  )


}



export default Blog8

const Container = styled.div`
.card{
    border: none;
    margin: 1rem;
    
    img{
        border-radius: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;
        height: 15rem;
        @media screen and (max-width: 768px) {
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
  height: 33rem;
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
