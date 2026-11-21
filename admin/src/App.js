import React from 'react'
import { Route, Routes,Navigate } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import FooterAd from './components/FooterAd';

import AllProperties from "./components/AllProperties";
import RegistrationAd from "./pages/RegistrationAd";
import LoginAd from "./pages/LoginAd";

import SingleProperty from "./components/SingleProperty/SingleProperty";

import ForgotPassword from './pages/ForgotPassword';
import Registered_User from './components/User_data/Registered_User';
import Interested_User from './components/User_data/Interested_User';
import Contact_User from './components/User_data/Contact_User';
import AddProperty from './components/AddProperty';
import AddImages from './components/AddImages';
import { useDispatch, useSelector } from "react-redux";
import EditProperty from './components/EditProperty';
import EditImages from './components/EditImages';
import PrivateRoute from './components/PrivateRoute';
import SoldProperties from './components/SoldProperties';
import SuggestedProperty from './components/SuggestedProperty';
import ResetPassword from './pages/ResetPassword';
import AllBlogs from './components/AllBlogs';
import AddBlog from './components/AddBlog';
import EditBlog from './components/EditBlog';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const {currentAdmin} = useSelector((state) => state.admin)
  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
     <div className="" style={{overflowX:"hidden"}}>
     
      <Routes>
        
        
        <Route path='/' element={currentAdmin ? <AdminHome/> :<Navigate to="/admin_login"/> } />
        <Route path="/allproperties" element={ currentAdmin ? <AllProperties/> : <NotFound />} />
        <Route path="/soldproperties" element={ currentAdmin ? <SoldProperties/> : <NotFound />} />
       {/* <PrivateRoute path="/allproperties" element={<AllProperties />} />  */}
        {/* <Route path="/admin_register" element={currentAdmin ?  <AdminHome/> :<RegistrationAd/>} /> */}
        <Route path="/admin_forgot" element={ currentAdmin ?  <AdminHome/> :<ForgotPassword/>} />
        <Route path="/reset-password/:id/:token" element={ currentAdmin ?  <AdminHome/> :<ResetPassword/>} />
        <Route path="/admin_login"  element={currentAdmin ?  <AdminHome/> : <LoginAd/>} />
        
      
        <Route path="/registered_user" element={currentAdmin ? <Registered_User/>:<NotFound />}/>
        <Route path="/interested_user" element={ currentAdmin ?<Interested_User/>:<NotFound />} />
        <Route path="/contact_user" element={ currentAdmin ? <Contact_User/> :<NotFound />} />


        <Route path="/admin/add-property" element={currentAdmin ? <AddProperty/> :<NotFound />} />
        <Route path="/admin/add-property/add-images/:propertyId" element={currentAdmin ?<AddImages/> :<NotFound />} />
        <Route path="/admin/suggested-property" element={currentAdmin ?<SuggestedProperty/>  :<NotFound />} />
        <Route path="/property/:propertyId" element={currentAdmin ?<SingleProperty/>:<NotFound />} />
        <Route path="/property/edit-property/:propertyId" element={currentAdmin ?<EditProperty/>:<NotFound />} />
        <Route path="/property/edit-property-images/:propertyId" element={currentAdmin ?<EditImages/>:<NotFound />} />
        <Route path="/admin/all-blogs" element={currentAdmin ? <AllBlogs/> : <NotFound />} />
        <Route path="/admin/add-blog" element={currentAdmin ? <AddBlog/> : <NotFound />} />
        <Route path="/admin/edit-blog/:id" element={currentAdmin ? <EditBlog/> : <NotFound />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      {/* <FooterAd /> */}
      </div>
    </>
  )
}

export default App