import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import blog4 from '../../images/blog4.avif'


function Blog4() {
  return (
    <>
    <Container>
    <div className="card shadow p-3 mb-5 bg-white rounded" id="cont">
  <div className="container" id="cont">
   <Link to="/blogs/single-blog4" > <img  src={blog4} className="card-img-top" alt="..."/> </Link></div>
    <div className="card-body">
        
        <p className="card-text d-inline"><span className="fs-5"><i class="bi bi-file-post"></i></span>Blog</p>
        <Link to="/blogs/single-blog4" style={{textDecoration: 'none'}} >  <h5 className="card-title mt-2">Budget Allocations and Real Estate: Paving the Path Ahead


</h5> </Link>
      <p className="card-text">Budget allocations in real estate are the architectural blueprints of success. They delineate the financial framework within which the industry operates, affecting everything from property development to market stability.



</p>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
    </div>
  </div>

  </Container>
  </>
  )


}



export default Blog4

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
