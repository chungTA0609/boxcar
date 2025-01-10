import Sidebar from "@/components/dashboard/Sidebar";
import axiosInstance from "@/core/axiosInstance";
import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";

export default function UserList() {
  const [dropdownValues, setDropdownValues] = useState({
    keywords: "",
    sortItems: [
      {
        field: "username",
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
      const res = await axiosInstance.post("/admin/users", dropdownValues);
      setCarList(res.data.data.list);
      setPagination((prev) => ({ ...prev, total: res.data.data.totalSize }));
    } catch (error) {}
  };

  const userListChange = () => {
    queryCar();
  };
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Danh sách tài khoản</h3>
            </div>
            <div className="my-listing-table wrap-listing">
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>ID</th>
                      <th>Số điện thoại</th>
                      <th>Username</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carList.map((item, index) => (
                      <UserListItem
                        item={item}
                        index={index}
                        onUserChange={userListChange}
                      />
                    ))}
                  </tbody>
                </table>
                {/* <div className="pagination-sec">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <Pagination />
                    </ul>
                    <div className="text">Showing results 1-30 of 1,415</div>
                  </nav>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
