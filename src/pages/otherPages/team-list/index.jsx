import SelectComponent from "@/components/common/SelectComponent";
import MetaComponent from "@/components/common/Metacomonent";
import DropdownFilter from "@/components/carListings/DropdownFilter";
import Header1 from "@/components/headers/Header1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import axiosInstance from "@/core/axiosInstance";
import { useState } from "react";
export default function AddListings() {
  const [description, setDescription] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [title, setTitle] = useState("");
  const metadata = {
    title: "Add Listings || Boxcar - Reactjs Car Template",
    description: "Boxcar - Reactjs Car Template",
  };
  const validateForm = () => {
    if (!priceFrom || !priceTo || isNaN(priceFrom) || isNaN(priceTo)) {
      alert("Please enter valid numeric values for the price range.");
      return false;
    }
    if (parseFloat(priceFrom) > parseFloat(priceTo)) {
      alert("'Từ' value cannot be greater than 'Đến' value.");
      return false;
    }
    if (!title) {
      alert("Title is required.");
      return false;
    }
    if (!description) {
      alert("Description is required.");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ priceFrom, priceTo, title, description });
      pushCar();
    }
  };

  const pushCar = async () => {
    try {
      await axiosInstance.post("/car-buying-articles", {
        // ...carParam,
        min: parseInt(priceFrom),
        max: parseInt(priceTo),
        title: title,
        content: description,
        code: "MX-" + Date.now(),
        // user: { ...userData.value }
      });
    } catch (error) {
      console.log(error);
    }
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
                              name="priceFrom"
                              type="text"
                              placeholder="Từ.."
                              value={priceFrom}
                              onChange={(e) => setPriceFrom(e.target.value)}
                            />
                          </div>
                          <div className="form_boxes" style={{ width: "100%" }}>
                            <label> </label>

                            <input
                              name="priceTo"
                              type="text"
                              placeholder="Đến"
                              value={priceTo}
                              onChange={(e) => setPriceTo(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-column col-lg-12">
                        <div className="form_boxes">
                          <label>Tiêu đề</label>
                          <input
                            name="title"
                            type="text"
                            placeholder="Tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                  <button onClick={handleSubmit} className="theme-btn">
                    Đăng tin mua
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
