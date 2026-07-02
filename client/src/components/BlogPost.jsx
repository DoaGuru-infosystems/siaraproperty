import React, { useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";


function BlogPost({post}) {
  return (
    <>
    <Container>
    <div className="card shadow p-3 mb-5 bg-white rounded">
   <Link to="/blog/single-blog" > <img  src="https://www.homes.com/blog/wp-content/uploads/2019/02/Hosue-with-pool-760x428.jpg" className="card-img-top" alt="..."/> </Link>
    <div className="card-body">
        
        <p className="card-text d-inline"><span className="fs-5"><BiCategoryAlt /></span> Selling a home</p>
        <Link to="/blog/single-blog" style={{textDecoration: 'none'}} >  <h5 className="card-title mt-2">7 Home Staging Secrets: Lighting Can Make All The Difference</h5> </Link>
      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
    </div>
  </div>

  </Container>
  </>
  )

//   return (
//     <>
//     <Container>
//     <div className="card shadow p-3 mb-5 bg-white rounded">
//    <Link to="/blog/single-blog" > <img  src="https://www.homes.com/blog/wp-content/uploads/2019/02/Hosue-with-pool-760x428.jpg" className="card-img-top" alt="..."/> </Link>
//     <div className="card-body">
        
//         <p className="card-text d-inline"><span className="fs-5"><BiCategoryAlt /></span> Selling a home</p>
//       <h5 className="card-title mt-2">{post.title}</h5>
//       <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       <p className="card-text"><small className="text-body-secondary"> <span className="fs-5"><CgCalendarDates /></span>  AUGUST 24, 2022</small></p>
//     </div>
//   </div>
//   </Container>
//   </>
//   )
}



export default BlogPost

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
