import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import NavbarAd from './NavbarAd';
import { BASE_URL } from '../config';

const AddsuggestedProperty = () => {

    const [property, setProperty] = useState('');
    const {currentAdmin} = useSelector((state) => state.admin)
    const navigate = useNavigate()
    
    const token = currentAdmin?.token;
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        try {
          if (!property) {
            throw new Error('Property ID is required');
          }
      
        //   const formData = new FormData();
          
      
          // Append the property ID to the FormData object
        //   formData.append('property_id', property);
         
      
          const response = await axios.post(`${BASE_URL}/api/property/addSuggestedProperty`,{ property_id: property }, {
            headers: {
                'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });
    
          
          cogoToast.success(`${response.data.message}`);
          navigate("/")
          
    
          // Handle success (e.g., show a success message)
        } catch (error) {
          console.error('Error add suggestrd property', error);
          cogoToast.error(`Error add suggestrd property: ${error.response.data.message}`);
          // Handle error (e.g., show an error message to the user)
        }
      };
    
  return (
    <>
    <Container>
      <NavbarAd/>
          <div className='container mt-5'>
              <div className="row text-center mt-4 mb-4">
                  <div className="col-12">
                      <h2>Add Suggested Property</h2>

                  </div>
              </div>

              <div className="row d-flex justify-content-center mb-5">
                  <div className="col-6">
                      <form onSubmit={handleSubmit} >
                      <div className="mb-3">
                <label htmlFor="propertyId" className="form-label">Property ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="propertyId"
                  onChange={e=> setProperty(e.target.value)}
                  required

                />
              </div>

                          
                          <div className='text-center'>
                          <button type="submit" class="btn btn-primary">Submit</button>
                          </div>
                      </form>

                  </div>
              </div>

          </div>
          </Container>
    </>
  )
}

export default AddsuggestedProperty

const Container = styled.div`

.container{
   padding: 20px;
}


`