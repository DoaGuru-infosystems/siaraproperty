import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Footer from "./components/UpdatedCode/Footer";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import ReactGA from "react-ga4";

import SingleProperty from "./components/SingleProperty";
import PopularCategory from "./components/PopularCategory";
import Luxuaryhouse from "./components/Luxuaryhouse";
import NavbarMob from "./components/NavbarMob";
import PropertyType from "./components/PropertyType";
import RentedProperties from "./components/RentedProperties";
import SingleBlogDynamic from "./pages/SingleBlogDynamic";
import Flats from "./components/FooterComponents/Flats";
import RentalProperty from "./components/FooterComponents/RentalProperty";
import ResaleProperty from "./components/FooterComponents/ResaleProperty";
import TermsAndCondition from "./pages/TermsAndCondition";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword";
import HomePageNew from "./pages/HomePageNew";
import AboutPageNew from "./pages/AboutPageNew";
import ContactPageNew from "./pages/ContactPageNew";
import ServicesPage from "./pages/ServicesPage";
import AllProperties from "./pages/AllProperties";
import Navbar from "./components/UpdatedCode/Navbar";

const Tracking_Id = "G-0XYJQVFWDJ";
ReactGA.initialize(Tracking_Id);
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

function App() {
  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <Navbar />
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<HomePageNew />} />
          <Route path="/about" element={<AboutPageNew />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/contact" element={<ContactPageNew />} />
          
          {/* Dynamic Blogs Routes */}
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:slug" element={<SingleBlogDynamic />} />

          {/* Properties Routes */}
          <Route path="/properties" element={<AllProperties />} />
          <Route path="/property/:propertyId" element={<SingleProperty />} />
          <Route
            path="/property/propertyType/:propertyType"
            element={<PropertyType />}
          />
          <Route path="/property/:propertyType/:bhk" element={<Flats />} />
          <Route
            path="/property/propertiesForRent"
            element={<RentedProperties />}
          />
          <Route
            path="/property/propertiesForRent/:propertyType"
            element={<RentalProperty />}
          />
          <Route
            path="/property/propertiesForResale/:propertyType"
            element={<ResaleProperty />}
          />
          
          {/* Info Pages */}
          <Route
            path="/info/terms-and-conditions"
            element={<TermsAndCondition />}
          />
          <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
