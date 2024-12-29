import axiosInstance from "@/core/axiosInstance";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../common/Pagination";
import Footer1 from "@/components/footers/Footer1";
import NotfoundItem from "../otherPages/NotfoundItem";

export default function Listings2({ carSearch }) {
  const [carList, setCarList] = useState([]); // State for cars list
  const dropdownValues = useStoreState((state) => state.dropdownValues);
  const setDropdownValue = useStoreActions(
    (actions) => actions.setDropdownValue
  );
  const gearItems = [
    { name: "Số sàn", code: "Manual" },
    { name: "Số tự động", code: "Automatic" },
    { name: "Hybrid", code: "Hybird" },
    { name: "Khác", code: "Other" },
  ];
  const location = useLocation();
  const { brandId } = location.state || {};
  const resetDropDownValue = useStoreActions(
    (actions) => actions.resetDropDownValue
  );
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 12,
    total: 0,
  });
  const queryCar = async () => {
    try {
      const res = await axiosInstance.post("/cars/query", dropdownValues);
      setCarList(res.data.data.list);
      setPagination((prev) => ({ ...prev, total: res.data.data.totalSize }));
    } catch (error) {}
  };
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page })); // Update the page in the pagination state
    setDropdownValue({ key: "page", value: page - 1 });
  };
  useEffect(() => {
    setCarList(carSearch);
  }, [carSearch]); // Re-fetch car data whenever filters change

  // React to pagination changes
  useEffect(() => {
    queryCar();
  }, [pagination.page, brandId]);

  // useEffect(() => {
  //   if (brandId) {
  //     setDropdownValue({ key: "brandId", value: brandId });
  //   } else {
  //     resetDropDownValue();
  //   }
  // }, [brandId]);

  return (
    <>
      <section className="cars-section-four v1 layout-radius">
        <div className="boxcar-container">
          <h2>Danh sách xe</h2>
          {carList.length === 0 && <NotfoundItem />}
          {carList.length > 0 && (
            <div className="row wow fadeInUp">
              {carList.map((car) => (
                <div
                  key={car.id}
                  className="car-block-four col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <Link to={`/thong-tin-xe/${car.slug}`}>
                          <img
                            alt={car.alt}
                            src={car.logo}
                            width={329}
                            height={220}
                            style={{ height: "220px" }}
                          />
                        </Link>
                      </figure>
                    </div>
                    <div className="content-box">
                      <h6 className="title">
                        <Link to={`/thong-tin-xe/${car.slug}`}>
                          {car.brand.isTruck ? car.brand.name : car.name}
                        </Link>
                      </h6>
                      <div className="text" style={{ minHeight: "70px" }}>
                        {car.description.slice(0, 50)}...
                      </div>
                      <ul>
                        <li>
                          <i className="flaticon-gasoline-pump" />{" "}
                          {car.kmDriven} km
                        </li>
                        <li>
                          <i className="flaticon-speedometer" /> {car.fuel.name}
                        </li>
                        <li>
                          <i className="flaticon-gearbox" />{" "}
                          {gearItems.find((el) => el.code === car.transmission)
                            ?.name ?? ""}
                        </li>
                      </ul>
                      <div className="btn-box">
                        <span>{car.price.toLocaleString("en-US")} </span>
                        {/* <small>{car.discountPrice}</small> */}
                        <Link
                          to={`/thong-tin-xe/${car.slug}`}
                          className="details"
                        >
                          Xem chi tiết
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={14}
                            height={14}
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_601_4346)">
                              <path
                                d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                                fill="#405FF2"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_601_4346">
                                <rect width={14} height={14} />
                              </clipPath>
                            </defs>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {carList.length > 0 && (
            <div className="pagination-sec">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <Pagination
                    totalPages={Math.floor(pagination.total / 12) + 1}
                    onPageChange={handlePageChange}
                  />
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
