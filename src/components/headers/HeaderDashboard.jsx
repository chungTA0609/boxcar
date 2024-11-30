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
                    width={108}
                    height={26}
                    src="/images/logo.svg"
                  />
                </Link>
              </div>
              <div className="btn-box">
                <div className="layout-search style1">
                  <div className="box-content-search" id="box-content-search">
                    <ul className="box-car-search">
                      {carItemsSearch
                        .filter((elm) =>
                          elm.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((car) => (
                          <li key={car.id}>
                            <Link
                              to={`/inventory-page-single-v1/${car.id}`}
                              className="car-search-item"
                            >
                              <div className="box-img">
                                <img
                                  alt="img"
                                  src={car.imgSrc}
                                  width={70}
                                  height={70}
                                />
                              </div>
                              <div className="info">
                                <p className="name">{car.title}</p>
                                <span className="price">${car.newPrice}</span>
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                    <Link
                      to={`/inventory-page-single-v1`}
                      className="btn-view-search"
                    >
                      View Details
                      <svg
                        width={14}
                        height={14}
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3114_6864)">
                          <path
                            d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                            fill="#405FF2"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3114_6864">
                            <rect width={14} height={14} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </div>
                </div>
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
