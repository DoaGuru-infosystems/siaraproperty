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
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c28 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 100px;

  .boxContainer {
    width: 100%;
    max-width: 440px;
  }

  .formcontent {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 3rem 2.5rem;
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);

    h1 {
      text-align: center;
      font-family: "Cormorant Garamond", serif;
      font-size: 36px;
      color: #faf8f3;
      margin-bottom: 0.5rem;
      margin-top: 0;
      font-weight: 500;
    }

    .subtitle {
      text-align: center;
      color: #a0a09c;
      font-family: "DM Sans", sans-serif;
      font-size: 14px;
      margin-bottom: 2.5rem;
    }

    .input-group, .mb-3 {
      margin-bottom: 1.5rem;

      label {
        display: block;
        color: #e2d9cc;
        font-family: "DM Sans", sans-serif;
        font-size: 13px;
        margin-bottom: 0.5rem;
        letter-spacing: 0.02em;
      }

      input {
        width: 100%;
        padding: 14px 16px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        color: #faf8f3;
        font-family: "DM Sans", sans-serif;
        font-size: 15px;
        transition: all 0.3s ease;
        box-sizing: border-box;

        &::placeholder {
          color: #7a7a75;
        }

        &:focus {
          outline: none;
          border-color: #b8895a;
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 0 3px rgba(184, 137, 90, 0.1);
        }
      }
    }

    .action-group, .d-flex {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    .btn-submit, .btn-success {
      width: 100%;
      padding: 14px;
      background: #b8895a;
      color: white;
      border: none;
      border-radius: 8px;
      font-family: "DM Sans", sans-serif;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.05em;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #a37648;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(184, 137, 90, 0.2);
      }

      &:disabled {
        background: #5a5a54;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
    }

    .footer-links, p {
      text-align: center;
      font-family: "DM Sans", sans-serif;
      font-size: 14px;
      color: #a0a09c;

      p {
        margin: 0.5rem 0;
      }

      a {
        color: #b8895a;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;

        &:hover {
          color: #d1a578;
        }
      }

      .forgot-link {
        font-size: 13px;
        color: #7a7a75;
        
        &:hover {
          color: #b8895a;
        }
      }
    }
  }
`;

