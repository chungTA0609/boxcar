import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import SelectComponent from "../common/SelectComponent";
import Pagination from "../common/Pagination";
const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";
import { useStoreState, useStoreActions } from "easy-peasy";

import { useNavigate } from "react-router-dom";

export default function ColorList() {
  const [colorList, setColorList] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const setColor = useStoreActions((actions) => actions.setColor);

  const getAllColor = async () => {
    try {
      const res = await axiosInstance.get("/colors");
      setColorList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllColor();
  }, []);
  const addColor = () => {
    setColor(null);

    navigate("/color");
  };
  const editColor = (element) => {
    setColor(element);
    navigate("/color");
  };
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Quản lý màu sắc</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="col-lg-12" style={{ paddingBottom: "20px" }}>
                <div className="form-submit">
                  <button className="theme-btn" onClick={addColor}>
                    Thêm màu sắc
                  </button>
                </div>
              </div>
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Tên loại nhiên liệu</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {colorList.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span style={{ color: item.hex, fontWeight: 900 }}>
                            <b>{item.name}</b>
                          </span>
                        </td>
                        <td>
                          <a className="remove-cart-item">
                            <img
                              alt="Remove item"
                              src={removeIcon}
                              width={18}
                              height={18}
                            />
                          </a>
                          <a
                            className="remove-cart-item"
                            onClick={() => editColor(item)}
                          >
                            <img
                              alt="Edit item"
                              src={editIcon}
                              width={18}
                              height={18}
                            />
                          </a>
                        </td>
                      </tr>
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
