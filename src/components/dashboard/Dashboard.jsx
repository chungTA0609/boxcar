import axiosInstance from "@/core/axiosInstance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Sidebar from "./Sidebar";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
  { name: "Jun", value: 239 },
  { name: "Jul", value: 349 },
  { name: "Aug", value: 430 },
];
const listingItems = [
  {
    label: "Số lượng người dùng mới trong ngày",
    value: "43,279",
    color: "#e91e63",
    imgWidth: 34,
    imgHeight: 34,
    value: "totalUserInDay",
  },
  {
    label: "Số lượng xe mới trong ngày",
    value: "19",
    color: "#009688",
    imgWidth: 28,
    imgHeight: 28,
    value: "totalCarInDay",
  },
];
export default function Dashboard() {
  const [carList, setCarList] = useState([]); // State for cars list
  const [userList, setUserList] = useState([]); // State for cars list
  const [carPerDay, setCarPerDay] = useState([]); // State for cars list
  const [userPerDay, setUserPerDay] = useState([]); // State for cars list

  const [dropdownValues, setDropdownValues] = useState({
    keywords: "",
    sortItems: [
      {
        field: "brandId",
        desc: true,
      },
    ],
    page: 0,
    pageSize: 5,
  });
  const [dropdownValues2, setDropdownValues2] = useState({
    keywords: "",
    sortItems: [
      {
        field: "username",
        desc: true,
      },
    ],
    page: 0,
    pageSize: 5,
  });
  const queryCar = async () => {
    try {
      const res = await axiosInstance.post("/admin/cars", dropdownValues);
      setCarList(res.data.data.list);
    } catch (error) {}
  };
  const queryUser = async () => {
    try {
      const res = await axiosInstance.post("/admin/users", dropdownValues2);
      setUserList(res.data.data.list);
    } catch (error) {}
  };
  const queryPerDay = async () => {
    try {
      const res = await axiosInstance.get("/admin/reports/in-day");
      setCarPerDay(res.data.data.totalCarInDay);
      setUserPerDay(res.data.data.totalUserInDay);
    } catch (error) {}
  };
  useEffect(() => {
    queryCar();
    queryUser();
    queryPerDay();
  }, []);
  return (
    <section className="dashboard-widget">
      <div className="right-box">
        <Sidebar />
        <div className="content-column">
          <div className="inner-column">
            <div className="list-title">
              <h3 className="title">Dashboard</h3>
            </div>
            <div className="row">
              {listingItems.map((item, index) => (
                <div className="col-xl-6 col-lg-12" key={index}>
                  <div
                    className="uii-item"
                    style={{ height: "500px", padding: 0 }}
                  >
                    <h3 style={{padding: '0 30px'}}>
                      {item.label}:{" "}
                      {item.value === "totalCarInDay" ? carPerDay : userPerDay}
                    </h3>
                    <ResponsiveContainer width="100%">
                      <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={item.color}
                          fill={item.color}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
            <div className="graph-content">
              <div className="row">
                <div className="col-xl-6">
                  <div className="widget-content">
                    <div className="my-listing-table wrap-listing">
                      <div className="graph-head">
                        <h3>Xe chờ duyệt</h3>
                        <Link to={"/waiting-approve-car"} className="btn-title">
                          Xem thêm
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_601_243)">
                              <path
                                d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                                fill="#050B20"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_601_243">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      </div>
                      <div className="cart-table">
                        <table>
                          <thead>
                            <tr className="title">
                              <th style={{ padding: 0 }}>Xe</th>
                              <th style={{ padding: 0 }}>Hãng</th>
                              <th style={{ padding: 0 }}>Năm sản xuất</th>
                              <th style={{ padding: 0 }}>Động cơ</th>
                              <th style={{ padding: 0 }}>Hộp số</th>
                            </tr>
                          </thead>
                          <tbody>
                            {carList.map((item, index) => (
                              <tr className="content" key={index}>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item?.name}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.brand.name}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.manufacturingYear}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.fuel.name}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.transmission}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="widget-content">
                    <div className="my-listing-table wrap-listing">
                      <div className="graph-head">
                        <h3>Danh sách người dùng</h3>
                        <Link to={"/list-user"} className="btn-title">
                          Xem thêm
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_601_243)">
                              <path
                                d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                                fill="#050B20"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_601_243">
                                <rect width={14} height={14} fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      </div>
                      <div className="cart-table">
                        <table>
                          <thead>
                            <tr className="title">
                              <th style={{ padding: 0 }}>Họ và tên</th>
                              <th style={{ padding: 0 }}>ID</th>
                              <th style={{ padding: 0 }}>Số điện thoại</th>
                              <th style={{ padding: 0 }}>Username</th>
                              <th style={{ padding: 0 }}>Trạng thái</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userList.map((item, index) => (
                              <tr className="content" key={index}>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item?.fullname}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.id}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.phoneNum}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {item.username}
                                </td>
                                <td
                                  style={{ padding: "20px", paddingLeft: "0" }}
                                >
                                  {!item.lock ? "Đang hoạt động" : "Đã khóa"}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
