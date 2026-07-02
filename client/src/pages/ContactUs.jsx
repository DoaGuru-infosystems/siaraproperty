import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidContact } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

import cogoToast from "cogo-toast";
import axios from "axios";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";

function ContactUs() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if required fields are empty
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      cogoToast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/property/contacted",
        formData,
      );

      console.log(res);
      if (res.data.success === true) {
        cogoToast.success(`${res.data.message}`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error.response);
      cogoToast.error(`${error.response.data.error}`);
    }
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    const handleTop = () => {
      window.scrollTo(0, 0);
    };
    handleTop();
  }, []);

  return (
    <>
      <Container>
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <div className="nav1">
          
        </div>
        <div className="nav2">
          {" "}
        </div>
        <div className="container boxContainer mt-5">
          <div className="row">
            <div className="col-12 mt-5">
              <h4 className="text-center">CONTACT US</h4>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12 col-md-6">
              <ul className="list p-0">
                <div className="d-flex align-items-center gap-3">
                  <span className="display-6">
                    <FaLocationDot />
                  </span>
                  <li className="mt-4">
                    <h6> Office Address</h6>
                    <p>
                      1815 Wright Town, Jabalpur, Madhya pradesh INDIA 482002
                    </p>
                  </li>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="display-6">
                    <BiSolidContact />
                  </span>
                  <li className="mt-5">
                    {" "}
                    <h6>Phone Number </h6>
                    {/* <p> office: +91-8827795555 / +91-7489924666</p> */}
                    <p>Mobile: +91-8839280515</p>
                  </li>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className="display-6">
                    <MdEmail />
                  </span>
                  <li className="mt-5">
                    <h6> Email Address</h6>
                    <p>info@SiaraProperties.com</p>
                  </li>
                </div>
              </ul>
            </div>

            <div className="col-12 col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-4">
                  <input
                    type="text"
                    placeholder="Enter your fullname"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 mt-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 mt-4">
                  <input
                    type="text"
                    placeholder="Enter your 10 digit mobile number"
                    name="phone"
                    maxLength={10}
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    placeholder="Write message"
                    className="form-control"
                    name="message"
                    rows="6"
                    onChange={handleChange}
                    value={formData.message}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ContactUs;

const Container = styled.div`
  .boxContainer {
    .list {
      list-style: none;
    }

    .formcontent {
      background-color: #0dcaf0;
      padding: 1rem;
      border-radius: 1rem;
      height: auto;
      box-shadow: 1px 2px 34px #38c7e4;
      h1 {
        text-align: center;
        font-family: monospace;
        margin: 1rem 0;
        color: #08494c;
      }
    }
  }
  .nav1 {
    display: block;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .nav2 {
    display: none;

    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
`;
