// import React from 'react'
// import styled from 'styled-components'
// import NavbarAd from '../components/NavbarAd';
// import axios from 'axios';
// import cogoToast from 'cogo-toast';
// import  { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';




// function RegistrationAd() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [formData , setFormData] = useState({});
//   const navigate = useNavigate()

//   window.onscroll = () => {
//     setIsScrolled(window.pageYOffset === 0 ? false : true);
//     return () => (window.onscroll = null);
//   };
//   const handleChange = (e) =>{
//     setFormData({...formData,[e.target.name]: e.target.value})
//   }
//   const handleSumbit = async (e) =>{
//     e.preventDefault();
//     try{
//       const res  = await axios.post("", formData)
//       console.log(res)
//       if(res.data.success === true){
//         cogoToast.success(`${res?.data.message}`)
//         navigate("/admin_login");
//       }
    
//     }
//     catch (error) {
//       console.log(error.response?.data.error); // 
//       cogoToast.error(`${error.response?.data.error}`);
//     }

//   }
//   return (
//     <Wrapper>
//       <NavbarAd/>
// <div className='container'>
//   <div className="row">
//     <div className="col-lg-4"></div>
//     <div className="col-lg-4 border rounded-4 mb-2 bg-primary " id='size'>
      
//     <div className="formcontent form1">
//               <h1 className='text-center'>Register</h1>
//               <div className="mb-3">
//                 <label htmlFor="name" className="form-label">
//                   Fullname
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your fullname"
//                   name="name"
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="email" className="form-label">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="phone" className="form-label">
//                   Mobile
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your email"
//                   name="phone"
//                   maxLength={10}
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   name="password"
//                   className="form-control"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="d-flex justify-content-center">
//                 <button className="btn btn-success" onClick={handleSumbit}>Submit</button>
//               </div>
//               <p>
//                 Allready have an account?{" "}
//                 <span>
//                   <Link to="/admin_login" className='text-white'>Login</Link>
//                 </span>
//               </p>
//             </div>
// </div>
//     <div className="col-lg-4"></div>
// </div>
// </div>


//     </Wrapper>
//   )
// }

// export default RegistrationAd
// const Wrapper = styled.div`
//   .form1{
//   margin-bottom: 4rem;
//      margin-top: 3rem;
     

 
  
//   }  
//   .container{
//     height: 45rem;
//     margin-top: 9rem;
//   }
// label{
//   font-weight: 800;
//          text-decoration: none;
//          font-family: "Playpen Sans", cursive;
// }
// h3{
//   font-weight: 800;
//          text-decoration: none;
//          font-family: "Playpen Sans", cursive;
// }
// button{
//   font-weight: 800;
//          text-decoration: none;
//          font-family: "Playpen Sans", cursive;
// }
// .form-text{
//   font-weight: 800;
//          text-decoration: none;
//          font-family: "Playpen Sans", cursive;
// }
// #size{
//   margin-right: 12px;
//   margin-left: 10px;
//   width: 25%;
//   @media screen and (max-width: 768px) {
//     width: 75%;
//     margin-left: 50px;
//   }
//   @media screen and (min-width: 768px) and (max-width: 1020px) {
//     width: 50%;
//     margin-left: 170px;
//   }
// }
// `