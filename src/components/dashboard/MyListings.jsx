import axiosInstance from "@/core/axiosInstance";
import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import BrandItem from "./BrandItem";
import Sidebar from "./Sidebar";

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
  const handleBrandDeleted = () => {
    getAllBrand();
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
                      <BrandItem
                        key={item.id}
                        item={item}
                        index={index}
                        onBrandDelete={handleBrandDeleted}
                        type={"brand"}
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
