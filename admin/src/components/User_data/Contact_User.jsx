



import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar';
import SiderbarMob from '../SiderbarMob';
import NavbarAd from '../NavbarAd';
import axios from 'axios';
import moment from "moment";
import cogoToast from 'cogo-toast';
import { useSelector } from "react-redux";
import { BASE_URL } from '../../config';

function  Contact_User() {
  const {currentAdmin} = useSelector((state) => state.admin);
  const token = currentAdmin?.token;
    const [user, setUser] = useState([]);
    console.log(user)

    useEffect(()=>{
      const fetchUser = async() =>{

          try{
            const res = await axios.get(`${BASE_URL}/api/property/getContactedUsers`);

            console.log(res);
            if(res?.data.success){
             setUser(res?.data.data)
            }
            else{
             console.log(res?.error)
            }
          }
          catch(err){
            console.log(err)
          }
        
      }
      fetchUser();
    },[])


    const handleDelete = async(id)=>{
        // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to Delete?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
      try{
        const res = await axios.delete(`${BASE_URL}/api/property/deleteContactedUser/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(res);
        if(res?.data.success){
         cogoToast.success(res?.data?.message);
             // Update state to remove the deleted user without a page reload
      setUser((prevUsers) => prevUsers.filter((user) => user.id !== id));
        }
        else{
         console.log(res?.error)
         cogoToast.error(res?.data?.message || "Something went wrong")
        }
      }
      catch(err){
        console.log(err)
      }
    }

    const [currentPage, setCurrentPage] =
    useState(1);
  const studentsPerPage = 10;

    const nextPage = () =>
    setCurrentPage(currentPage + 1);
  const prevPage = () =>
    setCurrentPage(currentPage - 1);


    const indexOfLastStudent =
    currentPage * studentsPerPage;
  const indexOfFirstStudent =
    indexOfLastStudent -
    studentsPerPage;
  const currentuser =
    user.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );
 
  return (
   <Wrapper>
    <NavbarAd/>
  <div className="row flex-nowrap">
    <div className="col-lg-2 col-1" id='sider'>
    <Sidebar/>
    </div>
    <div className="col-lg-2 col-1" id='sider1'>
    <SiderbarMob/>
    </div>
   
    <div className="col-lg-10 mt-2" id='set'>
      <div className="row">
   <div className="col-lg-12">
  <div className="widget-area-2 proclinic-box-shadow " id='tableres'>
                    <h5 className="widget-title" id='title'>Contacted User</h5>
                    <h5 className="total" >Total - {user?.length}</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>User Name</th>
                              <th>Phone Number</th>
                              <th>Email</th>
                              <th>Message</th>

                              <th>Contacted At</th>
                              <th></th>
                            
                            
                             
                            </tr>
                          </thead>
                          
                      {user && user?.length > 0 ?  
                      <>
                     {user && user?.length > 0 &&  currentuser?.map((user,index) => {
                      const serialNumber = indexOfFirstStudent + index + 1; // Calculate serial number
                      return (
                        <tbody key={user?.id}>
                        <tr>
                          <td>{serialNumber}</td>
                          <td>{user?.name}</td>
                          <td>{user?.phone}</td>
                          <td>{user?.email}</td>
                          <td>{user?.message}</td>

                          <td>{moment(user?.created_at).format('DD/MM/YYYY')}</td>
                          <td><button type="button" className="btn btn-danger" onClick={()=> handleDelete(user?.id)}>Delete</button></td>
                    

                        
                          
                        </tr>
                       
                        
                      </tbody>
                      )
                     }

                     )}
                     </>
                     :
                     <>
                     <p className='mt-2'>
                     No User Found
                     </p>
                     </>
                     }
                     </table>
                      </div>
                      <div className="pagination-section mt-3">
              <div className="pagination">
                <button
                  onClick={prevPage}
                  disabled={
                    currentPage === 1
                  }
                  className="btn btn-danger">
                  Previous
                </button>
                <span className="fs-4 mx-3">
                  {currentPage}
                </span>
                <button
                  onClick={nextPage}
                  className="btn btn-success"
                  disabled={
                    currentuser.length <
                    studentsPerPage
                  }>
                  Next
                </button>
              </div>
            </div>
                  </div>
   </div>
  



  </div>
   </div>
   </div>


    
   
   
   
   </Wrapper>
  )
}

export default  Contact_User;

const Wrapper = styled.div`
  #sider{
    display: block;
    @media screen and (max-width: 768px) {
   
    display: none;
    
  }
}
  #sider1{
    display: none;
    @media screen and (max-width: 768px) {
   
   display: block;
   
 }
   
  }
  #tableres{
    margin-top: 5rem;
    
  }
  th {
    
    text-align: start;
    white-space: nowrap;
    
    
    
  }
  td {
    
    text-align: start;
   
    overflow: hidden;
  text-overflow: ellipsis;
 
}
     
  
 
  .table-responsive{
    max-height: 35rem; /* Adjust the max height as needed */
  overflow-y: auto;
  @media screen and (max-width: 768px) {
  width: 20rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
  width: 42rem;
  }
  @media screen and (min-width: 1020px) and (max-width: 1600px) {
  width: 72rem;
  margin-left: 2rem;
  }
  }
  #title{
    margin-top: 5rem;
  @media screen and (max-width: 768px) {
    margin-left: 2rem;
  }
  @media screen and (min-width: 768px) and (max-width: 1020px) {
    margin-left: 0rem;
  }
  @media screen and (min-width: 1020px) and (max-width: 1600px) {
  
  margin-left: 2rem;
  }
  }
  .total{
    @media screen and (max-width: 768px) {
    margin-left: 2rem;
  }
    
  }

`




