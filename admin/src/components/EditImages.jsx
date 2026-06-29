import React, { useEffect, useState } from "react";
import {useNavigate, Link , useParams } from "react-router-dom";
import styled from "styled-components";
import { BiCategoryAlt } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./responsive";
import CarouselPlaceholder from "./CarouselPlaceholder"
import { FaRupeeSign } from "react-icons/fa";
import NavbarAd from "./NavbarAd";
import Sidebar from "./Sidebar";
import SiderbarMob from "./SiderbarMob";
import { useDispatch, useSelector } from "react-redux";
import cogoToast from 'cogo-toast';

const EditImages = () => {
    const [propertyImages, setPropertyImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { propertyId } = useParams();
    const [refresh, setRefresh] = useState(false); // Added refresh state
    const {currentAdmin} = useSelector((state) => state.admin)
    const navigate = useNavigate();

    const token = currentAdmin?.token;
    
  
    // Function to fetch property images by propertyId
    const fetchPropertyImages = async (propertyId) => {
      try {
        const response = await axios.get(`http://localhost:4000/api/property/getPropertyImagesById/${propertyId}`);
        return response?.data.data;
      } catch (error) {
        console.error('Error fetching property images:', error);
        return []; // Return an empty array in case of an error
      }
    };

    const handleImageDelete = async (imageId)=>{
        try {
             // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to delete this image?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }

            const response = await axios.delete(`http://localhost:4000/api/property/delete-property-image/${imageId}`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json',
                }
            });
            if(response?.data.success){
                cogoToast.success(`${response?.data.message}`)
                setRefresh((prevRefresh) => !prevRefresh); // Trigger refresh after successful deletion
            }
            else{
                cogoToast.error(`${response?.data.message}`)
            }
            
          } catch (error) {
            console.error('Error ', error);
            cogoToast.error(`${error?.response?.data.message}`)
            
          }
    }
  
    useEffect(() => {
      // Fetch property details
      const fetchPropertyData = async () => {
        try {
          // Fetch property images
          const images = await fetchPropertyImages(propertyId);
          setPropertyImages(images);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          // Handle errors
        }
      };
  
      fetchPropertyData();
    }, [propertyId,refresh]);
  
    return (
      <Wrapper>
        <NavbarAd />
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

    
         
       
      <div className="mb-lg-4 mt-lg-5 pt-lg-5">
      
        
          {loading ? (
            <CarouselPlaceholder />
          ) : (
            <div className="container-fluid">
              <div className="row">
                <h3 className="post-heading fw-semibold mb-3 ms-lg-3">
                  <p className="text-uppercase text-center">Available Property Images </p>
                </h3>
                <div className="text-center">
                <button onClick={()=> navigate(`/admin/add-property/add-images/${propertyId}`)} className="btn btn-primary mx-3 mx-1 btn-sm">Add Property Images</button> 
                </div>
               
              
                <div className="col-lg-12">
                  <div className="row cardBox">
                    {propertyImages?.length > 0 ? (
                        
                      propertyImages?.map((image) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={image?.id}>
                          <div className="card shadow p-3 mb-5 bg-white rounded">
                            <img
                              src={image?.image ? image?.image : "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg?t=st=1701323109~exp=1701326709~hmac=da85cae6601708a5416a585b78ba630517ba8a0b698f72df228ae5ae10f58c58&w=900"}
                              className="card-img-top"
                              alt={`Property ${image?.id}`}
                            />
                            <div className="card-body address text-center">
                              <button onClick={()=>handleImageDelete(image?.id)} className="btn btn-danger mx-3 mx-md-1 btn-sm">Delete</button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-data">
                        <h5 className="m-3">No property images available</h5>
                        {/* <button className="btn btn-primary mx-3 mx-1 btn-sm">Add Property Images</button>   */}
                      </div>
                      
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
        </div>
        </div>
        </div>

      </Wrapper>
    );
  };
  
  export default EditImages;

const Wrapper = styled.div`

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
.searchBox{
    height: 50px;
    width: 60%;
    @media only screen and (max-width: 760px) {
        width: 100%
     
    }
   
}
.address{
  overflow: hidden;
  text-overflow: ellipsis; 
  white-space: nowrap;
  
}
#nav1{
    display: block;
    
    @media screen and (max-width: 768px) {
   
    display: none;
    
  }
}
  #nav2{
    display: none;
    @media screen and (max-width: 768px) {
   
   display: block;
   
 }
   
  }
.post-heading {
    @media only screen and (max-width: 768px) {
      font-size: 20px;
      text-align: center;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 20px;
    }
  }
 h3 {
    font-family: "Playpen Sans", cursive;
  }
.card{
    border: none;
    margin: 1rem;
    
    
    
    img{
        border-radius: 10px;
        transition: 0.4s ease-in-out;
        cursor: pointer;
        height: 12rem;
        
        
       
        
    }
    img:hover{
             transform: scale(1.09);
        }
    
    .card-body{
        padding-left: 0;
        padding-right: 0;
        
      

    }
}
.no-data{
    height: 50vh;
}
    
`;