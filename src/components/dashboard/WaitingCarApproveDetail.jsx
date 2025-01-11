import Slider from "react-slick";

import axiosInstance from "@/core/axiosInstance";
import { useEffect, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Link } from "react-router-dom";
import Overview from "../carSingles/sections/Overview";
import Dialog from "../otherPages/Dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

import checkIcon from "../../../public/images/icons/check.svg";
import removeIcon from "../../../public/images/icons/remove.svg";
export default function WaitingCarApproveDetail({ detailData }) {
  const [showAproveDialog, setShowAproveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6

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
  const handleDialogAproveClose = (confirmed) => {
    setShowAproveDialog(false);
    if (!confirmed) {
    }
  };
  const handleDialogDeleteClose = (confirmed) => {
    setShowDeleteDialog(false);
    if (!confirmed) {
    }
  };

  const handleDialogAproveSubmit = async () => {
    try {
      const res = await axiosInstance.put(
        `admin/users/${detailData.id}/unlock-car`
      );
      if (res.data.code === 200) {
        toast.success("Xe đã được duyệt");
        navigate("/waiting-approve-car");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  const handleDialogDeleteSubmit = async () => {
    console.log("Form submitted!");
    try {
      const res = await axiosInstance.put(
        `admin/users/${detailData.id}/lock-car`
      );
      if (res.data.code === 200) {
        toast.success("Đã từ chối tin xe");
        navigate("/waiting-approve-car");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  return (
    <>
      <section className="inventory-section pb-0 layout-radius">
        <div className="boxcar-container">
          <div className="boxcar-title-three">
            <ul className="breadcrumb">
              <li>
                <Link to={`/waiting-approve-car`}>Danh sách xe chờ duyệt</Link>
              </li>
              <li>
                <span>Thông tin xe chờ duyệt</span>
              </li>
            </ul>
            <h2>
              {detailData ? detailData.name : ""}
              {detailData &&
              detailData.name &&
              (detailData.manufacturingYear ? detailData.manufacturingYear : "")
                ? " -"
                : ""}
              {detailData
                ? " " +
                  (detailData.manufacturingYear
                    ? detailData.manufacturingYear
                    : "")
                : ""}
            </h2>
            <ul className="spectes-list">
              <li>
                <span>
                  <img
                    src="/images/resource/spec1-1.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  {detailData && detailData.manufacturingYear
                    ? detailData.manufacturingYear
                    : ""}
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
                  {detailData && detailData.kmDriven
                    ? detailData.kmDriven + " km"
                    : ""}
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
                  {detailData && detailData.drivetrain
                    ? detailData.drivetrain
                    : ""}
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
                  {detailData && detailData.fuel ? detailData.fuel.name : ""}
                </span>
              </li>
            </ul>
            <div className="content-box">
              <div className="btn-box v2">
                <div className="share-btn">
                  <span style={{ fontWeight: 900, color: "#405ff2" }}>
                    Duyệt
                  </span>
                  <a
                    onClick={() => setShowAproveDialog(true)}
                    className="share"
                  >
                    <img src={checkIcon} width={12} height={12} alt="" />
                  </a>
                </div>
                <div className="share-btn">
                  <span style={{ fontWeight: 900, color: "red" }}>Xóa</span>
                  <a
                    onClick={() => setShowDeleteDialog(true)}
                    className="share"
                  >
                    <img src={removeIcon} width={12} height={12} alt="" />
                  </a>
                </div>
              </div>
            </div>
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
                          (detailData.images.length === 1
                            ? [...detailData.images, detailData.images[0]]
                            : detailData.images
                          ).map((src, index) => (
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
                            {detailData && (
                              <Item
                                original={detailData.logo}
                                thumbnail={detailData.logo}
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
                                    Xem tất cả
                                  </a>
                                )}
                              </Item>
                            )}
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
                  <h3>{"(" + (detailData && detailData.priceText) + ")"}</h3>
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
        {showAproveDialog && (
          <Dialog
            title={"Duyệt tin bán xe " + detailData.name}
            content="Bạn chắc chắn muốn duyệt xe này?"
            onClose={handleDialogAproveClose}
            onSubmit={handleDialogAproveSubmit}
          />
        )}
        {showDeleteDialog && (
          <Dialog
            title="Xóa tin bán xe"
            content="Bạn chắc chắn muốn xóa xe này?"
            onClose={handleDialogDeleteClose}
            onSubmit={handleDialogDeleteSubmit}
          />
        )}
      </section>
    </>
  );
}