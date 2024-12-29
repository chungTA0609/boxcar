import axiosInstance from "@/core/axiosInstance";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import FullScreenLoader from "../otherPages/FullScreenLoader";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

export default function Brand() {
  const brandData = useStoreState((state) => state.brandData);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6

  const [params, setParams] = useState({
    name: "",
    logo: "",
    isTruck: false,
  });

  useEffect(() => {
    if (brandData) {
      setParams({
        name: brandData.name,
        logo: brandData.logo,
        isTruck: brandData.isTruck,
      });
      setIsEdit(true);
    }
  }, []);
  const onSubmit = async () => {
    try {
      setLoading(true);
      if (isEdit) {
        await axiosInstance.put(`/brands/${brandData.id}`, {
          ...params,
          logo: "",
        });
      } else {
        await axiosInstance.post(`/brands`, { ...params, logo: "" });
      }
      setLoading(false);
      toast.success("Cập nhật thành công");
      navigate("/brands");
    } catch (error) {
      setLoading(false);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}

      <section className="dashboard-widget-two">
        <div className="right-box">
          <Sidebar />
          <div className="content-column">
            <div className="inner-column">
              <div className="list-title">
                <h3 className="title">Thông tin hãng</h3>
              </div>
              <div className="gallery-sec">
                <div
                  className="box-switch"
                  style={{ display: "flex", marginLeft: "10px" }}
                >
                  <p style={{ marginRight: "20px" }}>Xe tải</p>
                  <ul className="box-check-el">
                    <li>
                      <input
                        className="tf-switch-check"
                        type="checkbox"
                        id="sw1"
                        checked={params.isTruck} // Bind to params.hidden
                        onChange={(e) =>
                          setParams((prevParams) => ({
                            ...prevParams,
                            isTruck: e.target.checked, // Update the hidden property
                          }))
                        }
                      />
                    </li>
                  </ul>
                </div>
                <div className="form-sec">
                  <form onSubmit={(e) => e.preventDefault()} className="row">
                    <div className="col-lg-12">
                      <div className="form_boxes">
                        <label>Tên hãng</label>
                        <input
                          name="name"
                          required
                          type="text"
                          placeholder="Tên hãng..."
                          onChange={(value) =>
                            setParams({
                              ...params,
                              name: value.target.value,
                            })
                          }
                          value={params.name}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="map-sec-two">
                  <div className="form-sec-two">
                    <form onSubmit={(e) => e.preventDefault()} className="row">
                      <div className="form-submit">
                        <button
                          onClick={onSubmit}
                          className="theme-btn"
                          disabled={!params.name}
                        >
                          Lưu thông tin
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
