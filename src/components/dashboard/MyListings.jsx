import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import SelectComponent from "../common/SelectComponent";
import Pagination from "../common/Pagination";
const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";
import { useStoreState, useStoreActions } from "easy-peasy";

import { useNavigate } from "react-router-dom";

export default function MyListings() {
  const [brandList, setBrandList] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const setBrand = useStoreActions((actions) => actions.setBrand);

  const getAllBrand = async () => {
    try {
      const res = await axiosInstance.get("/brands");
      setBrandList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllBrand();
  }, []);
  const addBrand = () => {
    setBrand(null);
    navigate("/brand");
  };
  const editBrand = (element) => {
    setBrand(element);
    navigate("/brand");
  };
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Quản lý Hãng</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="col-lg-12" style={{ paddingBottom: "20px" }}>
                <div className="form-submit">
                  <button className="theme-btn" onClick={addBrand}>
                    Thêm hãng
                  </button>
                </div>
              </div>
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Tên hãng</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandList.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span>{item.name}</span>
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
                            onClick={() => editBrand(item)}
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
