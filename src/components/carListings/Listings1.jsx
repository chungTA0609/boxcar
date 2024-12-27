import axiosInstance from "@/core/axiosInstance";
import { carBrands } from "@/data/brands";
import { useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";
import NotfoundItem from "../otherPages/NotfoundItem";

export default function Listings1() {
  const [carList, setCarList] = useState([]); // State for cars list
  const setSearchBrand = useStoreActions((actions) => actions.setSearchBrand);
  const navigate = useNavigate();
  const resetDropDownValue = useStoreActions(
    (actions) => actions.resetDropDownValue
  );
  // const dropdownValues = useStoreState((state) => state.dropdownValues);
  const options = {
    infinite: false,
    slidesToShow: 4.8,
    // initialSlide: -0.3,
    slidesToScroll: 1,

    arrows: true,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  const [searchTerm, setSearchTerm] = useState(undefined); // Controlled state for search input
  const gearItems = [
    { name: "Số sàn", code: "Manual" },
    { name: "Số tự động", code: "Automatic" },
    { name: "Hybrid", code: "Hybird" },
    { name: "Khác", code: "Other" },
  ];
  const setDropdownValue = useStoreActions(
    (actions) => actions.setDropdownValue
  );
  const [pagination, setPagination] = useState({
    page: 0,
    pageSize: 12,
    total: 0,
  });
  const searchBrand = async () => {
    const res = await axiosInstance.post("/cars/query", {
      // ...queryParams,
      brandId: branchSearch.value.id,
      page: pagination.value / 10,
      pageSize: 12,
      sortItems: [
        {
          field: "brandId",
          desc: true,
        },
      ],
    });
    car.value = res.data.data;
  };
  const queryCar = async () => {
    const res = await axiosInstance.post("/cars/query", {
      // ...queryParams,
      // brandId: branchSearch.value,
      keyword: searchTerm,
      page: pagination.page <= 0 ? 0 : pagination.page - 1,
      pageSize: 12,
      sortItems: [
        {
          field: "districtId",
          desc: true,
        },
      ],
    });
    setCarList(res.data.data.list);
    setPagination((prev) => ({ ...prev, total: res.data.data.totalSize }));
  };
  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page })); // Update the page in the pagination state
    setDropdownValue({ key: "page", value: page - 1 });
  };

  // React to pagination changes
  useEffect(() => {
    queryCar();
  }, [pagination.page]); // Trigger queryCar whenever pagination.page changes

  useEffect(() => {
    // Fetch data using the Axios instance
    queryCar();
    getAllBrand();
  }, []);
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      queryCar();
    }
  };

  const [brandList, setBrandList] = useState([]);

  const getAllBrand = async () => {
    try {
      const res = await axiosInstance.get("/brands");
      setBrandList(
        res.data.data.map((element) => {
          return element;
        })
      );
    } catch (error) {}
  };

  return (
    <>
      <section className="boxcar-banner-section-v1 inventory-pager">
        <div className="container">
          <div className="banner-content">
            <div className="form-tabs">
              <div className="form-tab-content">
                <div
                  className="form-tab-content wow fadeInUp"
                  data-wow-delay="300ms"
                >
                  <div className="form-tab-pane current" id="tab-1">
                    <form
                      onSubmit={(e) => e.preventDefault()}
                      style={{ border: "1px solid #000" }}
                    >
                      <div className="form_boxes" style={{ display: "flex" }}>
                        <input
                          type="email"
                          name="email"
                          className="email"
                          defaultValue=""
                          placeholder="Tìm kiếm"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyUp={handleKeyUp} // Trigger search on Enter key
                          style={{ borderRadius: "35px" }}
                        />
                      </div>

                      <Link className="form-submit">
                        <button onClick={queryCar} className="theme-btn">
                          <i className="flaticon-search" />
                        </button>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="boxcar-brand-section section-radius-top bg-1"
        style={{
          padding: "120px 0 150px 0",
        }}
      >
        <div className="boxcar-container">
          <div className="boxcar-title">
            <h2 className="wow fadeInUp">Lựa chọn hãng xe</h2>
            <span
              onClick={() => {
                navigate(`/tim-kiem-xe`);
                resetDropDownValue();
              }}
              className="btn-title"
            >
              Xem thêm
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_601_3199)">
                  <path
                    d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                    fill="#050B20"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_601_3199">
                    <rect width={14} height={14} fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <div
            className="tab-content wow fadeInUp"
            data-wow-delay="200ms"
            id="nav-tabContent"
          >
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <Slider
                {...options}
                className="row car-slider-three slider-layout-1 "
                data-preview="4.8"
              >
                {brandList.map((car, index) => (
                  <div
                    key={index}
                    className="cars-block style-1 col-lg-2 col-md-6 col-sm-6"
                  >
                    <div
                      className={`inner-box wow fadeInUp`}
                      data-wow-delay={car.wowDelay}
                    >
                      <div className="content-box">
                        <div className="title">
                          <span
                            onClick={() => {
                              navigate(`/tim-kiem-xe`, {
                                state: { brandId: car.id },
                              });
                              setDropdownValue({
                                key: "brandId",
                                value: car.id,
                              });
                            }}
                          >
                            {car.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
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
                        <Link to={`/thong-tin-xe/${car.slug}`}>{car.name}</Link>
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
                        <span>{car.price.toLocaleString("en-US")}</span>
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
                    totalPages={Math.ceil(
                      pagination.total / pagination.pageSize
                    )}
                    onPageChange={handlePageChange}
                  />
                </ul>
              </nav>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
