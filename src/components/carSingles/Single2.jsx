import Slider from "react-slick";
import RelatedCars from "./RelatedCars";

import Overview from "./sections/Overview";
import Description from "./sections/Description";
import Features from "./sections/Features";
import Faqs from "./sections/Faqs";
import Location from "./sections/Location";
import Financing from "./sections/Financing";
import Review from "./sections/Review";
import Ratings from "./sections/Ratings";
import Replay from "./sections/Replay";
import CommentForm from "./sections/CommentForm";
import { Gallery, Item } from "react-photoswipe-gallery";
import ModalVideo from "react-modal-video";
import { useState } from "react";
import { Link } from "react-router-dom";
const images = [
  {
    src: "/images/resource/inventory1-6.png",
    alt: "",
    width: 924,
    height: 550,
  },
  {
    src: "/images/resource/inventory1-6.png",
    alt: "",
    width: 924,
    height: 550,
  },
];
export default function Single2({ detailData }) {
  const slickOptions = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section className="inventory-section pb-0 layout-radius">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <span>Cars for Sale</span>
              </li>
            </ul>
            <h2>Volvo XC90</h2>
            <div className="text">
              2.0 D5 PowerPulse Momentum 5dr AWD Geartronic Estate
            </div>
            <ul className="spectes-list">
              <li>
                <span>
                  <img
                    src="/images/resource/spec1-1.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  2023
                </span>
              </li>
              <li>
                <span>
                  <img
                    src="/images/resource/spec1-2.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  35,000 miles
                </span>
              </li>
              <li>
                <span>
                  <img
                    src="/images/resource/spec1-3.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Automatic
                </span>
              </li>
              <li>
                <span>
                  <img
                    src="/images/resource/spec1-4.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  Diesel
                </span>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="inspection-column v2 col-xl-8 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="gallery-sec">
                  <div className="image-column wrap-gallery-box">
                    <Gallery>
                      <Slider
                        {...slickOptions}
                        className="inner-column inventry-slider-two inner-slide"
                      >
                        {detailData &&
                          detailData.images.map((src, index) => (
                            <div key={index} className="image-box d-block">
                              <figure className="image">
                                <Item
                                  original={src}
                                  thumbnail={src}
                                  width={924}
                                  height={550}
                                >
                                  {({ ref, open }) => (
                                    <a onClick={open}>
                                      <img
                                        ref={ref}
                                        alt={"alt"}
                                        src={src}
                                        style={{
                                          height: "550px",
                                          objectFit: "cover",
                                        }}
                                        width={924}
                                        height={550}
                                      />
                                    </a>
                                  )}
                                </Item>
                              </figure>
                            </div>
                          ))}
                      </Slider>
                      <div className="content-box">
                        <ul className="video-list">
                          <li>
                            <a onClick={() => setOpen(true)}>
                              <img
                                src="/images/resource/video1-1.svg"
                                width={18}
                                height={18}
                                alt=""
                              />
                              Video
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <img
                                src="/images/resource/video1-2.svg"
                                width={18}
                                height={18}
                                alt=""
                              />
                              360 View
                            </a>
                          </li>
                          <li>
                            <Item
                              original="/images/resource/inventory1-6.png"
                              thumbnail="/images/resource/inventory1-6.png"
                              width={924}
                              height={550}
                            >
                              {({ ref, open }) => (
                                <a onClick={open}>
                                  <img
                                    ref={ref}
                                    src="/images/resource/video1-4.svg"
                                    width={18}
                                    height={18}
                                    alt=""
                                  />
                                  All Photos
                                </a>
                              )}
                            </Item>
                          </li>
                        </ul>
                      </div>{" "}
                    </Gallery>
                  </div>
                </div>
                {/* overview-sec */}
                <div className="overview-sec v2">
                  <Overview detailData={detailData} />
                </div>
                {/* description-sec */}
                <div className="description-sec">
                  <h4 className="title">Mô tả</h4>
                  <div className="text two">
                    {detailData && detailData.description}
                  </div>
                </div>
                {/* features-sec */}
              </div>
            </div>
            <div className="side-bar-column v2 col-xl-4 col-lg-12 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="contact-box-two">
                  <span>Giá</span>
                  <h3 className="title">
                    {detailData && Number(detailData.price).toLocaleString()}
                  </h3>
                </div>
                <div className="contact-box">
                  <div className="content-box">
                    <h6 className="title">
                      {detailData && detailData.username}
                    </h6>
                    <ul className="contact-list">
                      <li>
                        <a href="#">
                          <div className="image-box">
                            <img
                              src="/images/resource/phone1-1.svg"
                              width={18}
                              height={18}
                              alt=""
                            />
                          </div>
                          {detailData && detailData.address}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <div className="image-box">
                            <img
                              src="/images/resource/phone1-2.svg"
                              width={18}
                              height={18}
                              alt=""
                            />
                          </div>
                          {detailData && detailData.userPhoneNum}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* cars-section-three */}
        <RelatedCars />
        {/* End shop section two */}
      </section>
    </>
  );
}
