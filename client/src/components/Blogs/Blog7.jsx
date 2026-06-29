import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog7 from '../../images/blog7.avif'


function Blog7() {
  return (
    <>
    <Container>
    <div className="card shadow p-3 mb-5 bg-white rounded" id="cont">
   <Link to="/blogs/single-blog7" > <img  src={blog7} className="card-img-top" alt="..."/> </Link>
    <div className="card-body">
        
        <p className="card-text d-inline"><span className="fs-5"><i class="bi bi-file-post"></i></span>Blog</p>
        <Link to="/blogs/single-blog7" style={{textDecoration: 'none'}} >  <h5 className="card-title mt-2">Looking for a 1 BHK Flat on Rent


</h5> </Link>
      <p className="card-text">Moving into a new place is an exhilarating experience, but the quest for the perfect 1 BHK (One Bedroom Hall Kitchen) flat on rent can often feel like a daunting task. This guide aims to simplify this journey by providing insights, tips, and guidance to ease your search process.



</p>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
    </div>
  </div>

  </Container>
  </>
  )


}



export default Blog7

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
