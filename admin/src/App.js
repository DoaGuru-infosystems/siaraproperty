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




function App() {
  const {currentAdmin} = useSelector((state) => state.admin)
  return (
    <>
     <div className="" style={{overflowX:"hidden"}}>
     
      <Routes>
        
        
        <Route path='/' element={currentAdmin ? <AdminHome/> :<Navigate to="/admin_login"/> } />
        <Route path="/allproperties" element={ currentAdmin ? <AllProperties/> :  <Navigate to="/admin_login" />} />
        <Route path="/soldproperties" element={ currentAdmin ? <SoldProperties/> :  <Navigate to="/admin_login" />} />
       {/* <PrivateRoute path="/allproperties" element={<AllProperties />} />  */}
        {/* <Route path="/admin_register" element={currentAdmin ?  <AdminHome/> :<RegistrationAd/>} /> */}
        <Route path="/admin_forgot" element={ currentAdmin ?  <AdminHome/> :<ForgotPassword/>} />
        <Route path="/reset-password/:id/:token" element={ currentAdmin ?  <AdminHome/> :<ResetPassword/>} />
        <Route path="/admin_login"  element={currentAdmin ?  <AdminHome/> : <LoginAd/>} />
        
      
        <Route path="/registered_user" element={currentAdmin ? <Registered_User/>:<Navigate to="/admin_login"/>}/>
        <Route path="/interested_user" element={ currentAdmin ?<Interested_User/>:<Navigate to="/admin_login"/>} />
        <Route path="/contact_user" element={ currentAdmin ? <Contact_User/> :<Navigate to="/admin_login"/>} />


        <Route path="/admin/add-property" element={currentAdmin ? <AddProperty/> :<Navigate to="/admin_login"/>} />
        <Route path="/admin/add-property/add-images/:propertyId" element={currentAdmin ?<AddImages/> :<Navigate to="/admin_login"/>} />
        <Route path="/admin/suggested-property" element={currentAdmin ?<SuggestedProperty/>  :<Navigate to="/admin_login"/>} />
        <Route path="/property/:propertyId" element={currentAdmin ?<SingleProperty/>:<Navigate to="/admin_login"/>} />
        <Route path="/property/edit-property/:propertyId" element={currentAdmin ?<EditProperty/>:<Navigate to="/admin_login"/>} />
        <Route path="/property/edit-property-images/:propertyId" element={currentAdmin ?<EditImages/>:<Navigate to="/admin_login"/>} />
        <Route path="/admin/all-blogs" element={currentAdmin ? <AllBlogs/> : <Navigate to="/admin_login"/>} />
        <Route path="/admin/add-blog" element={currentAdmin ? <AddBlog/> : <Navigate to="/admin_login"/>} />
        <Route path="/admin/edit-blog/:id" element={currentAdmin ? <EditBlog/> : <Navigate to="/admin_login"/>} />

      </Routes>
      {/* <FooterAd /> */}
      </div>
    </>
  )
}

export default App