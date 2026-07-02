import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import logo from '../images/Makaan_logo.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../redux/admin/adminSlice";

function SiderbarMob() {

  const dispatch = useDispatch();
  const {currentAdmin,loading,error} = useSelector((state) => state.admin);
  const [isOffcanvasVisible, setIsOffcanvasVisible] = useState(false);

  const handleLogout = () => {
    // Display a confirmation popup
    const isConfirmed = window.confirm('Are you sure you want to Logout?');

    if (!isConfirmed) {
      // If the user cancels the deletion, do nothing
      return;
    }
   dispatch(logout())
}
useEffect(() => {
  const handleOffcanvasShow = () => {
    setIsOffcanvasVisible(true);
  };

  const handleOffcanvasHide = () => {
    setIsOffcanvasVisible(false);
  };

  const offcanvasElement = document.getElementById('offcanvasNavbar');
  offcanvasElement.addEventListener('show.bs.offcanvas', handleOffcanvasShow);
  offcanvasElement.addEventListener('hidden.bs.offcanvas', handleOffcanvasHide);

  return () => {
    offcanvasElement.removeEventListener('show.bs.offcanvas', handleOffcanvasShow);
    offcanvasElement.removeEventListener('hidden.bs.offcanvas', handleOffcanvasHide);
  };
}, []);
useEffect(() => {
  document.body.style.overflow = isOffcanvasVisible ? 'hidden' : '';
}, [isOffcanvasVisible]);

  return (
    <Wrapper>
    <nav className="navbar bg-light">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
      <div style={{ width: '32px', height: '32px', background: '#b8895a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '14px', fontWeight: '600' }}>SP</div>
      <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '18px', fontWeight: '500', color: '#2c2c28' }}>Siara Properties</span>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" id='btnside' onClick={() => setIsOffcanvasVisible(!isOffcanvasVisible)}>
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`offcanvas offcanvas-start${isOffcanvasVisible ? ' show' : ''}`} tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title d-flex gap-2 align-items-center" id="offcanvasNavbarLabel">
          <div style={{ width: '30px', height: '30px', background: '#b8895a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '13px', fontWeight: '600' }}>SP</div>
          <span style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '18px', fontWeight: '500', color: '#2c2c28' }}>Siara Properties</span>
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li>
            
                {" "}
                <a className="d-flex gap-2 text-decoration-none">
                  <i className="fs-4 bi bi-house-door-fill"></i>
                  <br />
                  <span className=" text-black  mt-2 mx-2" id="navleft1">
                  <Link to="/" className=" text-decoration-none text-black">Dashboard</Link> 
                  </span>{" "}
                </a>
             
            </li>
            <li>
              {" "}
            
                <a className="nav-link px-0 align-middle d-flex gap-2">
                  <i className="fs-4 bi  bi-building"></i> <br />
                 
                  <span className=" d-sm-inline" id="navleft">
      <Dropdown>
        <Dropdown.Toggle variant="" id="dropdown-basic">
          Property
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item><Link to="/admin/add-property">Add Property</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/allproperties">Available Property</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/soldproperties">Sold Out Property</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/admin/suggested-property">Suggested Property</Link></Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown>
    </span>
                </a>
             {" "}
            </li>
          
            <li>
            
                <a className="nav-link px-0 align-middle d-flex gap-2">
                  <i className="fs-4 bi bi-file-post"></i>
                  <br />
                 
                
                  <span className=" d-sm-inline" id="navleft">
                  <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            Users
          </Dropdown.Toggle>

          <Dropdown.Menu>
          <Dropdown.Item ><Link to="/registered_user">Registerd User</Link></Dropdown.Item>
            <Dropdown.Item ><Link to="/interested_user">Interested User</Link></Dropdown.Item>
            <Dropdown.Item ><Link to="/contact_user">Contact_Us_User</Link></Dropdown.Item>
            
          </Dropdown.Menu>
        </Dropdown>
    </span>
                </a>
             
            </li>
            <li>
                <a className="nav-link px-0 align-middle d-flex gap-2">
                  <i className="fs-4 bi bi-journal-text"></i>
                  <br />
                  <span className=" d-sm-inline" id="navleft">
                  <Dropdown>
          <Dropdown.Toggle variant="" id="dropdown-basic">
            Blogs
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item ><Link to="/admin/all-blogs">All Blogs</Link></Dropdown.Item>
            <Dropdown.Item ><Link to="/admin/add-blog">Add Blog</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </span>
                </a>
            </li>
            <li>
            
                <a className="nav-link px-0 align-middle d-flex gap-2" onClick={handleLogout}>
                <i className="fs-4 bi bi-power"></i>
                  <br />
                  <span className=" text-black  mt-2 mx-2 " id="navleft" >
                    Logout
                  </span>{" "}
                </a>
             
            </li>
        </ul>
       
      </div>
    </div>
  </div>
</nav>
    
    
    
    </Wrapper>
  )
}

export default SiderbarMob
const Wrapper = styled.div`
 .bi {
    color: #737373;
  }
  #btnside{
    @media screen and (max-width: 768px) {
        margin-top: 1.5rem;
        border: none;
        margin-left: -1rem;
    }
  }
  #offcanvasNavbar{
    @media screen and (max-width: 768px) {
      width: 70%;
    }
  }
  .dropdown-toggle::after {
 
 margin-left: 1rem;
   
}

`