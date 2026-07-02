// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import BlogPost from "../components/BlogPost";

// function Blogs() {
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [blogPosts, setBlogPosts] = useState([]);
//     // useEffect(() => {
//     //     // Fetch data from your backend API
//     //     fetch('your-backend-api-url')
//     //       .then(response => response.json())
//     //       .then(data => setBlogPosts(data))
//     //       .catch(error => console.error('Error fetching data:', error));
//     //   }, []);

//   return (
//     <>
//     <Container>
//     <Navbar isScrolled={isScrolled}/>
//     <div className="container-fluid mt-5">
//         <div className="row">
//             <div className="col-12 text-center mt-5">
//                 <h1 className="">Blogs For Homes</h1>
//                 <p>Here's the popular blogs.</p>

//             </div>
//         </div>
//         <div className="row">
//             <div className="col-12 d-flex justify-content-center">
//             <form className="d-flex mt-4 justify-content-center searchBox ">
//         <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//         <button className="btn btn-outline-success" type="submit">Search</button>
//       </form>
//             </div>
//         </div>

//          {/* <div>
//       {blogPosts.map(post => (
//         <BlogPost key={post.id} post={post} />
//       ))}
//        </div> */}

//         <div className="row mt-5 cardBox">
//             <div className="col-12 col-md-4 mb-4 ">
//             <BlogPost/>
//             </div>
//             <div className="col-12 col-md-4 mb-4">
//             <BlogPost/>
//             </div>
//             <div className="col-12 col-md-4 mb-4">
//             <BlogPost/>
//             </div>
//             <div className="col-12 col-md-4 mb-4">
//             <BlogPost/>
//             </div>
//             <div className="col-12 col-md-4 mb-4">
//             <BlogPost/>
//             </div>
//             <div className="col-12 col-md-4 mb-4">
//             <BlogPost/>
//             </div>
//         </div>

//     </div>
//     </Container>
//     </>
//   )
// }

// export default Blogs

// const Container = styled.div`
// .searchBox{
//     height: 50px;
//     width: 60%;
//     @media only screen and (max-width: 760px) {
//         width: 100%

//     }

// }
// .cardBox{

//     margin: auto;
// }

// `;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

import BlogPost from "../components/BlogPost";
import Blog1 from "./../components/Blogs/Blog1";
import Blog2 from "../components/Blogs/Blog2";
import Blog3 from "../components/Blogs/Blog3";
import Blog4 from "../components/Blogs/Blog4";
import Blog5 from "../components/Blogs/Blog5";
import Blog6 from "../components/Blogs/Blog6";
import Blog7 from "../components/Blogs/Blog7";
import Blog8 from "../components/Blogs/Blog8";
import NavbarMob from "../components/NavbarMob";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";

function Blogs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);
  // useEffect(() => {
  //     // Fetch data from your backend API
  //     fetch('your-backend-api-url')
  //       .then(response => response.json())
  //       .then(data => setBlogPosts(data))
  //       .catch(error => console.error('Error fetching data:', error));
  //   }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const handleTop = () => {
      window.scrollTo(0, 0);
    };
    handleTop();
  }, []);
  return (
    <>
      <Container>
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="nav1">
          <Navbar isScrolled={isScrolled} />
        </div>
        <div className="nav2">
          <NavbarMob />{" "}
        </div>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-12 text-center mt-5">
              <h1 className="">Blogs For Homes</h1>
              <p>Here's the popular blogs.</p>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-12 d-flex justify-content-center">
            <form className="d-flex mt-4 justify-content-center searchBox ">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
            </div>
        </div> */}

          {/* <div>
      {blogPosts.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
       </div> */}

          <div className="row mt-5 cardBox">
            <div className="col-lg-4 col-md-6   mb-4 ">
              <Blog1 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog2 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog3 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog4 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog5 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog6 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog7 />
            </div>
            <div className="col-lg-4 col-md-6   mb-4">
              <Blog8 />
            </div>
            <div className="col-lg-4 col-md-6 col-12  mb-4"></div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Blogs;

const Container = styled.div`
  .searchBox {
    height: 50px;
    width: 60%;
    @media only screen and (max-width: 760px) {
      width: 100%;
    }
  }
  .cardBox {
    margin: auto;
  }
  .nav1 {
    display: block;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .nav2 {
    display: none;

    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
`;
