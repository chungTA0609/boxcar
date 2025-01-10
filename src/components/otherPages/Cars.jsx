import { carData } from "@/data/cars";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
const gearItems = [
  { name: "Số sàn", code: "Manual" },
  { name: "Số tự động", code: "Automatic" },
  { name: "Hybrid", code: "Hybird" },
  { name: "Khác", code: "Other" },
];
const buttons = [
  { label: "Tin bán xe", isActive: true, id: 1 },
  { label: "Tin mua xe", isActive: false, id: 2 },
];

export default function Cars({ sellCar, buyCar }) {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [sortedItems, setSortedItems] = useState([...carData]);
  useEffect(() => {
    setSortedItems(selectedCategory.id === 1 ? sellCar : buyCar);
  }, [selectedCategory]);

  return (
    <section className="cars-section-four bg-1  pt-5">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2 className="mb-0 ">Danh sách tin mua/bán</h2>
        </div>
        <nav className="wow fadeInUp" data-wow-delay="100ms">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(button)}
                className={`nav-link ${
                  selectedCategory.id == button.id ? "active" : ""
                }`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="tab-content wow fadeInUp" data-wow-delay="200ms">
          <div className="tab-pane fade show active">
            <div className="row">
              {sortedItems.length > 0 &&
                sortedItems.map((car, index) => (
                  <div
                    key={car.id}
                    className="car-block-four col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  >
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <Link to={`/thong-tin-xe/${car?.slug}`}>
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
                          <Link to={`/thong-tin-xe/${car?.slug}`}>
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
                            <i className="flaticon-speedometer" />{" "}
                            {car?.fuel?.name}
                          </li>
                          <li>
                            <i className="flaticon-gearbox" />{" "}
                            {gearItems.find(
                              (el) => el.code === car.transmission
                            )?.name ?? ""}
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
          </div>
        </div>
      </div>
    </section>
  );
}
