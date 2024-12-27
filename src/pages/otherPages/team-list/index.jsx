import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaComponent from "@/components/common/Metacomonent";
import Header1 from "@/components/headers/Header1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import FullScreenLoader from "@/components/otherPages/FullScreenLoader";
export default function AddListings() {
  const [description, setDescription] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});
  const isLogin = useStoreState((state) => state.isLogin);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const metadata = {
    title: "Đăng tin mua xe",
    description: "Đăng tin mua xe",
  };

  const validateForm = () => {
    const newErrors = {};

    // Price validation
    if (!priceFrom || isNaN(priceFrom)) {
      newErrors.priceFrom = "Nhập giá khởi điểm";
    }
    if (!priceTo || isNaN(priceTo)) {
      newErrors.priceTo = "Nhập giá tối đa";
    }
    if (priceFrom && priceTo && parseFloat(priceFrom) > parseFloat(priceTo)) {
      newErrors.priceTo = "Giá tối đa phải cao hơn giá khởi điểm";
    }

    // Title validation
    if (!title.trim()) {
      newErrors.title = "Nhập tiêu đề.";
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Nhập mô tả.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0)
      toast.error("Vui lòng điền đầy đủ thông tin");
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        await pushCar();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const pushCar = async () => {
    try {
      await axiosInstance.post("/car-buying-articles", {
        min: parseInt(priceFrom),
        max: parseInt(priceTo),
        title: title.trim(),
        content: description.trim(),
        code: "MX-" + Date.now(),
      });
      setLoading(false);
      toast.success("Đăng tin thành công");
      setPriceFrom("");
      setPriceTo("");
      setTitle("");
      setDescription("");
      setErrors({});
      navigate("/tin-mua");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  return (
    <>
      {loading && <FullScreenLoader />}
      <MetaComponent meta={metadata} />

      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <Sidebar />
      <section className="dashboard-widget">
        <div className="right-box">
          <div className="content-column">
            <div className="inner-column">
              <div className="list-title">
                <h3 className="title">Đăng tin mua xe</h3>
                <div className="text">
                  <p className="line-height-3 m-0 mt-4 red">
                    Chú ý: Chỉ đăng tin mua xe ở đây. Không đăng tin bán xe hay
                    tin rao vặt khác...nếu vi phạm tài khoản sẽ bị khóa!
                  </p>
                </div>
              </div>
              <div className="form-box">
                <form onSubmit={handleSubmit} className="row">
                  <div className="form-column col-lg-8">
                    <label>Khoảng giá</label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <div
                        className="form_boxes"
                        style={{
                          width: "100%",
                          borderColor: errors.priceFrom ? "red" : "",
                        }}
                      >
                        <input
                          name="priceFrom"
                          type="text"
                          placeholder="Từ.."
                          value={priceFrom}
                          onChange={(e) => setPriceFrom(e.target.value)}
                        />
                        {errors.priceFrom && (
                          <p className="error-text">{errors.priceFrom}</p>
                        )}
                      </div>
                      <div
                        className="form_boxes"
                        style={{
                          width: "100%",
                          borderColor: errors.priceTo ? "red" : "",
                        }}
                      >
                        <input
                          name="priceTo"
                          type="text"
                          placeholder="Đến"
                          value={priceTo}
                          onChange={(e) => setPriceTo(e.target.value)}
                        />
                        {errors.priceTo && (
                          <p className="error-text">{errors.priceTo}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div
                      className="form_boxes"
                      style={{ borderColor: errors.title ? "red" : "" }}
                    >
                      <label>Tiêu đề</label>
                      <input
                        name="title"
                        type="text"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      {errors.title && (
                        <p className="error-text">{errors.title}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-column col-lg-12">
                    <div
                      className="form_boxes v2"
                      style={{ borderColor: errors.description ? "red" : "" }}
                    >
                      <label>Thông tin mô tả</label>
                      <ReactQuill
                        value={description}
                        onChange={setDescription}
                        theme="snow"
                      />
                      {errors.description && (
                        <p className="error-text">{errors.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-submit">
                    <button type="submit" className="theme-btn">
                      Đăng tin mua
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
      <style jsx>{`
        .input-error {
          border: 1px solid red;
        }
        .error-text {
          color: red;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </>
  );
}
