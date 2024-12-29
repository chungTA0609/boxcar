import axiosInstance from "@/core/axiosInstance";
import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandItem from "./BrandItem";
import Sidebar from "./Sidebar";
const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";

export default function OriginList() {
  const [originList, setOriginList] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const setOrigin = useStoreActions((actions) => actions.setOrigin);

  const getAllOrigin = async () => {
    try {
      const res = await axiosInstance.get("/origins");
      setOriginList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getAllOrigin();
  }, []);
  const addOrigin = () => {
    setOrigin(null);

    navigate("/origin");
  };
  const handleBrandDeleted = () => {
    getAllOrigin();
  };
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Quản lý Xuất xứ</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="col-lg-12" style={{ paddingBottom: "20px" }}>
                <div className="form-submit">
                  <button className="theme-btn" onClick={addOrigin}>
                    Thêm xuất xứ
                  </button>
                </div>
              </div>
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Xuất xứ</th>
                      <th>Chỉnh sửa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {originList.map((item, index) => (
                      <BrandItem
                        key={item.id}
                        item={item}
                        index={index}
                        onBrandDelete={handleBrandDeleted}
                        type={"origin"}
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
