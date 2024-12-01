import { useEffect, useState } from "react";
import { cars } from "@/data/cars";

import axiosInstance from "@/core/axiosInstance";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
export default function Listings5() {
  const [price, setPrice] = useState([0, 0]);
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
              {carss.slice(0, 7).map((elm, i) => (
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
                        <div
                          className="html-content text"
                          dangerouslySetInnerHTML={{ __html: elm.content }}
                        />{" "}
                      </div>
                      <div className="content-box-two">
                        <h4 className="title">
                          {elm.min?.toLocaleString("en-US")} -{" "}
                          {elm.max?.maxtoLocaleString("en-US")}
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
            {carss.length > 0 && (
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
