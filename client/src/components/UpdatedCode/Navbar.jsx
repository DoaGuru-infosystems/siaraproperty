// components/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Replaces BOTH old Navbar.jsx + NavbarMob.jsx
// Uses the new cream/terra design from the HTML mockup.
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
import styled from "styled-components";
import logo from "../../images/Real-Estate-Logo.png";
// import logo from "../images/Real-Estate-Logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();

  // ── scroll shadow ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to Logout?")) return;
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <>
      <NavBar className={scrolled ? "scrolled" : ""}>
        {/* ── LOGO ── */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <div className="nav-logo-mark">SP</div>
          <span>Siara Properties</span>
        </Link>

        {/* ── DESKTOP LINKS ── */}
        <ul className="nav-links desktop-only">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* ── DESKTOP AUTH ── */}
        <div className="nav-actions desktop-only">
          {currentUser ? (
            <div className="user-dropdown">
              <button className="btn-user">{currentUser?.user?.name} ▾</button>
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register">
                <button className="btn-outline">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn-fill">Login</button>
              </Link>
            </>
          )}
        </div>

        {/* ── HAMBURGER ── */}
        <button
          className="hamburger mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? "open" : ""} />
          <span className={menuOpen ? "open" : ""} />
          <span className={menuOpen ? "open" : ""} />
        </button>
      </NavBar>

      {/* ── MOBILE DRAWER ── */}
      <MobileDrawer className={menuOpen ? "show" : ""}>
        <div className="drawer-inner">
          <nav>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>
              Services
            </Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="drawer-auth">
            {currentUser ? (
              <button className="btn-fill w-full" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  <button className="btn-outline w-full">Register</button>
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="btn-fill w-full">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </MobileDrawer>

      {/* overlay */}
      {menuOpen && <Overlay onClick={() => setMenuOpen(false)} />}
    </>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(250, 248, 243, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2d9cc;
  padding: 0 5%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: box-shadow 0.3s ease;

  &.scrolled {
    box-shadow: 0 2px 24px rgba(44, 44, 40, 0.08);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 22px;
    font-weight: 500;
    color: #2c2c28;
    text-decoration: none;
    letter-spacing: 0.02em;
  }

  .nav-logo-mark {
    width: 36px;
    height: 36px;
    background: #b8895a;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 16px;
    font-weight: 600;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 36px;
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      font-size: 13px;
      font-weight: 400;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #5a5a54;
      text-decoration: none;
      transition: color 0.2s;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 100%;
        height: 1px;
        background: #b8895a;
        transition: right 0.3s ease;
      }
      &:hover {
        color: #2c2c28;
        &::after {
          right: 0;
        }
      }
    }
  }

  .nav-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .btn-outline {
    padding: 8px 20px;
    border: 1px solid #2c2c28;
    background: transparent;
    color: #2c2c28;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.25s;
    border-radius: 2px;
    text-transform: uppercase;
    &:hover {
      background: #2c2c28;
      color: white;
    }
  }

  .btn-fill {
    padding: 8px 20px;
    border: 1px solid #b8895a;
    background: #b8895a;
    color: white;
    font-family: "DM Sans", sans-serif;
    font-size: 13px;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all 0.25s;
    border-radius: 2px;
    text-transform: uppercase;
    &:hover {
      background: #8c6340;
      border-color: #8c6340;
    }
  }

  /* user dropdown */
  .user-dropdown {
    position: relative;
    &:hover .dropdown-menu {
      display: flex;
    }
  }
  .btn-user {
    padding: 8px 16px;
    background: transparent;
    border: 1px solid #e2d9cc;
    border-radius: 2px;
    font-size: 13px;
    color: #2c2c28;
    cursor: pointer;
    letter-spacing: 0.04em;
  }
  .dropdown-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: white;
    border: 1px solid #e2d9cc;
    border-radius: 4px;
    min-width: 130px;
    box-shadow: 0 8px 24px rgba(44, 44, 40, 0.08);
    button {
      padding: 10px 16px;
      background: none;
      border: none;
      text-align: left;
      font-size: 13px;
      color: #2c2c28;
      cursor: pointer;
      &:hover {
        background: #faf8f3;
        color: #b8895a;
      }
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: #2c2c28;
      border-radius: 2px;
      transition: all 0.3s ease;
      transform-origin: center;
    }
    span.open:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    span.open:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    span.open:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
  }

  .desktop-only {
    @media (max-width: 960px) {
      display: none !important;
    }
  }
  .mobile-only {
    display: none;
    @media (max-width: 960px) {
      display: flex;
    }
  }
`;

const MobileDrawer = styled.div`
  position: fixed;
  top: 64px;
  left: 0;
  width: 75%;
  max-width: 320px;
  height: calc(100vh - 64px);
  background: #faf8f3;
  z-index: 99;
  transform: translateX(-100%);
  transition: transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
  border-right: 1px solid #e2d9cc;

  &.show {
    transform: translateX(0);
  }

  .drawer-inner {
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;

    a {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #5a5a54;
      text-decoration: none;
      padding: 14px 0;
      border-bottom: 1px solid #f0ebe1;
      transition: color 0.2s;
      &:hover {
        color: #b8895a;
      }
    }
  }

  .drawer-auth {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .w-full {
      width: 100%;
    }

    .btn-outline,
    .btn-fill {
      padding: 12px 20px;
      font-size: 13px;
      letter-spacing: 0.06em;
      cursor: pointer;
      border-radius: 2px;
      text-transform: uppercase;
      font-family: "DM Sans", sans-serif;
    }
    .btn-outline {
      border: 1px solid #2c2c28;
      background: transparent;
      color: #2c2c28;
      &:hover {
        background: #2c2c28;
        color: white;
      }
    }
    .btn-fill {
      border: 1px solid #b8895a;
      background: #b8895a;
      color: white;
      &:hover {
        background: #8c6340;
      }
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(44, 44, 40, 0.3);
  z-index: 98;
  @media (min-width: 961px) {
    display: none;
  }
`;
