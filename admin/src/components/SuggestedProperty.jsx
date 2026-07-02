


import React, { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";
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
import moment from "moment";
import { FaLocationDot } from "react-icons/fa6";
import { BASE_URL } from "../config";




export default function SuggestedProperty() {
 
  const {currentAdmin} = useSelector((state) => state.admin)
  const [suggestedProperties,setSuggestedProperties] = useState(null);
  const [properties, setProperties] = useState(suggestedProperties);
  const [propertiesImages, setPropertiesImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectPropertyFor,setSelectPropertyFor] = useState('sale');
  const token = currentAdmin?.token;
  const [refresh, setRefresh] = useState(false);
  

  const getAllProperties = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/property/getAllPropertyAdmin/`);
      setProperties(response?.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  const getAllPropertiesImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/property/getAllPropertyImages`);
      setPropertiesImages(response?.data);
    } catch (error) {
      console.error('Error fetching property images:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  }


  const getSuggestedProperties = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/property/getSuggestedPropertyAdmin`);
      setSuggestedProperties(response?.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }
  



  const deleteProperty = async (propertyId) =>{
    try{
     // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to delete this property?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
      const response = await axios.delete(`${BASE_URL}/api/property/deleteproperty/${propertyId}`,{
             headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
             }
      });
      console.log(response)

      if(response?.data.success){
        
        cogoToast.success(`${response?.data.message}`);
        // Update the refresh state to trigger useEffect
        setRefresh((prevRefresh) => !prevRefresh);
      }
      else{
        cogoToast.error(`${response?.data.message}`);
      }
      

    }
    catch(err){
      cogoToast.error(`${err?.message}`);
    }
  }


  const markPropertySold = async (propertyId) =>{
    try{
     // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to Mark Sold this property?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
      const response = await axios.put(`${BASE_URL}/api/property/markedAsSold/${propertyId}`,
      {},
      {
             headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
             }
      });
      

      if(response?.data.success){
        
        cogoToast.success(`${response?.data?.message}`);
        // Update the refresh state to trigger useEffect
        setRefresh((prevRefresh) => !prevRefresh);
      }
      else{
        cogoToast.error(`${response?.data.message}`);
      }
      

    }
    catch(err){
      cogoToast.error(`${err.message}`);
    }
  }

  
  const addToSuggested = async (propertyId) => {
    
  
    try {
       // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to Add Suggested property?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }

     
  
      const response = await axios.post(`${BASE_URL}/api/property/addSuggestedProperty`,{ property_id: propertyId }, {
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if(response?.data.success){
      cogoToast.success(`${response?.data.message}`);
      setRefresh((prevRefresh) => !prevRefresh);
      }
      

      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error add suggestrd property', error);
      cogoToast.error(`Error add suggestrd property: ${error?.response?.data.message}`);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const removeSuggested = async (propertyId) =>{
    try{
     // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to remove this property?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
      const response = await axios.delete(`${BASE_URL}/api/property/removeSuggestedProperty/${propertyId}`,{
             headers:{
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
             }
      });
      console.log(response)

      if(response?.data.success){
        
        cogoToast.success(`${response?.data.message}`);
        // Update the refresh state to trigger useEffect
        setRefresh((prevRefresh) => !prevRefresh);
      }
      else{
        cogoToast.error(`${response?.data.message}`);
      }
      

    }
    catch(err){
      cogoToast.error(`${err?.message}`);
    }
  }






  useEffect(() => {
    // getAllProperties();
    getAllPropertiesImages();
    getSuggestedProperties();
  }, [refresh]);
  
  const filterProperties = () => {
    // Your filtering logic here based on searchTerm and selectedType
    // Update setFilteredProperties with the filtered result
    // For example, assuming properties.data is an array of properties
    const filteredResult = selectedType
    ? suggestedProperties?.data?.filter(
        (property) =>
        property?.isSold == 0 &&
          property?.property_type === selectedType &&
          property?.property_for === selectPropertyFor &&
         ( property?.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property?.id.toString().includes(searchTerm.toString()) ||
          property?.property_address.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : suggestedProperties?.data?.filter((property) =>
    property?.isSold == 0 &&
        property?.property_for === selectPropertyFor &&
       ( property?.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.id.toString().includes(searchTerm.toString()) ||
        property?.property_address.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  setFilteredProperties(filteredResult);
  }
  

  useEffect(() => {
    filterProperties();
  }, [searchTerm, selectedType, selectPropertyFor,properties,refresh,suggestedProperties]); // Trigger the filtering whenever searchTerm, selectedType, or properties change
  
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handlePropertyFor = (event) =>{
    setSelectPropertyFor(event.target.value)
  }

  console.log(properties);
  console.log(propertiesImages);
  console.log(filteredProperties)

  return (
    <Wrapper>
       
        
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

    
         
       
      <div className="mb-lg-4 mt-lg-5 pt-lg-5">
      
        
        

        {loading ? (
          // <p>Loading...</p>
              <CarouselPlaceholder/>
        ) : (

        // Render the component only if data is available
        
        suggestedProperties && suggestedProperties?.data?.length > 0 ? (
            <div className="container-fluid">
              <div className="row">
              <h3 className="post-heading fw-semibold mb-3 ms-lg-3">
        <p className="text-uppercase text-center">Suggested Properties </p>
        </h3>

     
        <div className="d-flex justify-content-center">
            <form className="d-flex mt-4 justify-content-center searchBox ">
        <input className="form-control me-2" type="search" placeholder="Search by ID or Name" aria-label="Search" onChange={(e) => setSearchTerm(e.target.value)}/>
        <select
      className="form-select me-2"
      aria-label="Property Type"
      onChange={handlePropertyFor}
    >
      <option value="sale">Sale</option>
      
      <option value="rent">Rent</option>

      {/* Add more property types as needed */}
    </select>
        <select
      className="form-select"
      aria-label="Property Type"
      onChange={handleTypeChange}
    >
      <option value="">All Types</option>
      <option value="house">House</option>
      <option value="villa">Villa</option>
      <option value="plot">Plot</option>
      <option value="flat">Flat</option>
      <option value="land">Land</option>
      <option value="farmLand">Farm Land</option>
      <option value="farmHouse">Farm House</option>
      <option value="commercial">Commercial</option>

      {/* Add more property types as needed */}
    </select>
    
      </form>
            </div>
              
              {/* <div className="col-lg-2" id='nav1'>
               <Sidebar/>
            </div>
            <div className="col-lg-2" id='nav2'>
               <SiderbarMob/>
            </div> */}
            <div className="col-lg-12"> 
          <div className="row cardBox">
            
         
           
              
              {filteredProperties?.map((property) => {
                const matchingImages = propertiesImages?.data.filter(
                  (image) => image?.property_id == property?.id
                );
                const imageSrc = matchingImages && matchingImages?.length  > 0  ? matchingImages[0]?.image : null;
                console.log(imageSrc)
                return (
                  <div className="col-lg-4 col-md-6 col-12 mb-4" key={property?.id}>
                    <div className="card shadow p-3 mb-5 bg-white rounded">
                      <Link to={`/property/${property?.id}`}>
                        <img src={imageSrc ? imageSrc : "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg?t=st=1701323109~exp=1701326709~hmac=da85cae6601708a5416a585b78ba630517ba8a0b698f72df228ae5ae10f58c58&w=900" } className="card-img-top" alt={`Property ${property?.id}`} />
                      </Link>
                      <div className="card-body address">
                        <p className="card-text d-inline">
                          <span className="fs-5"><FaLocationDot /></span> {property?.property_address}
                        </p>
                        <Link to={`/property/${property?.id}`} style={{ textDecoration: 'none' }}>
                          <h5 className="card-title mt-2">{property?.property_name}</h5>
                        </Link>
                        <h5 className="card-text"><FaRupeeSign />{property?.price}</h5>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            <span className="fs-5"><CgCalendarDates /></span> posted on : {moment(property.created_at).fromNow()} 
                            
                          </small>
                          
                        </p>
                      
                       
                      </div>
                      <div className="d-flex justify-content-start align-item-center flex-wrap gap-1">
                        <Link to={`/property/edit-property/${property?.id}`}> <button className="btn btn-primary   btn-sm ">Edit Details</button></Link>
                       <Link to={`/property/edit-property-images/${property?.id}`}> <button className="btn btn-secondary  btn-sm mx-3 mx-md-1">Edit Images</button></Link>
                       <button  onClick={()=>deleteProperty(property?.id)} className="btn btn-danger  btn-sm ">Delete Property</button>
                       <button  onClick={()=>markPropertySold(property?.id)} className="btn btn-success btn-sm ">Mark Sold</button>
                     
        {
          property?.property_for == "sale" &&
                    
        ( suggestedProperties?.data?.some((suggProperty) => suggProperty?.id === property?.id) ? (
          <button onClick={() => removeSuggested(property?.id)} className="btn btn-dark btn-sm">Remove from Suggested</button>
        ) : (
          <button onClick={() => addToSuggested(property?.id)} className="btn btn-info btn-sm">Add to Suggested</button>
        ))
      }  
                       
                        </div>
                       
                    </div>
                  </div>
                )
              })}
            
          </div>
          </div>
          </div>
          </div>
        ):(
          // Display a message when no data is available
          <div className="no-data">
          <h5 className="text-center">Not available</h5>
          </div>
        )
        )}
      </div>
      </div>
      </div>
      </div>
      </div>
    </Wrapper>
  );
}



const Wrapper = styled.div`
#set{
  
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

