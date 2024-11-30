import { useEffect, useState } from "react";
import { cars } from "@/data/cars";

import axiosInstance from "@/core/axiosInstance";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
export default function Listings5() {
  const [price, setPrice] = useState([5000, 35000]);
  const [carss, setCars] = useState([]);
  const [params, setParams] = useState({
    min: 0,
    max: 0,
    keyword: "",
    page: 0,
    pageSize: 10,
  });
  const handlePrice = (index, value) => {
    const newPrice = [...price];
    newPrice[index] = parseInt(value, 10) || 0;
    setPrice(newPrice);
    setParams((prevParams) => ({
      ...prevParams,
      min: newPrice[0],
      max: newPrice[1],
    }));
  };

  const onSubmit = async () => {
    try {
      const res = await axiosInstance.post(`/car-buying-articles/query`, {
        ...params,
      });
      setCars(res.data.data.list);
    } catch (error) {}
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSubmit();
    }, 500); // Delay API calls by 500ms

    return () => clearTimeout(timeout); // Cleanup on dependency change
  }, [params]);

  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <section className="cars-section-thirteen layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three wow fadeInUp">
          <ul className="breadcrumb">
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <span>Tin mua xe</span>
            </li>
          </ul>
          <h2>Tin mua xe</h2>
        </div>
        <div className="row">
          <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
            <div className="sidebar-handle">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.75 4.50903C13.9446 4.50903 12.4263 5.80309 12.0762 7.50903H2.25C1.83579 7.50903 1.5 7.84482 1.5 8.25903C1.5 8.67324 1.83579 9.00903 2.25 9.00903H12.0762C12.4263 10.715 13.9446 12.009 15.75 12.009C17.5554 12.009 19.0737 10.715 19.4238 9.00903H21.75C22.1642 9.00903 22.5 8.67324 22.5 8.25903C22.5 7.84482 22.1642 7.50903 21.75 7.50903H19.4238C19.0737 5.80309 17.5554 4.50903 15.75 4.50903ZM15.75 6.00903C17.0015 6.00903 18 7.00753 18 8.25903C18 9.51054 17.0015 10.509 15.75 10.509C14.4985 10.509 13.5 9.51054 13.5 8.25903C13.5 7.00753 14.4985 6.00903 15.75 6.00903Z"
                  fill="#050B20"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 12.009C6.44461 12.009 4.92634 13.3031 4.57617 15.009H2.25C1.83579 15.009 1.5 15.3448 1.5 15.759C1.5 16.1732 1.83579 16.509 2.25 16.509H4.57617C4.92634 18.215 6.44461 19.509 8.25 19.509C10.0554 19.509 11.5737 18.215 11.9238 16.509H21.75C22.1642 16.509 22.5 16.1732 22.5 15.759C22.5 15.3448 22.1642 15.009 21.75 15.009H11.9238C11.5737 13.3031 10.0554 12.009 8.25 12.009ZM8.25 13.509C9.5015 13.509 10.5 14.5075 10.5 15.759C10.5 17.0105 9.5015 18.009 8.25 18.009C6.9985 18.009 6 17.0105 6 15.759C6 14.5075 6.9985 13.509 8.25 13.509Z"
                  fill="#050B20"
                />
              </svg>
              Show Filter
            </div>
            <div className="inventory-sidebar">
              <div className="inventroy-widget widget-location">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form_boxes">
                      <label>Thông tin tìm kiếm</label>
                      <input
                        name="keyword"
                        type="text"
                        placeholder="Tìm kiếm..."
                        onChange={(e) =>
                          setParams({ ...params, keyword: e.target.value })
                        }
                        value={params.keyword}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="price-box">
                      <h6 className="title">Khoảng giá (triệu đồng)</h6>
                      <form
                        onSubmit={(e) => e.preventDefault()}
                        className="row g-0"
                      >
                        <div className="form-column col-lg-6">
                          <div className="form_boxes">
                            <label>Từ</label>
                            <div className="drop-menu">
                              {" "}
                              <input
                                name="place"
                                required
                                type="text"
                                placeholder="Từ"
                                value={price[0]}
                                onChange={(e) => handlePrice(0, e.target.value)}
                              />{" "}
                            </div>
                          </div>
                        </div>
                        <div className="form-column v2 col-lg-6">
                          <div className="form_boxes">
                            <label>Đến</label>
                            <div className="drop-menu">
                              {" "}
                              <input
                                name="place"
                                required
                                type="text"
                                placeholder="Đến"
                                value={price[1]}
                                onChange={(e) => handlePrice(1, e.target.value)}
                              />{" "}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-md-12 col-sm-12">
            <div className="right-box">
              {/* service-block-thirteen */}
              {cars.slice(0, 7).map((elm, i) => (
                <div key={i} className="service-block-thirteen">
                  <div className="inner-box">
                    <div
                      className="right-box"
                      style={{ borderRadius: "16px 0 0 16px" }}
                    >
                      <h4 className="title">
                        <span>Mã tin</span>
                      </h4>
                      <div className="text">{elm.code}</div>
                    </div>
                    <div className="right-box">
                      <div
                        className="content-box"
                        style={{ minWidth: "500px" }}
                      >
                        <h4 className="title">
                          <span to={`/inventory-page-single-v1/${elm.id}`}>
                            {elm.title}
                          </span>
                        </h4>
                        <div className="text">{elm.content}</div>
                      </div>
                      <div className="content-box-two">
                        <h4 className="title">
                          {elm.price} - {elm.price}
                        </h4>
                        <span>Liên hệ</span>
                        <div className="image-box">
                          <img
                            src="/images/resource/phone1-2.svg"
                            width={18}
                            height={18}
                            alt=""
                          />
                          {elm ? elm.userPhoneNum : ""}
                        </div>
                        <div className="image-box">
                          <img
                            src="/images/resource/phone1-1.svg"
                            width={18}
                            height={18}
                            alt=""
                          />
                          {elm ? elm.address : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cars.length > 0 && (
              <div className="pagination-sec">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <Pagination />
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
