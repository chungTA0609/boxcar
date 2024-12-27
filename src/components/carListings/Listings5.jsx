import { useEffect, useState } from "react";

import axiosInstance from "@/core/axiosInstance";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import NotfoundItem from "../otherPages/NotfoundItem";
export default function Listings5() {
  const [price, setPrice] = useState([0, 0]);
  const [cars, setCars] = useState([]);
  const [params, setParams] = useState({
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
          <h2>Tin mua xe</h2>
        </div>
        <div className="row">
          <div className="wrap-sidebar-dk side-bar col-xl-3 col-md-12 col-sm-12">
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
            {cars.length === 0 && <NotfoundItem />}
            {cars.length > 0 && (
              <div className="right-box">
                {/* service-block-thirteen */}
                {cars.map((elm, i) => (
                  <div key={i} className="service-block-thirteen">
                    <div className="inner-box">
                      <div
                        className="right-box"
                        style={{
                          borderRadius: "16px 0 0 16px",
                          display: "block",
                          minWidth: "250px",
                        }}
                      >
                        <h4 className="title">
                          <span>Mã tin</span>
                        </h4>
                        <div className="text">{elm.code}</div>
                      </div>
                      <div className="right-box" style={{ minWidth: "824px" }}>
                        <div
                          className="content-box"
                          style={{ maxWidth: "500px" }}
                        >
                          <h4 className="title">
                            <span to={`/inventory-page-single-v1/${elm.id}`}>
                              {elm.title}
                            </span>
                          </h4>
                          <div
                            className="html-content text"
                            dangerouslySetInnerHTML={{ __html: elm.content }}
                          />{" "}
                        </div>
                        <div
                          className="content-box-two"
                          style={{ minWidth: "150px", textAlign: "right" }}
                        >
                          <h4 className="title">
                            {elm?.min?.toLocaleString("en-US")} -{" "}
                            {elm?.max?.toLocaleString("en-US")}
                          </h4>
                          <span>Liên hệ</span>
                          <div className="image-box">
                            <img
                              src="/images/resource/phone1-2.svg"
                              width={18}
                              height={18}
                              style={{ margin: "5px" }}
                              alt=""
                            />
                            {elm ? elm.user?.phoneNum : ""}
                          </div>
                          <div className="image-box">
                            <img
                              src="/images/resource/phone1-1.svg"
                              width={18}
                              height={18}
                              alt=""
                              style={{ margin: "5px" }}
                            />
                            {elm ? elm.user?.ward?.pathWithType : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
