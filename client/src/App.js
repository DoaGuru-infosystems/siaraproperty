import logo from "./logo.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
// import Footer from "./components/Footer";
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
import Singleblog1 from "./components/Blogs/Single Blogs/Singleblog1";
import Singleblog2 from "./components/Blogs/Single Blogs/Singleblog2";
import Singleblog3 from "./components/Blogs/Single Blogs/Singleblog3";
import Singleblog4 from "./components/Blogs/Single Blogs/Singleblog4";
import Singleblog5 from "./components/Blogs/Single Blogs/Singleblog5";
import Singleblog6 from "./components/Blogs/Single Blogs/Singleblog6";
import Singleblog7 from "./components/Blogs/Single Blogs/Singleblog7";
import Singleblog8 from "./components/Blogs/Single Blogs/Singleblog8";
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

const Tracking_Id = "G-0XYJQVFWDJ";
ReactGA.initialize(Tracking_Id);
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

function App() {
  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<HomePageNew />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/about" element={<AboutPageNew />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          {/* <Route path="/contact" element={<ContactUs />} /> */}
          <Route path="/contact" element={<ContactPageNew />} />
          <Route path="/blog" element={<Blogs />} />
          {/* <Route path="/blog/single-blog" element={<SingleBlog/>} /> */}

          <Route path="/blogs/single-blog1" element={<Singleblog1 />} />
          <Route path="/blogs/single-blog2" element={<Singleblog2 />} />
          <Route path="/blogs/single-blog3" element={<Singleblog3 />} />
          <Route path="/blogs/single-blog4" element={<Singleblog4 />} />
          <Route path="/blogs/single-blog5" element={<Singleblog5 />} />
          <Route path="/blogs/single-blog6" element={<Singleblog6 />} />
          <Route path="/blogs/single-blog7" element={<Singleblog7 />} />
          <Route path="/blogs/single-blog8" element={<Singleblog8 />} />

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
          <Route
            path="/info/terms-and-conditions"
            element={<TermsAndCondition />}
          />
          <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        {/* <Footer /> */}
      {/* ── FOOTER ── */}
      <Footer />
      </div>
    </>
  );
}

export default App;
