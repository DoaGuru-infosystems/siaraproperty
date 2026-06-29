import React, { useEffect, useState } from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import styled from 'styled-components'
import NavbarAd from '../components/NavbarAd'
import axios from 'axios';
import cogoToast from 'cogo-toast';

function ResetPassword() {
  
    const [password,setPassword] = useState("");
    const {id,token} = useParams();
    const navigate = useNavigate();

    const handleChange =  (e) =>{
        setPassword(e.target.value)
   } 
  
   const handleSubmit = async(e) =>{
      e.preventDefault();
      if(!password){
          return cogoToast.error(`Please enter password`);
      }
      try{
          
         const res = await axios.post(`http://localhost:4000/api/property/admin-reset-password/${id}/${token}`, { password: password });
         if (res?.data && res?.data?.success === true) {
          
          console.log(res?.data);
          cogoToast.success(`${res?.data?.message}`);
          navigate("/admin_login")
         
          return;
        }
        if (res.data && res.data.success === false) {
         
          cogoToast.error(`${res?.data?.message}`);
          return;
        }
      }
      catch(err){
          if (err?.response && err.response?.data) {
            
              console.log(err);
              cogoToast.error(`${err.response?.data?.message}`);
            }  
      }
  
   }
    
      useEffect(()=>{
        const handleTop = () => {
          window.scrollTo(0, 0);
        };
        handleTop();
      },[])

  return (
    <Wrapper>
        <NavbarAd/>
<div className='container'>
  <div className="row">
    <div className="col-lg-4"></div>
    <div className="col-lg-4 border rounded-4 mb-2 bg-primary " id='size'>
  <div className="formcontent form1">
              <h1 className='text-center'>Reset Password</h1>
             
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                 
                />
              </div>
             
             
              <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
              </div>
              <p className="text-center mt-2">
                  
                  <span>
                    <Link to="/admin_login" className='text-white'>Return to login</Link>
                  </span>
                </p>
             
             
            </div>
</div>
    <div className="col-lg-4"></div>
</div>
</div>

      
    
    </Wrapper>
  )
}

export default ResetPassword

const Wrapper = styled.div`
  .form1{
  margin-bottom: 4rem;
     margin-top: 3rem;
     

 
  
  }  
  .container{
    height: 25rem;
    margin-top: 9rem;
  }
label{
  font-weight: 800;
         text-decoration: none;
         font-family: "Playpen Sans", cursive;
}
h3{
  font-weight: 800;
         text-decoration: none;
         font-family: "Playpen Sans", cursive;
}
button{
  font-weight: 800;
         text-decoration: none;
         font-family: "Playpen Sans", cursive;
}
.form-text{
  font-weight: 800;
         text-decoration: none;
         font-family: "Playpen Sans", cursive;
}
#size{
  margin-right: 12px;
  margin-left: 10px;
  width: 25%;
  @media screen and (max-width: 768px) {
    width: 75%;
    margin-left: 50px;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
    width: 50%;
    margin-left: 170px;
  }
}
`