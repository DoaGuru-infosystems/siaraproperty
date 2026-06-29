import React from 'react'
import { BiCategoryAlt } from "react-icons/bi";

import { Link } from 'react-router-dom';
import styled from "styled-components";
import blog3 from '../../../images/blog3.avif';


const SideBlog3 = () => {
  return (
    <>   
   <Container>      
             <div className="card mb-3" style={{ border:"none"}}>
  <div className="row g-0 d-flex align-items-center">
    <div className="col-md-4 mt-2">
        <Link  to="/blogs/single-blog3">
      <img src={blog3} className="img-fluid rounded" alt="BHK Apartment Duplex"/>
      </Link>
    </div>
    <div className="col-md-8">
      <div className="card-body py-0 px-0 px-sm-3">
      <p className="card-text d-inline"><small className="text-muted"><BiCategoryAlt />Selling a home</small>    <span className="fs-5"></span> </p>
       <Link style={{textDecoration: 'none'}}  to="/blogs/single-blog3"><h6 className="card-title mb-0">Looking for1 BHK Apartment Duplex</h6> </Link> 
        <p class="card-text"><small class="text-muted">AUGUST 24, 2022</small></p>
        
      </div>
    </div>
  </div>
</div>
</Container>
   </>
    
  )
}

export default SideBlog3;

const Container = styled.div`

    

`;