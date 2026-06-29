import React from 'react'
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { Link } from 'react-router-dom';
import styled from "styled-components";

function SideBlog() {
  return (
   <>   
   <Container>      
             <div className="card mb-3" style={{ border:"none"}}>
  <div className="row g-0 d-flex align-items-center">
    <div className="col-md-4 mt-2">
        <Link  to="/blog/single-blog">
      <img src="https://www.homes.com/blog/wp-content/uploads/2019/02/Hosue-with-pool-760x428.jpg" className="img-fluid rounded" alt="..."/>
      </Link>
    </div>
    <div className="col-md-8">
      <div className="card-body py-0 px-0 px-sm-3">
      <p className="card-text d-inline"><small className="text-muted"><BiCategoryAlt />Selling a home</small>    <span className="fs-5"></span> </p>
       <Link style={{textDecoration: 'none'}}  to="/blog/single-blog"><h6 className="card-title mb-0">7 Home Staging Secrets: Lighting Can Make All The Difference</h6> </Link> 
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        
      </div>
    </div>
  </div>
</div>
</Container>
   </>
  )
}

export default SideBlog


const Container = styled.div`

    

`;