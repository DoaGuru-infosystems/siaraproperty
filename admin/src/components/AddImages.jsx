import React, { useState,useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from './Sidebar';
import SiderbarMob from './SiderbarMob';
import NavbarAd from './NavbarAd';
import CarouselPlaceholder from './CarouselPlaceholder';
import { BASE_URL } from '../config';

function AddImages() {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [property, setProperty] = useState('');
  const { propertyId } = useParams();
  const {currentAdmin} = useSelector((state) => state.admin)
  const token = currentAdmin?.token;
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  console.log(propertyId)

  useEffect(() => {
    // Set the property ID from query parameters when the component mounts
    setProperty(propertyId);
  }, [propertyId]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (!property) {
        cogoToast.error('Property ID is required');
        return
      }
      if(!selectedFiles){
        cogoToast.error('Images is required');
        return
        
      }
  
      const formData = new FormData();
  
      // Append each selected file to the FormData object
      for (let i = 0; i < selectedFiles?.length; i++) {
        formData.append('images', selectedFiles[i]);
      }
  
      // Append the property ID to the FormData object
      formData.append('property_id', property);
      
      setLoading(true); // Set loading to true before making the request
      const response = await axios.post(`${BASE_URL}/api/property/upload-images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      setLoading(false)
      if(response?.data.success){
        
        console.log('Upload successful:', response?.data);
        cogoToast.success(`${response?.data.message}`);
      navigate(`/property/edit-property-images/${propertyId}`)
      }
      else{
        cogoToast.error(`${response?.data.message}`);
      }
      
      

      // Handle success (e.g., show a success message)
    } catch (error) {
      setLoading(false)
      console.error('Error uploading images:', error);
      cogoToast.error(`Error uploading images: ${error}`);
      // cogoToast.error(`Error uploading images: ${error.response?.data.message}`);
      // Handle error (e.g., show an error message to the user)
    }
  };

    
  return (
    <>
    <Container>
      
          
       
        
        <NavbarAd/>

         <div className="row">
        <div className="col-lg-2 col-1" id='sider'>
        <Sidebar/>
        </div>
        <div className="col-lg-2 col-1" id='sider1'>
        <SiderbarMob/>
        </div>
        <div className="col-lg-10 mt-2" id='set'>
        <div className="row">
        <div className="col-lg-12">
        
        
        
        
        <div className="mb-lg-4 mt-lg-3 pt-lg-3">
        
                {
                  loading 
                  ?
                  <>
                  
                  <CarouselPlaceholder/>
                  <h5 className='text-center mt-4'>Uploading Images...</h5>
                  </>
                  :
                  <>
                   <div className='container '>
                      <div className="row text-center mt-4 mb-4">
                          <div className="col-12">
                              <h2>Add Property Images</h2>
        
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
                          value={propertyId}
                          readOnly // Make the input read-only since it's derived from the URL
                        />
                      </div>
        
                                  <div class="mb-3">
                                      <label for="formFileMultiple" class="form-label">Select the images for Property</label>
                                      <input class="form-control" type="file" id="formFileMultiple" multiple  onChange={handleFileChange} accept="image/png, image/gif, image/jpeg"/>
                                  </div>
                                  <div className='d-sm-flex justify-content-sm-center align-item-sm-center gap-3 text-center '>
                                  <button type="submit" className="btn btn-primary mt-2">Submit</button>
                                  <button onClick={()=> navigate('/allproperties')}  className="btn btn-primary mt-2 mt-0">Upload Later</button>
                                  </div>
                              </form>
        
                          </div>
                      </div>
        
                  </div>
                  </>
                }
                 
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                
      
 
          </Container>
    </>
  )
}

export default AddImages

const Container = styled.div`

.container{
   padding: 20px;
}
#sider{
    display: block;
    
    @media screen and (max-width: 1000px) {
   
    display: none;
    
  }
}
  #sider1{
    display: none;
    @media screen and (max-width: 1000px) {
   
   display: block;
   
 }
}


`