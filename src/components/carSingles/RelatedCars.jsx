import { carData } from "@/data/cars";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default function RelatedCars({ relatedList }) {
  return (
    <section className="cars-section-three">
      <div className="boxcar-container">
        <div className="boxcar-title wow fadeInUp">
          <h2>Xe cùng loại</h2>
        </div>

        {relatedList.length > 4 && (
          <Slider
            slidesToScroll={1}
            slidesToShow={4}
            responsive={[
              {
                breakpoint: 1600,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  arrows: true,
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
            ]}
            arrows
            className="row car-slider-three wow fadeInUp"
          >
            {relatedList.map((car, index) => (
              <div
                key={index}
                className="car-block-three col-lg-3 col-md-6 col-sm-12"
              >
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <Link to={`/inventory-page-single-v2/${car.slug}`}>
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
                      <Link to={`/inventory-page-single-v2/${car.slug}`}>
                        {car.name}
                      </Link>
                    </h6>
                    <div className="text">
                      {car.description.slice(0, 50)}...
                    </div>
                    <ul>
                      <li>
                        <i className="flaticon-gasoline-pump" /> {car.kmDriven}{" "}
                        km
                      </li>
                      <li>
                        <i className="flaticon-speedometer" /> {car.fuel.name}
                      </li>
                      <li>
                        <i className="flaticon-gearbox" /> {car.transmission}
                      </li>
                    </ul>
                    <div className="btn-box">
                      <span>{car.price.toLocaleString("en-US")} triệu</span>
                      {/* <small>{car.discountPrice}</small> */}
                      <Link
                        to={`/inventory-page-single-v2/${car.slug}`}
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
          </Slider>
        )}
        <div style={{ display: "flex", gap: "10px" }}>
          {relatedList.length &&
            relatedList.length <= 4 &&
            relatedList.map((car, index) => (
              <div
                key={index}
                className="car-block-three col-lg-3 col-md-6 col-sm-12"
              >
                <div className="inner-box">
                  <div
                    className={`image-box ${
                      car.badge == "Great Price" ? "two" : ""
                    }`}
                  >
                    <div className="slider-thumb">
                      <div className="image">
                        <Link to={`/inventory-page-single-v2/${car.slug}`}>
                          <img
                            alt={car.alt}
                            src={car.logo}
                            width={329}
                            height={220}
                            style={{ height: "220px" }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="content-box">
                    <h6 className="title">
                      <Link to={`/inventory-page-single-v2/${car.slug}`}>
                        {car.name}
                      </Link>
                    </h6>
                    <div className="text">
                      {car.description.slice(0, 40)}...
                    </div>
                    <ul>
                      <li>
                        <i className="flaticon-gasoline-pump" /> {car.kmDriven}{" "}
                        km
                      </li>
                      <li>
                        <i className="flaticon-speedometer" /> {car.fuel?.name}
                      </li>
                      <li>
                        <i className="flaticon-gearbox" /> {car.transmission}
                      </li>
                    </ul>
                    <div className="btn-box">
                      <span>{car.price.toLocaleString("en-US")} triệu</span>
                      <Link
                        to={`/inventory-page-single-v2/${car.slug}`}
                        className="details"
                      >
                        View Details
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={14}
                          height={14}
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_634_448)">
                            <path
                              d="M13.6109 0H5.05533C4.84037 0 4.66643 0.173943 4.66643 0.388901C4.66643 0.603859 4.84037 0.777802 5.05533 0.777802H12.6721L0.113697 13.3362C-0.0382246 13.4881 -0.0382246 13.7342 0.113697 13.8861C0.18964 13.962 0.289171 14 0.388666 14C0.488161 14 0.587656 13.962 0.663635 13.8861L13.222 1.3277V8.94447C13.222 9.15943 13.3959 9.33337 13.6109 9.33337C13.8259 9.33337 13.9998 9.15943 13.9998 8.94447V0.388901C13.9998 0.173943 13.8258 0 13.6109 0Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_634_448">
                              <rect width={14} height={14} fill="white" />
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
    </section>
  );
}
