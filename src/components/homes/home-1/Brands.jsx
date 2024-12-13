import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { carData } from "@/data/cars";
import { useEffect, useState } from "react";

import { carBrands } from "@/data/brands";
export default function Brands() {
  const [sortedItems, setSortedItems] = useState([...carData]);
  const options = {
    infinite: false,
    slidesToShow: 4.8,
    // initialSlide: -0.3,
    slidesToScroll: 1,

    arrows: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  return (
    <section className="boxcar-brand-section section-radius-top bg-1" style={{
      padding:'120px 0 150px 0'
    }}>
      <div className="boxcar-container">
        <div className="boxcar-title">
          <h2 className="wow fadeInUp">Lựa chọn hãng xe</h2>
          <Link to={`/tim-kiem-xe`} className="btn-title">
            Show All Brands
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
            >
              <g clipPath="url(#clip0_601_3199)">
                <path
                  d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                  fill="#050B20"
                />
              </g>
              <defs>
                <clipPath id="clip0_601_3199">
                  <rect width={14} height={14} fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <div
        className="tab-content wow fadeInUp"
        data-wow-delay="200ms"
        id="nav-tabContent"
      >
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <Slider
            {...options}
            className="row car-slider-three slider-layout-1 "
            data-preview="4.8"
          >
            {carBrands.map((car, index) => (
            <div
              key={index}
              className="cars-block style-1 col-lg-2 col-md-6 col-sm-6"
            >
              <div
                className={`inner-box wow fadeInUp`}
                data-wow-delay={car.wowDelay}
              >
                <div className="image-box">
                  <figure className="image">
                    <Link to={`/tim-kiem-xe`}>
                      <img
                        alt={car.title}
                        src={car.src}
                        width={car.width}
                        height={car.height}
                      />
                    </Link>
                  </figure>
                </div>
                <div className="content-box">
                  <h6 className="title">
                    <Link to={`/tim-kiem-xe`}>{car.title}</Link>
                  </h6>
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
      </div>
      </div>
    </section>
  );
}
