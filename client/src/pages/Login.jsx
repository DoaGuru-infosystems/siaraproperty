import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import cogoToast from "cogo-toast";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { getAppUrl } from "../config/axios";

const Login = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector(
    (state) => state.user || {},
  );
  const location = useLocation();
  const canonicalUrl = getAppUrl(location.pathname);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post(
        "/api/property/login",
        formData,
      );

      if (res.data && res.data.success === true) {
        dispatch(signInSuccess(res.data));
        console.log(res.data);
        cogoToast.success(`${res.data.message}`);
        navigate("/");
        return;
      }
      if (res.data && res.data.success === false) {
        dispatch(signInFailure(res.data));
        cogoToast.error(`${res.data.message}`);
        return;
      }
    } catch (err) {
      if (err.response && err.response.data) {
        dispatch(signInFailure(err.response.data));
        console.log(error);
        cogoToast.error(`${err.response.data.message}`);
      }
    }
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    if (currentUser) {
      cogoToast.error(`Already loged In`);
      navigate("/");
      const handleTop = () => {
        window.scrollTo(0, 0);
      };
      handleTop();
    }
  }, []);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };
  return (
    !currentUser && (
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
                <h1>Login</h1>
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
                <p className="mb-0">
                  Don't have an account?{" "}
                  <span>
                    <Link to="/register">Signup</Link>
                  </span>
                </p>
                <p className="text-center">
                  <Link to="/forgot-password">Forgot Password</Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </>
    )
  );
};

export default Login;
const Container = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  .boxContainer {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

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
