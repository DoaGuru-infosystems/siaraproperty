import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";

import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";

const Registration = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/property/register",
        formData,
      );
      setLoading(false);
      console.log(res);
      if (res.data.success === true) {
        cogoToast.success(`${res.data.message}`);
        navigate("/login");
      }
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
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
        <div>
          <div className="boxContainer">
            <div className="formcontent">
              <h1>Register</h1>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Fullname
                </label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  name="phone"
                  maxLength={10}
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  disabled={loading}
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
              <p>
                Allready have an account?{" "}
                <span>
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Registration;
const Container = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );

  .boxContainer {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    .formcontent {
      background-color: #0dcaf0;
      padding: 1rem 2rem;
      border-radius: 1rem;
      height: auto;
      box-shadow: 1px 2px 34px #38c7e4;
      h1 {
        text-align: center;
        font-family: monospace;
        margin: 1rem 0;
        color: #08494c;
      }
      .form-label {
        margin-bottom: 0rem !important;
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
