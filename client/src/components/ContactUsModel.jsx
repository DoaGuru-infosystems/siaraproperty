// import React, { useState } from "react";
// import styled from "styled-components";
// import Navbar from "../components/Navbar";
// import {useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import cogoToast from "cogo-toast";
// import axios from 'axios';

// function ContactUsModel({propertyId,propertyName}) {
//   const {currentUser} = useSelector((state) => state.user)
//   const navigate  = useNavigate();
//   const [formData,setFormData] = useState({
//     propertyId : propertyId,
//     propertyName: propertyName,
//     name : currentUser?.user?.name,
//     email : currentUser?.user?.email,
//     phone : currentUser?.user?.phone,
//     message : ""

//   });

//   const handleChange = (e) =>{
//     setFormData({...formData,[e.target.name] : e.target.value})
//   };
//    console.log(formData.message)

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try{

//       const res = await axios.post("http://localhost:4000/api/auth/interestedUser" , formData)

//       console.log(res)
//       if(res.data.success === true){
//         cogoToast.success(`${res.data.message}`)
//        window.location.reload();
//       }

//     }
//     catch(error){

//       console.log(error.response)
//       cogoToast.error(`${error.response.data.error}`)

//     }

//   }

//   return (
//     <>
//     <div className="d-grid gap-2 col-10 mx-auto">
//            {currentUser ?
//             (
//               <>
//                   <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
//               CONTACT US
//             </button>
//                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//               <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title" id="exampleModalLabel">
//                     Please fill the below form we will call you soon.
//                     </h5>
//                     <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
//                       <span aria-hidden="true">&times;</span>
//                     </button>
//                   </div>
//                   <div className="modal-body">
//                     <div className='col-12'>
//                     <div className="mb-3 mt-4">

//                     <label htmlFor="propertyId" className="form-label">
//                     Property Id
//                 </label>
//               <input
//                 type="text"
//                 placeholder="Property Id"
//                 name="propertyId"
//                 className="form-control"
//                 value={propertyId}
//                 readOnly

//               />
//             </div>
//             <div className="mb-3 mt-4">

//             <label htmlFor="propertyName" className="form-label">
//                     Property Name
//                 </label>
//               <input
//                 type="text"
//                 placeholder="Property Name"
//                 name="propertyName"
//                 className="form-control"
//                 value={propertyName}
//                 readOnly
//               />
//             </div>
//             <div className="mb-3 mt-4">

//             <label htmlFor="name" className="form-label">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your fullname"
//                   name="name"
//                   className="form-control"
//                   value={currentUser?.user?.name}
//                 />
//               </div>
//               <div className="mb-3 mt-4">
//               <label htmlFor="email" className="form-label">
//                     Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   className="form-control"
//                   value={currentUser?.user?.email}
//                 />
//               </div>
//               <div className="mb-3 mt-4">
//               <label htmlFor="phone" className="form-label">
//                     Phone
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your 10 digit mobile number"
//                   name="phone"
//                   maxLength={10}
//                   className="form-control"
//                   value={currentUser?.user?.phone}
//                 />
//               </div>
//               <div className="mb-3">
//               <label htmlFor="message" className="form-label">
//                     Write Message
//                 </label>
//                 <textarea placeholder="Write message"
//                 name="message"
//                 className="form-control"
//                 onChange={handleChange}
//                 value={formData.message}
//                 rows="6"
//                 />

//               </div>

//                <div className="d-flex justify-content-center gap-2">

//                     <button type="button" className="btn btn-primary" onClick={handleSubmit}>
//                     Submit
//                     </button>
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                       Close
//                     </button>
//                   </div>

//             </div>

//                     </div>

//                 </div>
//               </div>
//             </div>
//               </>
//             )
//             :
//             (
//               <>
//                   <button onClick={() => cogoToast.error("Please login to contact us")} className="btn btn-primary" type="button">
//                 CONTACT US
//             </button>
//               </>
//             )
//            }

//           </div>
//     </>
//   )
// }

// export default ContactUsModel

import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from "cogo-toast";
import axios from "axios";

function ContactUsModel({ propertyId, propertyName }) {
  const { currentUser } = useSelector((state) => state.user || {});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyId: propertyId,
    propertyName: propertyName,
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if required fields are empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      cogoToast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/property/interestedUser",
        formData,
      );

      console.log(res);
      if (res.data.success === true) {
        cogoToast.success(`${res.data.message}`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response);
      cogoToast.error(`${error.response.data.error}`);
    }
  };

  return (
    <>
      <Container>
        <div className="d-grid gap-2 col-10 mx-auto">
          <>
            <button
              className="btn btn-primary contactusButton"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              CONTACT US
            </button>
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Please fill the below form we will call you soon.
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="col-12">
                        <div className="mb-3 mt-4">
                          <label htmlFor="propertyId" className="form-label">
                            Property Id
                          </label>
                          <input
                            type="text"
                            placeholder="Property Id"
                            name="propertyId"
                            className="form-control"
                            value={propertyId}
                            readOnly
                            required
                          />
                        </div>
                        <div className="mb-3 mt-4">
                          <label htmlFor="propertyName" className="form-label">
                            Property Name
                          </label>
                          <input
                            type="text"
                            placeholder="Property Name"
                            name="propertyName"
                            className="form-control"
                            value={propertyName}
                            readOnly
                            required
                          />
                        </div>
                        <div className="mb-3 mt-4">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your fullname"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3 mt-4">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3 mt-4">
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your 10 digit mobile number"
                            name="phone"
                            maxLength={10}
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="message" className="form-label">
                            Write Message
                          </label>
                          <textarea
                            placeholder="Write message"
                            name="message"
                            className="form-control"
                            onChange={handleChange}
                            value={formData.message}
                            rows="6"
                          />
                        </div>

                        <div className="d-flex justify-content-center gap-2">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </Container>
    </>
  );
}

export default ContactUsModel;

const Container = styled.div`
  @keyframes pulsate {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .contactusButton {
    animation: pulsate 2s infinite; /* Adjust the duration as needed */
  }
`;
