import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
export default function Fuel() {
  const fuelData = useStoreState((state) => state.fuelData);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const [params, setParams] = useState({
    name: "",
  });
  useEffect(() => {
    if (fuelData) {
      setParams({ name: fuelData.name });
      setIsEdit(true);
    }
  }, []);
  const onSubmit = async () => {
    try {
      if (isEdit) {
        await axiosInstance.put(`/fuels/${fuelData.id}`, { ...params });
      } else {
        await axiosInstance.post(`/fuels`, { ...params });
      }
      navigate("/fuel-list");
    } catch (error) {}
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
