import React, { useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

import { carItemsSearch } from "@/data/cars";
export default function HeaderDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    document.getElementById("box-content-search").classList.add("active");
    document
      .getElementById("box-content-search")
      .closest(".layout-search")
      .classList.add("active");
  };

  const handleBlur = () => {
    document.getElementById("box-content-search").classList.remove("active");
    document
      .getElementById("box-content-search")
      .closest(".layout-search")
      .classList.remove("active");
  };
  return (
    <header className="boxcar-header header-style-ten">
      <div className="header-inner">
        <div className="inner-container">
          {/* Main box */}
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link to={`/`}>
                  <img
                    alt=""
                    title="Boxcar"
                    width={200}
                    height={50}
                    src="/images/logo.png"
                  />
                </Link>
              </div>
            </div>
            {/*Nav Box*/}
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
              {/* Main Menu End*/}
            </div>
            <div className="right-box">
              <a href="#" className="haeder-img">
                <img
                  width={50}
                  height={50}
                  src="/images/resource/header-img.png"
                  alt=""
                />
              </a>
              <div className="mobile-navigation">
                <a href="#nav-mobile" title="">
                  <svg
                    width={22}
                    height={11}
                    viewBox="0 0 22 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width={22} height={2} fill="white" />
                    <rect y={9} width={22} height={2} fill="white" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Mobile Menu  */}
        </div>
      </div>
      {/* Header Search */}
      <div className="search-popup">
        <span className="search-back-drop" />
        <button className="close-search">
          <span className="fa fa-times" />
        </button>
        <div className="search-inner">
          <form onSubmit={(e) => e.preventDefault()} method="post">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                defaultValue=""
                placeholder="Search..."
                required
              />
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Header Search */}
      <div id="nav-mobile" />
    </header>
  );
}
