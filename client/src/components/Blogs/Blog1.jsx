import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog1 from '../../images/blog1.avif'


function Blog1() {
  return (
    <>
    <Container>
    <div className="card shadow p-3 mb-5 bg-white rounded" id="cont">
   <Link to="/blogs/single-blog1" > <img  src={blog1} className="card-img-top" alt="..."/> </Link>
    <div className="card-body">
        
        <p className="card-text d-inline"><span className="fs-5"><i class="bi bi-file-post"></i></span>Blog</p>
        <Link to="/blogs/single-blog1" style={{textDecoration: 'none'}} >  <h5 className="card-title mt-2">The Critical Role of Home Inspections: A Buyer's Guide to Informed Decisions</h5> </Link>
      <p className="card-text">Buying a house is an investment. It's important to make sure that the property you're interested, in is not only visually appealing but also structurally sound. This is where home inspections become crucial in the process of buying a home.
</p>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
    </div>
  </div>

  </Container>
  </>
  )


}



export default Blog1

const Container = styled.div`
.card{
    border: none;
    margin: 1rem;
    
    img{
        border-radius: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;
        height: 19rem;
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
