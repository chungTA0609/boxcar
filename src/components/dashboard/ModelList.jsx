import axiosInstance from "@/core/axiosInstance";
import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectComponent from "../common/SelectComponent";
import BrandItem from "./BrandItem";
import Sidebar from "./Sidebar";
const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";

export default function ModelList() {
  const [modelList, setModelList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brand, setBrand] = useState(null);

  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const setModel = useStoreActions((actions) => actions.setModel);
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
  const handleBrandDeleted = () => {
    getModelByBrand();
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
              <div style={{ display: "flex" }}>
                <div className="col-lg-4">
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
                <div className="col-lg-8" style={{ paddingBottom: "20px" }}>
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
              </div>
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Tên mẫu xe</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelList.map((item, index) => (
                      <BrandItem
                        key={item.id}
                        item={item}
                        index={index}
                        onBrandDelete={handleBrandDeleted}
                        type={"model"}
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
