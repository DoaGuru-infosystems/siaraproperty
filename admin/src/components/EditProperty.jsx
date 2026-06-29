import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import cogoToast from 'cogo-toast';
import { useNavigate,Link , useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import NavbarAd from './NavbarAd';
import axios from 'axios';
import Sidebar from './Sidebar';
import SiderbarMob from './SiderbarMob';


function EditProperty() {
    // const [propertyType, setPropertyType] = useState('');
    
  
    // const handlePropertyTypeChange = (event) => {
    //   setPropertyType(event.target.value);
    // };
    const {currentAdmin} = useSelector((state) => state.admin)
    const navigate = useNavigate();
    const { propertyId } = useParams();
    const token = currentAdmin?.token;
    
    const [propertyData, setPropertyData] = useState(null);
   
   

    useEffect(() => {
        // Fetch property data using property ID when component mounts
        const fetchPropertyData = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/property/getPropertyById/${propertyId}`);
              console.log(response)
            if (response?.data.success == true) {
              setPropertyData(response?.data.data); // Assuming the property data is in the 'data' field
            } else {
              // Handle error
              console.error('Failed to fetch property data');
            }
          } catch (error) {
            console.error('Error fetching property data:', error);
          }
        };
    
        fetchPropertyData();
      },[]);

      useEffect(() => {
        // Set form data with property data when it is available
        if (propertyData) {
          setFormData({
            property_name : propertyData?.property_name,
            property_for : propertyData?.property_for,
            // property_location: '',
            property_address : propertyData?.property_address,
        property_city : propertyData?.property_city, 
        property_description : propertyData?.property_description,
        property_type : propertyData?.property_type,
        commercial_property_type : propertyData?.commercial_property_type,
        property_video : propertyData?.property_video,
        tncp:propertyData?.tncp,
        rera:propertyData?.rera,
        bhk : propertyData?.bhk,
        new_resale : propertyData?.new_resale,
        structure : propertyData?.structure,
        price : propertyData?.price,
        square_ft : propertyData?.square_ft,
        dimension : propertyData?.dimension,
        car_parking : propertyData?.car_parking,
        year_built : propertyData?.year_built,
        facing  : propertyData?.facing,
        furnishing  :propertyData?.furnishing,
        carpet_area : propertyData?.carpet_area,
        bathroom : propertyData?.bathroom,
        property_on_floor :propertyData?.property_on_floor,
        flooring :propertyData?.flooring,
        age_of_property : propertyData?.age_of_property,
        parking : propertyData?.parking,
        lift : propertyData?.lift,
        common_visitor_parking  : propertyData?.common_visitor_parking,
        main_road_facing : propertyData?.main_road_facing,
        working_24_7  : propertyData?.working_24_7,
        good_ceiling_height : propertyData?.good_ceiling_height,
        good_natural_light  : propertyData?.good_natural_light,
        attractive_entrance_gate : propertyData?.attractive_entrance_gate,
        gated_community  : propertyData?.gated_community,
        immediate_possession : propertyData?.immediate_possession,
        landscape_garden :propertyData?.landscape_garden,
        water_supply_24_7  : propertyData?.water_supply_24_7,
        bore_well_water_24_7 :propertyData?.bore_well_water_24_7,
        environment_clearance_available :propertyData?.environment_clearance_available,
        swimming_pool :propertyData?.swimming_pool,
        terrace : propertyData?.terrace,
        air_conditioning  : propertyData?.air_conditioning,
        internet : propertyData?.internet,
        balcony  : propertyData?.balcony,
        cable_tv  :propertyData?.cable_tv,
        computer  : propertyData?.computer,
        dishwasher :propertyData?.dishwasher,
        near_green_zone  : propertyData?.near_green_zone,
        near_temple  : propertyData?.near_temple,
        entry_gate : propertyData?.entry_gate,
        activity_area : propertyData?.activity_area,
        security_24_7 : propertyData?.security_24_7,
        long_term_investment : propertyData?.long_term_investment,
        own_purpose  : propertyData?.own_purpose,
        investment  : propertyData?.investment,
        fall_ceiling :propertyData?.fall_ceiling ,
    wallpaper : propertyData?.wallpaper,
    lights : propertyData?.lights,
    fans : propertyData?.fans,
    modularKitchen : propertyData?.modularKitchen,
    road : propertyData?.road,
    drainage : propertyData?.drainage,
    roadLight : propertyData?.roadLight
            // ... (populate other fields)
          });
        }
      }, [propertyData]);




    const [formData, setFormData] = useState({
        property_name : '',
        property_for : "",
        // property_location: '',
        property_address : '',
    property_city : '', 
    property_description : '',
    property_type : '',
    commercial_property_type : '',
    property_video : "",
    tncp:"",
    rera:"",
    bhk : '',
    new_resale : '',
    structure : '',
    price : '',
    square_ft : '',
    dimension : '',
    car_parking : '',
    year_built : '',
    facing  : '',
    furnishing  : '',
    carpet_area : '',
    bathroom : '',
    property_on_floor : '',
    flooring : '',
    age_of_property : '',
    parking : '',
    lift : '',
    common_visitor_parking  : '0',
    main_road_facing : '0',
    working_24_7  : '0',
    good_ceiling_height : '0',
    good_natural_light  : '0',
    attractive_entrance_gate : '0',
    gated_community  : '0',
    immediate_possession : '0',
    landscape_garden : '0',
    water_supply_24_7  : '0',
    bore_well_water_24_7 : '0',
    environment_clearance_available : '0',
    swimming_pool : '0',
    terrace : '0',
    air_conditioning  : '0',
    internet : '0',
    balcony  : '0',
    cable_tv  : '0',
    computer  : '0',
    dishwasher : '0',
    near_green_zone  : '0',
    near_temple  : '0',
    entry_gate : '0',
    activity_area : '0',
    security_24_7 : '0',
    long_term_investment : '0',
    own_purpose  : '0',
    investment  : '0',
    fall_ceiling : '0',
    wallpaper : '0',
    lights : '0',
    fans : '0',
    modularKitchen : '0',
    road : '0',
    drainage : '0',
    roadLight : '0'
        // Add other form fields here
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    console.log(formData)

    const handleSubmit = async (e) =>{
         
         e.preventDefault();

        try {
            const response = await fetch(`http://localhost:4000/api/property/editproperty/${propertyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok) {
                // Handle success, maybe redirect or show a success message
                console.log('Form submitted successfully');
                console.log(response);
                cogoToast.success(`${responseData.message}`);
                setTimeout(()=>{
                    navigate(`/allproperties`);
                },1000)
                
                
                

                
                // cogoToast.success(`${res.data.message}`);

                // e.target.reset();

                
                
            } else {
                // Handle errors, maybe show an error message
                console.error('Failed to submit form');
                if(responseData.message == "Unauthorized - Invalid token"){
                    cogoToast.error(`${responseData.message} ! Please Login Again`);
                    
                }
                else{
                    cogoToast.error(`${responseData.message}`);
                } 
                
                
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    }
  
    

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
        
    <div className='container-fluid'>
        <div className="row">
            <form onSubmit={handleSubmit}>
            <div className="col-12">
                <h1 className='text-center mt-5'>Edit Property</h1>
            </div>

            <div className="row mb-4 p-4 border-bottom">
            <div className="col-12">
                <h5 className='mb-4'>BASIC INFORMATION</h5>
                <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="property_name">Property Name</label> 
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_name'  placeholder="Property Name" onChange={handleInputChange} value={formData?.property_name} required/>
                    </div>
                    {/* <div className="col-12 col-md-6 mb-3">
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_location' placeholder="Property Google Map Location" onChange={handleInputChange} required/>
                    </div> */}
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="property_address">Property Address</label> 
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_address' placeholder="Property Address" onChange={handleInputChange} required 
                    value={formData?.property_address}/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="property_city">Property City</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_city' placeholder="Property City" onChange={handleInputChange} value={formData?.property_city} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="property_description">Property Description</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_description' placeholder="Property Description" onChange={handleInputChange} 
                    value={formData?.property_description} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="property_video">Property youtube video link</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_video' placeholder="Property youtube video link" value={formData?.property_video} onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
        </div>


        <div className="row mb-4 p-4 border-bottom">
            <div className="col-12">
                <h5 className='mb-4'>PROPERTY INFORMATION</h5>
                <div className="row">
                                 {/* <div className='d-md-flex'>
                                <div className='mb-3'>

                                    <p>Select Proprty type</p>
                                    </div>
                                    <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="House"   value="house" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="House">
                                      House
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="Villa" value="villa" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="Villa">
                                       Villa
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="Plot" value="plot" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="Plot">
                                       Plot
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="flat" value="flat" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="flat">
                                      Flat
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="land" value="land" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="land">
                                      Land
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="farmLand" value="farmLand" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="farmLand">
                                      Farm Land
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="farmHouse" value="farmHouse" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="farmHouse">
                                      Farm House
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_type" id="commercial" value="commercial" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="commercial">
                                      Commercial
                                      </label>
                                  </div>
                                  </div>
                                  </div> */}
                                 
  <div className='col-12 col-md-6 mb-3'>
  <label className="form-check-label" htmlFor="property_type">Property Type</label>
    <select className="form-select" id="property_type" name="property_type" value={formData?.property_type} onChange={handleInputChange} required>
      <option value="">Select Property Type</option>
      <option value="house">House</option>
      <option value="villa">Villa</option>
      <option value="plot">Plot</option>
      <option value="flat">Flat</option>
      <option value="land">Land</option>
      <option value="farmLand">Farm Land</option>
      <option value="farmHouse">Farm House</option>
      <option value="commercial">Commercial</option>
    </select>
  </div>

                                  {/* <div className='d-md-flex'>
                                <div className='mb-3'>

                                    <p>Select Proprty For Sale/Rent</p>
                                    </div>
                                
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_for" id="sale" value="sale" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="sale">
                                      Sale
                                      </label>
                                  </div>
                                  </div>
                                  <div className='mb-3'>
                                  <div className="form-check ms-4">
                                      <input className="form-check-input" type="radio" name="property_for" id="rent" value="rent" onChange={handleInputChange} required/>
                                      <label className="form-check-label" for="rent">
                                      Rent
                                      </label>
                                  </div>
                                  </div>
                                  </div> */}
                                  <div className='col-12 col-md-6 mb-3'>
  <div className='mb-3'>
  <label className="form-check-label" htmlFor="property_for">Property For Sale/Rent</label>
    <select className="form-select" id="property_for" name="property_for" onChange={handleInputChange} required value={formData?.property_for}>
      <option value="">Select Property For Sale/Rent</option>
      <option value="sale">Sale</option>
      <option value="rent">Rent</option>
    </select>
  </div>
</div>

<div className='col-12 col-md-6 mb-3'>
  <label className="form-check-label" htmlFor="commercial_property_type">Commercial Property Type</label>
    <select className="form-select" id="commercial_property_type" name="commercial_property_type"  onChange={handleInputChange} value={formData?.commercial_property_type} disabled={!(formData.property_type === "commercial") } required >
      <option value="">Select Commercial Property Type</option>
      <option value="office space">Office Space</option>
      <option value="shop">Shop</option>
      <option value="showroom">Showroom</option>
      <option value="commercial plot">Commercial Plot</option>
      <option value="commercial land">Commercial Land</option>
      <option value="warehouse">Warehouse</option>
      <option value="other">Other</option>
     
    </select>
  </div>
                                  
                                  <div className="col-12 col-md-6 mb-3">
                                  <label className="form-check-label" htmlFor="bhk">Number of BHK</label>
                <select className="form-select" id="bhk" name="bhk" disabled={formData?.property_type === "plot" || formData?.property_type === "land" || formData?.property_type === "farmLand" || formData.property_type === "commercial"} onChange={handleInputChange}
                value={formData?.bhk} required>
                    <option value="">Select Number of BHK</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                   
                </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
            <label className="form-check-label" htmlFor="new_resale">New/Resale</label>
                <select className="form-select" id="new_resale" value={formData?.new_resale} name="new_resale" onChange={handleInputChange} disabled={formData.property_for === "rent"} required>
                    <option value="">Select New/Resale</option>
                    <option value="new">New</option>
                    <option value="resale">Resale</option>
                
                </select>
            </div>
            <div className="col-12 col-md-6 mb-3">
            <label className="form-check-label" htmlFor="structure">Structure</label>
                <select className="form-select" id="structure" name="structure" disabled={formData?.property_type === "plot" || formData?.property_type === "land" || formData?.property_type === "farmLand" || formData.property_type === "commercial"} onChange={handleInputChange} value={formData?.structure} required>
                    <option value="">Select structure</option>
                    <option value="Simplex">Simplex</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Triplex">Triplex</option>
                    <option value="Fourplex">Fourplex</option>
                
                </select>
            </div>
            <div className='col-12 col-md-6 mb-3'>
            <label className="form-check-label" htmlFor="tncp">TNCP Approved</label>
                    <select className="form-select" id="tncp" value={formData?.tncp} name="tncp" onChange={handleInputChange} disabled={formData?.property_for === "rent"  } required>
                    <option value="">IS TNCP Approved ?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    </select>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="rera">RERA Number</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='rera' placeholder="RERA Number" disabled={formData.property_for === "rent"} onChange={handleInputChange}  value={formData?.rera}/>
                    </div>
          

                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="Price">Price</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='price' placeholder="Price" onChange={handleInputChange} value={formData?.price} required/>
                    </div>
                   
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="square_ft">Square ft</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='square_ft' placeholder="Square ft" onChange={handleInputChange} value={formData?.square_ft} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="dimension">Dimension</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='dimension' placeholder="Dimension" onChange={handleInputChange} value={formData?.dimension} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="car_parking">Car Parking</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='car_parking' placeholder="Car Parking" disabled={formData?.property_type === "plot" || formData?.property_type === "land" || formData?.property_type === "farmLand" || formData?.commercial_property_type === "commercial plot" ||  formData?.commercial_property_type === "commercial land"  } onChange={handleInputChange} value={formData?.car_parking} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="year_built">Year Built</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='year_built' placeholder="Year Built" disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land"  } onChange={handleInputChange} value={formData?.year_built} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="facing">Facing</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='facing' placeholder="Facing" onChange={handleInputChange} value={formData?.facing} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="furnishing">Furnishing</label>
                    
                    <select className="form-select" id="exampleInputEmail1" name="furnishing" disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } onChange={handleInputChange}  value={formData?.furnishing}  required>
                    <option value="">Select furnishing</option>
                    <option value="Full Furnished">Full Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Not Furnished">Not Furnished</option>
                    
                
                </select>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="carpet_area">Carpet Area</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='carpet_area' placeholder="Carpet Area" disabled={formData?.property_type === "plot" || formData?.property_type === "land" || formData?.property_type === "farmLand" || formData?.commercial_property_type === "commercial plot" ||  formData?.commercial_property_type === "commercial land"  } onChange={handleInputChange} value={formData?.carpet_area} required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="bathroom">Bathroom</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='bathroom' placeholder="Bathroom" onChange={handleInputChange} value={formData?.bathroom} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial" } required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="property_on_floor">Property On Floor</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='property_on_floor' placeholder="Property On Floor" onChange={handleInputChange} value={formData?.property_on_floor} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="flooring">Flooring</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='flooring' placeholder="Flooring" onChange={handleInputChange} value={formData?.flooring} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land"  } required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="age_of_property">Age Of Property</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='age_of_property' placeholder="Age Of Property" onChange={handleInputChange} value={formData?.age_of_property} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } required/>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="parking">Parking</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='parking' placeholder="Parking" disabled={formData?.property_type === "plot" || formData?.property_type === "land" || formData?.property_type === "farmLand" || formData?.commercial_property_type === "commercial plot" ||  formData?.commercial_property_type === "commercial land"  } onChange={handleInputChange} value={formData?.parking} required/>
                    </div>
                    
                    <div className="col-12 col-md-6 mb-3">
                    <label className="form-check-label" htmlFor="lift">Lift</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='lift' placeholder="Lift" onChange={handleInputChange} value={formData?.lift} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land"  } required/>
                    </div>
                
                </div>
            </div>
        </div>

        <div className="row mb-4 p-4 border-bottom">
            <div className="col-12">
                <h5 className='mb-4'>SPECIAL HIGHLIGHTS :</h5>
                <div className="row">
                 
                    <div className='col-12 col-md-3 mb-3'>
                       
                       
                        <label className="form-check-label" htmlFor="common_visitor_parking">Good No. of Common/Visitor Parking</label>   
                    <select className="form-select" value={formData?.common_visitor_parking} id="common_visitor_parking" name="common_visitor_parking" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" } required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    
                    </div>
                    <div className='col-12 col-md-3 mb-3'>
                        

                        <label className="form-check-label" htmlFor="main_road_facing">Main Road Facing</label>   
                    <select className="form-select" id="main_road_facing" name="main_road_facing" onChange={handleInputChange}  value={formData?.main_road_facing}  required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                   
                    </div>
                    <div className='col-12 col-md-3 mb-3 d-none'>
                        
                    <label className="form-check-label" htmlFor="working_24_7">24 X 7 working</label>   
                    <select className="form-select" id="working_24_7" name="working_24_7" onChange={handleInputChange}  value={formData?.working_24_7} >
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    
                    </div>
                
                   
                    <div className='col-12 col-md-3 mb-3'>
                    <label className="form-check-label" htmlFor="attractive_entrance_gate">Attractive entrance gate</label>   
                    <select className="form-select" id="attractive_entrance_gate" name="attractive_entrance_gate" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" }  value={formData?.attractive_entrance_gate}  required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                   
                    <div className='col-12 col-md-3 mb-3'>
                       
                    <label className="form-check-label" htmlFor="immediate_possession">Immediate possession</label>   
                    <select className="form-select" id="immediate_possession" name="immediate_possession" onChange={handleInputChange} disabled={formData.property_for === "rent"}  value={formData?.immediate_possession}  required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                    
                  
                   
                    <div className='col-12 col-md-3 mb-3'>
                      
                    <label className="form-check-label" htmlFor="environment_clearance_available">Environment Clearance Available</label>   
                    <select className="form-select" id="environment_clearance_available" name="environment_clearance_available" onChange={handleInputChange} value={formData?.environment_clearance_available} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                                 
                    
                </div>
            </div>
        </div>

        <div className="row mb-4 p-4 border-bottom">
            <div className="col-12">
                <h5 className='mb-4'>INTERNAL AMENITIES :</h5>
                <div className="row">
                   

                   
                        <div className='col-12 col-md-3 mb-3'>
                        
                        <label className="form-check-label" htmlFor="fall_ceiling">Fall Ceiling</label>   
                        <select className="form-select" id="fall_ceiling" name="fall_ceiling" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" ||  formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } value={formData?.fall_ceiling}   required>
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        </select>
                        </div>

                        <div className='col-12 col-md-3 mb-3'>
                        
                        <label className="form-check-label" htmlFor="wallpaper">Wallpaper</label>   
                        <select className="form-select" id="wallpaper" name="wallpaper" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" ||  formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } value={formData?.wallpaper} required>
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        </select>
                        </div>

                        <div className='col-12 col-md-3 mb-3'>
                        
                        <label className="form-check-label" htmlFor="lights">Lights</label>   
                        <select className="form-select" id="lights" name="lights" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" ||  formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } value={formData?.lights} required>
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        </select>
                        </div>

                        <div className='col-12 col-md-3 mb-3'>
                        
                        <label className="form-check-label" htmlFor="fans">Fans</label>   
                        <select className="form-select" id="fans" name="fans" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" ||  formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } value={formData?.fans} required>
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        </select>
                        </div>

                        <div className='col-12 col-md-3 mb-3'>
                        
                        <label className="form-check-label" htmlFor="modularKitchen">Modular Kitchen</label>   
                        <select className="form-select" id="modularKitchen" name="modularKitchen" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" ||  formData.property_type === "commercial"  } value={formData?.modularKitchen}required>
                        <option value="">Select</option>
                        <option value="Full Modular">Full Modular</option>
                        <option value="Semi Modular">Semi Modular</option>
                        <option value="Non Modular">Non Modular</option>
                        </select>
                        </div>
                      
                        <div className='col-12 col-md-3 mb-3'>
                       
                       <label className="form-check-label" htmlFor="air_conditioning">Air conditioning</label>   
                       <select className="form-select" id="air_conditioning" name="air_conditioning" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } value={formData?.air_conditioning}required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>
                       <div className='col-12 col-md-3 mb-3'>
                           
                       <label className="form-check-label" htmlFor="internet">Internet</label>   
                       <select className="form-select" id="internet" name="internet" onChange={handleInputChange} required disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" } value={formData?.internet}>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>

                       <div className='col-12 col-md-3 mb-3'>
                       
                       <label className="form-check-label" htmlFor="cable_tv">Cable TV</label>   
                       <select className="form-select" id="cable_tv" name="cable_tv" onChange={handleInputChange} required disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial"} value={formData?.cable_tv}>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>
                       <div className='col-12 col-md-3 mb-3'>
                          
                       <label className="form-check-label" htmlFor="computer">Computer</label>   
                       <select className="form-select" id="computer" name="computer" onChange={handleInputChange} required disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land"}
                       value={formData?.computer}>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>
                       <div className='col-12 col-md-3 mb-3'>
                           
                       <label className="form-check-label" htmlFor="dishwasher">Dishwasher</label>   
                       <select className="form-select" id="dishwasher" name="dishwasher" onChange={handleInputChange} required disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial"}  value={formData?.dishwasher}>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>

                       
                    <div className='col-12 col-md-3 mb-3'>
                        
                    <label className="form-check-label" htmlFor="good_ceiling_height">Good Ceiling Height</label>   
                    <select className="form-select" id="good_ceiling_height" name="good_ceiling_height" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" ||  formData.commercial_property_type === "commercial plot" ||  formData.commercial_property_type === "commercial land" }  value={formData?.good_ceiling_height} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                   
                   
                   
                   
                   
                   
                                 
                    
                </div>
            </div>
        </div>


        <div className="row mb-4 p-4 border-bottom">
            <div className="col-12">
                <h5 className='mb-4'>EXTERNAL AMENITIES :</h5>
                <div className="row">
                    
                <div className='col-12 col-md-3 mb-3'>
                        
                        <label className="form-check-label" htmlFor="landscape_garden">Landscape Garden</label>   
                        <select className="form-select" id="landscape_garden" name="landscape_garden" onChange={handleInputChange} disabled={ formData.property_type === "commercial" }  value={formData?.landscape_garden}  required>
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                        </select>
                        </div>

                    <div className='col-12 col-md-3 mb-3'>
                       
                    <label className="form-check-label" htmlFor="swimming_pool">Swimming pool</label>   
                    <select className="form-select" id="swimming_pool" name="swimming_pool" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial"}  value={formData?.swimming_pool} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    
                    </div>

                    <div className='col-12 col-md-3 mb-3'>
                       
                       <label className="form-check-label" htmlFor="water_supply_24_7">Water Supply</label>   
                       <select className="form-select" id="water_supply_24_7" name="water_supply_24_7" onChange={handleInputChange}   value={formData?.water_supply_24_7} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>
                       <div className='col-12 col-md-3 mb-3'>
                          
                       <label className="form-check-label" htmlFor="bore_well_water_24_7">Bore well</label>   
                       <select className="form-select" id="bore_well_water_24_7" name="bore_well_water_24_7" onChange={handleInputChange}  value={formData?.bore_well_water_24_7} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>

                       <div className='col-12 col-md-3 mb-3'>
                          
                       <label className="form-check-label" htmlFor="road">Road</label>   
                       <select className="form-select" id="road" name="road" onChange={handleInputChange}  value={formData?.road} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>

                       <div className='col-12 col-md-3 mb-3'>
                          
                       <label className="form-check-label" htmlFor="drainage">Drainage</label>   
                       <select className="form-select" id="drainage" name="drainage" onChange={handleInputChange}  value={formData?.drainage} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>

                       <div className='col-12 col-md-3 mb-3'>
                          
                       <label className="form-check-label" htmlFor="roadLight">Road Light</label>   
                       <select className="form-select" id="roadLight" name="roadLight" onChange={handleInputChange}  value={formData?.roadLight} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>


                       
                    <div className='col-12 col-md-3 mb-3'>
                        
                    <label className="form-check-label" htmlFor="terrace">Terrace</label>   
                    <select className="form-select" id="terrace" name="terrace" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial"} value={formData?.terrace} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>

                    <div className='col-12 col-md-3 mb-3'>
                       
                       <label className="form-check-label" htmlFor="good_natural_light">Good Natural Light</label>   
                       <select className="form-select" id="good_natural_light" name="good_natural_light" onChange={handleInputChange} value={formData?.good_natural_light} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>
                   
                    <div className='col-12 col-md-3 mb-3'>
                       
                    <label className="form-check-label" htmlFor="balcony">Balcony</label>   
                    <select className="form-select" id="balcony" name="balcony" onChange={handleInputChange} required disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial" } value={formData?.balcony}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                   
                    {/* <div className='col-12 col-md-3 mb-3'>
                     
                    <label className="form-check-label" htmlFor="near_green_zone">Near Green Zone</label>   
                    <select className="form-select" id="near_green_zone" name="near_green_zone" onChange={handleInputChange} value={formData?.near_green_zone} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div> */}
                    <div className='col-12 col-md-3 mb-3'>
                        
                    <label className="form-check-label" htmlFor="near_temple">Temple</label>   
                    <select className="form-select" id="near_temple" name="near_temple" onChange={handleInputChange} disabled={ formData.property_type === "commercial" } value={formData?.near_temple} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                    <div className='col-12 col-md-3 mb-3 d-none'>
                     
                    <label className="form-check-label" htmlFor="entry_gate">Entry Gate</label>   
                    <select className="form-select" id="entry_gate" name="entry_gate" onChange={handleInputChange} >
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>

                    <div className='col-12 col-md-3 mb-3'>
                       
                       <label className="form-check-label" htmlFor="gated_community">Gated community</label>   
                       <select className="form-select" id="gated_community" name="gated_community" onChange={handleInputChange} disabled={ formData.property_type === "commercial" } value={formData?.gated_community} required>
                       <option value="">Select</option>
                       <option value="1">Yes</option>
                       <option value="0">No</option>
                       </select>
                       </div>
                    <div className='col-12 col-md-3 mb-3'>
                        
                    <label className="form-check-label" htmlFor="activity_area">Activity Area</label>   
                    <select className="form-select" id="activity_area" name="activity_area" onChange={handleInputChange} disabled={formData.property_type === "plot" || formData.property_type === "land" || formData.property_type === "farmLand" || formData.property_type === "commercial"} required value={formData?.activity_area}>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                    <div className='col-12 col-md-3 mb-3'>
                       
                    <label className="form-check-label" htmlFor="security_24_7">24/7 Security</label>   
                    <select className="form-select" id="security_24_7" name="security_24_7" onChange={handleInputChange} disabled={ formData.property_type === "commercial" } value={formData?.security_24_7} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                                 
                    
                </div>
            </div>
        </div>

        <div className="row mb-4 p-4 border-bottom">
            <div className="col-12">
                <h5 className='mb-4'>RECOMMENDED  :</h5>
                <div className="row">
                    <div className='col-12 col-md-3 mb-3'>
                        
                    <label className="form-check-label" htmlFor="long_term_investment">Long term investment</label>   
                    <select className="form-select" id="long_term_investment" name="long_term_investment" onChange={handleInputChange} value={formData?.long_term_investment}  required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                    <div className='col-12 col-md-3 mb-3'>
                       
                    <label className="form-check-label" htmlFor="own_purpose">Own purpose</label>   
                    <select className="form-select" id="own_purpose" name="own_purpose" onChange={handleInputChange} 
                    value={formData?.own_purpose} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                    <div className='col-12 col-md-3 mb-3'>
                        
                    <label className="form-check-label" htmlFor="investment">Investment</label>   
                    <select className="form-select" id="investment" name="investment" onChange={handleInputChange} value={formData?.investment} required>
                    <option value="">Select</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                    </select>
                    </div>
                    
                   
                                 
                    
                </div>
            </div>
        </div>

        <div className="row mb-4 p-4 border-bottom">
            <div className="col-12 text-center ">
                              <button type="submit" class="btn btn-primary me-4" data-mdb-ripple-init>Submit</button>
                              <button type="button" class="btn btn-secondary" data-mdb-ripple-init>Cancle</button>
            </div>
        </div>
    






        </form>
         </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </Container>
   
    </>
  )
}

export default EditProperty

const Container = styled.div`
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
    
`;

