import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


function ContactUsModel() {
  return (
    <>
    <div className="d-grid gap-2 col-10 mx-auto">
            <button className="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
              CONTACT US
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                    Please fill the below form we will call you soon.
                    </h5>
                    <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className='col-12'>
            <div className="mb-3 mt-4">
               
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  name="name"
                  className="form-control"
                />
              </div>
              <div className="mb-3 mt-4">
               
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="form-control"
                />
              </div>
              <div className="mb-3 mt-4">
               
                <input
                  type="text"
                  placeholder="Enter your 10 digit mobile number"
                  name="phone"
                  maxLength={10}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
               
                <textarea placeholder="Write message"
                className="form-control"
                rows="6"
                />

                
              </div>
            
               <div className="d-flex justify-content-center gap-2">
                   
                    <button type="button" className="btn btn-primary">
                    Submit
                    </button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>

            </div>
                    
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default ContactUsModel