import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axiosInstance from "@/core/axiosInstance";
import Pagination from "../common/Pagination";
const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";
import SelectComponent from "../common/SelectComponent";
import { useStoreState, useStoreActions } from "easy-peasy";

import { useNavigate } from "react-router-dom";

export default function ModelList() {
  const [modelList, setModelList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState(null);

  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const setStyle = useStoreActions((actions) => actions.setStyle);
  const getAllBrand = async () => {
    try {
      const res = await axiosInstance.get("/brands");
      setBrandList(res.data.data);
    } catch (error) {}
  };
  const getModelByBrand = async () => {
    try {
      const res = await axiosInstance.get(`/models?brandId=${brand.id}`);
      setModelList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllBrand();
  }, []);
  useEffect(() => {
    getModelByBrand();
  }, [brand]);
  const addStyle = () => {
    setStyle(null);

    navigate("/model");
  };
  const editStyle = (element) => {
    setStyle(element);
    navigate("/model");
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
            <div
              className="my-listing-table wrap-listing"
              style={{ display: "flex" }}
            >
              <div className="col-lg-2">
                <div
                  className="form_boxes"
                  style={{
                    border: "1px solid rgb(225, 225, 225)",
                    borderRadius: "12px",
                    marginRight: "20px",
                  }}
                >
                  <SelectComponent
                    options={brandList}
                    value={
                      (brand &&
                        brandList.find((el) => el.id === brand.id)?.name) ??
                      "Tên Hãng"
                    }
                    onChange={(value) => setBrand(value)}
                  />
                </div>
              </div>
              <div className="col-lg-12" style={{ paddingBottom: "20px" }}>
                <div className="form-submit">
                  <button
                    className="theme-btn"
                    onClick={addStyle}
                    style={{ height: "76px" }}
                  >
                    Thêm mẫu xe
                  </button>
                </div>
              </div>
              <div className="cart-table">
                {/* <div className="title-listing">
                  <div className="text-box v1">
                    <div className="form_boxes v3">
                      <small>Sort by</small>

                      <SelectComponent options={["Newest", "Oldest"]} />
                    </div>
                  </div>
                </div> */}
                <table>
                  <thead>
                    <tr>
                      <th>Tên mẫu xe</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelList.map((item, index) => (
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
                            onClick={() => editStyle(item)}
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
