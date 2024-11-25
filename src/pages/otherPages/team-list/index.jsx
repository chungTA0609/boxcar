import SelectComponent from "@/components/common/SelectComponent";
import MetaComponent from "@/components/common/Metacomonent";
import DropdownFilter from "@/components/carListings/DropdownFilter";
import Header1 from "@/components/headers/Header1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

import { useState } from "react";
export default function AddListings() {
  const [description, setDescription] = useState("");

  const [images, setImages] = useState([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);
  const metadata = {
    title: "Add Listings || Boxcar - Reactjs Car Template",
    description: "Boxcar - Reactjs Car Template",
  };
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (index) => {
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
  };
  const [images2, setImages2] = useState([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);

  const handleImageChange2 = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images2];
        newImages[index] = file.name;
        setImages2(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete2 = (index) => {
    const newImages = images2.filter((_, imgIndex) => imgIndex !== index);
    setImages2(newImages);
  };
  return (
    <>
      <MetaComponent meta={metadata} />

      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <Sidebar />
      <section className="dashboard-widget">
        <div className="right-box">
          <div className="content-column">
            <div className="inner-column">
              <div className="list-title">
                <h3 className="title">Đăng tin mua xe</h3>
                <div className="text">
                  <p class="line-height-3 m-0 mt-4 red">
                    Chú ý: Chỉ đăng tin mua xe ở đây. Không đăng tin bán xe hay
                    tin rao vặt khác...nếu vi phạm tài khoản sẽ bị khóa !
                  </p>
                </div>
              </div>
              <div className="form-box">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <form onSubmit={(e) => e.preventDefault()} className="row">
                      <div className="form-column col-lg-8">
                        <label>Khoảng giá</label>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                          }}
                        >
                          <div className="form_boxes" style={{ width: "100%" }}>
                            <input
                              name="name"
                              required
                              type="text"
                              placeholder="Từ.."
                            />{" "}
                          </div>
                          <div className="form_boxes" style={{ width: "100%" }}>
                            <label> </label>

                            <input
                              name="name"
                              required
                              type="text"
                              placeholder="Đến"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-column col-lg-12">
                        <div className="form_boxes">
                          <label>Tiêu đề</label>
                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Tiêu đề"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-12">
                        <div className="form_boxes v2">
                          <label>Thông tin mô tả</label>
                          <ReactQuill
                            value={description}
                            onChange={setDescription}
                            theme="snow"
                            line="10"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="form-submit">
                  <button type="submit" className="theme-btn">
                    Next Location
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_711_3214)">
                        <path
                          d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_711_3214">
                          <rect width={14} height={14} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
