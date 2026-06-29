import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import NavbarAd from "../components/NavbarAd";
import { Card } from "react-bootstrap";
import Cards from "../components/Cards";
import Chart from "../components/Chart";
import BarChart from "../components/BarChart";
import SiderbarMob from "../components/SiderbarMob";

function AdminHome() {
  return (
    <Wrapper>
      <NavbarAd />

      <div className="row flex-nowrap">
        <div className="col-lg-1 col-1" id="sider">
          <Sidebar />
        </div>
        <div className="col-lg-1 col-1" id="sider1">
          <SiderbarMob />
        </div>

        <div className="col-lg-11 mt-2" id="set">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="hdd">
                Dashboard
                <h6 className="mt-2">Welcome toSiara Properties Admin</h6>
              </h3>
            </div>
            <div className="col-lg-12">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default AdminHome;

const Wrapper = styled.div`
  .row {
    @media screen and (max-width: 768px) {
      margin-bottom: 10px;
    }
  }
  .hdd {
    margin-top: 5rem;
    margin-left: 8rem;
    @media screen and (max-width: 768px) {
      margin-top: 4rem;
      margin-left: 2rem;
    }
  }

  #sider {
    display: block;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  #sider1 {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
`;
