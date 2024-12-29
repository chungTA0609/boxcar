import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import SelectComponent from "../common/SelectComponent";
import Pagination from "../common/Pagination";
const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";
import { useStoreState, useStoreActions } from "easy-peasy";
import BrandItem from "./BrandItem";
import { useNavigate } from "react-router-dom";

export default function StyleList() {
  const [brandList, setStyleList] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const setStyle = useStoreActions((actions) => actions.setStyle);

  const getAllStyle = async () => {
    try {
      const res = await axiosInstance.get("/styles");
      setStyleList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllStyle();
  }, []);
  const addStyle = () => {
    setStyle(null);

    navigate("/style");
  };
  const handleBrandDeleted = () => {
    getAllStyle();
  };
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Quản lý Kiểu xe</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="col-lg-12" style={{ paddingBottom: "20px" }}>
                <div className="form-submit">
                  <button className="theme-btn" onClick={addStyle}>
                    Thêm kiểu xe
                  </button>
                </div>
              </div>
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Tên kiểu xe</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandList.map((item, index) => (
                      <BrandItem
                        item={item}
                        key={item.id}
                        index={index}
                        onBrandDelete={handleBrandDeleted}
                        type={"style"}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
