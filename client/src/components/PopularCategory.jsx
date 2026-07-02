import React, { useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";

function PopularCategory() {
  return (
    <>
    <Container>
    <div className="row mt-5 cardBox">
            <div className="col-12 col-md-4 mb-4 ">
    <div className="card shadow p-3 mb-5 bg-white rounded">
   <Link to="/blog/single-blog" > <img  src="https://www.homes.com/blog/wp-content/uploads/2019/02/Hosue-with-pool-760x428.jpg" className="card-img-top" alt="..."/> </Link>
    <div className="card-body">
        
    <p className="card-text d-inline"><span className="fs-5"><BiCategoryAlt /></span> Indore</p>
        <Link to="/single-property" style={{textDecoration: 'none'}} >  <h6 className="card-title mt-2">2 Beds2 Baths 1,188 Sq Ft
350 S Durango Dr Unit 224
Las Vegos, NV 891452 Beds2 Baths 1,188 Sq Ft
350 S Durango Dr Unit 224
Las Vegos, NV 89145</h6> </Link>
      <h5 className="card-text">₹ 2,00,000</h5>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span> 7 hours ago</small></p>
    </div>
  </div>
  </div>
  </div>


  </Container>
  </>
  )
}

export default PopularCategory

const Container = styled.div`
.card{
    border: none;
    margin: 1rem;
    
    img{
        border-radius: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;
        
        
    }
    img:hover{
             transform: scale(1.09);
        }
    
    .card-body{
        padding-left: 0;
        padding-right: 0;

    }
}
    
`;