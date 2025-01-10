import Sidebar from "@/components/dashboard/Sidebar";
import axiosInstance from "@/core/axiosInstance";
import { useEffect, useState } from "react";

import ApproveCarItem from "./AproveCarItem";
export default function WatingApproveCar() {
  const [dropdownValues, setDropdownValues] = useState({
    keywords: "",
    sortItems: [
      {
        field: "brandId",
        desc: true,
      },
    ],
    page: 0,
    pageSize: 1000,
  });
  const [carList, setCarList] = useState([]); // State for cars list
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 12,
    total: 0,
  });
  useEffect(() => {
    queryCar();
  }, [pagination.page]);
  const queryCar = async () => {
    try {
      const res = await axiosInstance.post("/admin/cars", dropdownValues);
      setCarList(res.data.data.list);
      setPagination((prev) => ({ ...prev, total: res.data.data.totalSize }));
    } catch (error) {}
  };

  const carChangedHandle = () => {
    queryCar();
  };

  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Xe đang chờ duyệt</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>Xe</th>
                      <th>Hãng</th>
                      <th>Năm sản xuất</th>
                      <th>Hộp số</th>
                      <th>Động cơ</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carList.map((item, index) => (
                      <ApproveCarItem
                        item={item}
                        index={index}
                        onCarChange={carChangedHandle}
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
