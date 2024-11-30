import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from "react-color"; // Import the SketchPicker

export default function Color() {
  const colorData = useStoreState((state) => state.colorData);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const [params, setParams] = useState({
    name: "",
    hex: "#000000", // Default color value
  });

  useEffect(() => {
    if (colorData) {
      setParams({ name: colorData.name });
      setIsEdit(true);
    }
  }, []);
  const onSubmit = async () => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/colors/${colorData.id}`, { ...params });
      } else {
        await axiosInstance.post(`/colors`, { ...params });
      }
      navigate("/color-list");
    } catch (error) {}
  };
  const handleColorChange = (color) => {
    setParams((prevParams) => ({ ...prevParams, hex: color.hex }));
  };

  return (
    <section className="dashboard-widget-two">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Thông tin loại nhiên liệu</h3>
            </div>
            <div className="gallery-sec">
              <div className="form-sec">
                <form onSubmit={(e) => e.preventDefault()} className="row">
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Tên loại nhiên liệu</label>
                      <input
                        name="name"
                        required
                        type="text"
                        placeholder="Tên loại nhiên liệu..."
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
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label htmlFor="color">Màu sắc</label>
                      <SketchPicker
                        color={params.color} // Current color value
                        onChange={handleColorChange} // Update color value
                      />
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "5px",
                          backgroundColor: params.color,
                          color: "#fff",
                          textAlign: "center",
                          borderRadius: "5px",
                        }}
                      >
                        Mã màu đã chọn: {params.color}
                      </div>
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
  );
}
