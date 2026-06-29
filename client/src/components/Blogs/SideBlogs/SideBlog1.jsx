import React from 'react';
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import blog1 from '../../../images/blog1.avif';


const SideBlog1 = () => {
  return (
    <>   
   <Container>      
             <div className="card mb-3" style={{ border:"none"}}>
  <div className="row g-0 d-flex align-items-center">
    <div className="col-md-4 mt-2">
        <Link  to="/blogs/single-blog1">
      <img src={blog1} className="img-fluid rounded" alt="Buying a 1 BHK Apartment"/>
      </Link>
    </div>
    <div className="col-md-8">
      <div className="card-body py-0 px-0 px-sm-3">
      <p className="card-text d-inline"><small className="text-muted"><BiCategoryAlt />Selling a home</small>    <span className="fs-5"></span> </p>
       <Link style={{textDecoration: 'none'}}  to="/blogs/single-blog1"><h6 className="card-title mb-0">The Critical Role of Home Inspections: A Buyer's Guide to Informed Decisions</h6> </Link> 
        <p class="card-text"><small class="text-muted">AUGUST 24, 2022</small></p>
        
      </div>
    </div>
  </div>
</div>
</Container>
   </>
    
  )
}

export default SideBlog1;

const Container = styled.div`

    

`;