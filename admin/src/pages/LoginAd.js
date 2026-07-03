import React, { useState } from 'react';
import styled from 'styled-components';
import NavbarAd from '../components/NavbarAd';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { BASE_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from "../redux/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";

function LoginAd() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.admin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      cogoToast.warn('Please fill in all fields');
      return;
    }

    try {
      dispatch(signInStart());
      const res = await axios.post(`${BASE_URL}/api/property/admin-login`, formData);
      if (res.data && res.data.success === true) {
        dispatch(signInSuccess(res.data));
        cogoToast.success(res.data.message || 'Login successful!');
        navigate("/");
        return;
      }
      if (res.data && res.data.success === false) {
        dispatch(signInFailure(res.data));
        cogoToast.error(res.data.message || 'Login failed');
        return;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
      dispatch(signInFailure(err.response?.data || { message: errorMsg }));
      cogoToast.error(errorMsg);
    }
  };

  return (
    <Wrapper>
      <NavbarAd />
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <div className="logo-badge">SP</div>
            <h1>Welcome Back</h1>
            <p>Sign in to manage your Siara Properties panel</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="spinner-wrapper">
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="card-footer">
            <Link to="/admin_forgot" className="forgot-link">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default LoginAd;

const Wrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

  min-height: 100vh;
  width: 100%;
  background: radial-gradient(circle at top right, #1e1b4b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  font-family: 'Plus Jakarta Sans', sans-serif;

  .login-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 120px 20px 40px; /* Offset for fixed top navbar */
  }

  .login-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 24px;
    width: 100%;
    max-width: 440px;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.6s ease-out;
  }

  .card-header {
    text-align: center;
    margin-bottom: 32px;

    .logo-badge {
      width: 48px;
      height: 48px;
      background: #b8895a;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      box-shadow: 0 8px 16px rgba(184, 137, 90, 0.25);
    }

    h1 {
      font-family: 'Cormorant Garamond', Georgia, serif;
      color: #ffffff;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: -0.01em;
    }

    p {
      color: #94a3b8;
      font-size: 14px;
      line-height: 1.5;
    }
  }

  .input-group {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      color: #cbd5e1;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;

      .input-icon {
        position: absolute;
        left: 16px;
        color: #64748b;
        display: flex;
        align-items: center;
        pointer-events: none;
        transition: color 0.2s ease;
      }

      input {
        width: 100%;
        padding: 14px 16px 14px 48px;
        background: rgba(15, 23, 42, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: #ffffff;
        font-size: 15px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        transition: all 0.3s ease;

        &::placeholder {
          color: #475569;
        }

        &:focus {
          outline: none;
          border-color: #b8895a;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 0 0 3px rgba(184, 137, 90, 0.15);

          & + .input-icon {
            color: #b8895a;
          }
        }
      }
    }
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: #b8895a;
    color: #ffffff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;

    &:hover:not(:disabled) {
      background: #a37549;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(184, 137, 90, 0.3);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      background: rgba(184, 137, 90, 0.5);
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .card-footer {
    text-align: center;
    margin-top: 24px;

    .forgot-link {
      color: #94a3b8;
      font-size: 14px;
      text-decoration: none;
      transition: color 0.2s ease;
      font-weight: 500;

      &:hover {
        color: #b8895a;
      }
    }
  }

  /* Spinner Animation */
  .spinner-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .spinner {
    animation: rotate 2s linear infinite;
    width: 20px;
    height: 20px;
    
    & .path {
      stroke: #ffffff;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;