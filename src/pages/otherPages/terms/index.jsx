import Sidebar from "@/components/carListings/Sidebar";
import MetaComponent from "@/components/common/Metacomonent";
import SelectComponent from "@/components/common/SelectComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import { useState } from "react";
export default function AddListings() {
  const [images, setImages] = useState([
    "/images/resource/list2-1.png",
    "/images/resource/list2-2.png",
    "/images/resource/list2-3.png",
  ]);
  const metadata = {
    title: "Add Listings || Boxcar - Reactjs Car Template",
    description: "Boxcar - Reactjs Car Template",
  };
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = (index) => {
    const newImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(newImages);
  };

  return (
    <>
      <MetaComponent meta={metadata} />

      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <Sidebar />
      <section className="dashboard-widget">
        <div className="right-box">
          <div className="content-column">
            <div className="inner-column">
              <div className="list-title">
                <h3 className="title">Đăng tin bán xe</h3>
                <div className="text">
                  <p className="line-height-3 m-0 mt-4 red">
                    Chú ý: Tin đăng của bạn sẽ không được duyệt (ko được đăng)
                    nếu :
                  </p>
                  <p className="line-height-3 m-0 mt-1 red">
                    - Nội dung tin đăng không đúng, tin đăng có dạng quảng cáo,
                    spam
                  </p>
                  <p className="line-height-3 m-0 mt-1 red">
                    - Trong phần mô tả để thông tin liên hệ (số ĐT hay email).
                    (Thông tin liên hệ sẽ được lấy trong phần thông tin cá nhân
                    tương ứng với tài khoản của bạn).
                  </p>
                  <p className="line-height-3 m-0 mt-1 red">
                    <b>
                      Bạn vui lòng nhập đúng thông tin và đúng quy định để tin
                      đăng được kiểm duyệt nhanh, xin cảm ơn !{" "}
                    </b>
                  </p>
                </div>
              </div>
              <div className="form-box">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Thông tin, thông số xe
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="media-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#media"
                      type="button"
                      role="tab"
                      aria-controls="media"
                      aria-selected="false"
                    >
                      Thêm ảnh
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="location-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#location"
                      type="button"
                      role="tab"
                      aria-controls="location"
                      aria-selected="false"
                    >
                      Thông tin liên hệ
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <form onSubmit={(e) => e.preventDefault()} className="row">
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Hãng sản xuất</label>

                          <SelectComponent
                            options={["Ali Tufan", "Ali Tufan", "Ali Tufan"]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Tên xe</label>
                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Tên xe"
                          />{" "}
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Năm sản xuất</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Năm sản xuất"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Phiên bản</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Phiên bản"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Kiểu dáng</label>

                          <SelectComponent
                            options={["Sedan", "Select Label", "Select Label"]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Xuất xứ</label>

                          <SelectComponent
                            options={[
                              "Select Make",
                              "Select Label",
                              "Select Lable",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Tình trạng</label>

                          <SelectComponent
                            options={[
                              "Select Model",
                              "Select Label",
                              "Select Label",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Số km đã đi</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Phiên bản"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Hộp số</label>

                          <SelectComponent
                            options={[
                              "Select Offer",
                              "Select Label",
                              "Select Label",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Nhiên liệu</label>

                          <SelectComponent
                            options={[
                              "Select Type",
                              "Select Label",
                              "Select Label",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Giá</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Giá"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Ngoại thất</label>

                          <SelectComponent
                            options={[
                              "Select Fuel",
                              "Select Label",
                              "Select Label",
                            ]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Nội thất</label>

                          <SelectComponent
                            options={["75,000", "Select Label", "Select Label"]}
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Số chỗ ngồi</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Phiên bản"
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-12">
                        <div className="form_boxes v2">
                          <label>Thông tin mô tả</label>
                          <div className="drop-menu">
                            <textarea
                              name="message"
                              placeholder="Lorem Ipsum Dolar Sit Amet"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    className="tab-pane fade gallery-sec style1"
                    id="media"
                    role="tabpanel"
                    aria-labelledby="media-tab"
                  >
                    <div className="right-box-three">
                      <h6 className="title">Gallery</h6>
                      <form className="gallery-box">
                        <div className="inner-box add-input-image">
                          {images.map((imgSrc, index) => (
                            <div className="image-box" key={index}>
                              <img
                                width={190}
                                height={167}
                                src={imgSrc}
                                alt={`Preview ${index}`}
                                className="uploaded-img"
                              />
                              <div className="content-box">
                                <ul className="social-icon">
                                  <li>
                                    <a onClick={() => handleDelete(index)}>
                                      <img
                                        width={18}
                                        height={18}
                                        src="/images/resource/delet.svg"
                                        alt=""
                                      />
                                    </a>
                                  </li>
                                  <li>
                                    {/* Hidden input and label for upload */}
                                    <label htmlFor={`file-upload-${index}`}>
                                      <a>
                                        <img
                                          width={18}
                                          height={18}
                                          src="/images/resource/delet1-1.svg"
                                          alt="Upload"
                                        />
                                      </a>
                                    </label>
                                    <input
                                      id={`file-upload-${index}`}
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) =>
                                        handleImageChange(e, index)
                                      }
                                      style={{ display: "none" }}
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ))}

                          {/* Upload Button */}
                          <div className="uplode-box">
                            <div className="content-box">
                              <label htmlFor="upload-new">
                                <img
                                  width={34}
                                  height={34}
                                  src="/images/resource/uplode.svg"
                                  alt="Upload"
                                />
                                <span>Upload</span>
                              </label>
                              <input
                                id="upload-new"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) =>
                                  handleImageChange(e, images.length)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text">
                          Max file size is 1MB, Minimum dimension: 330x300 And
                          Suitable files are .jpg &amp; .png
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade map-sec style1"
                    id="location"
                    role="tabpanel"
                    aria-labelledby="location-tab"
                  >
                    <form onSubmit={(e) => e.preventDefault()} className="row">
                      <div className="col-lg-6">
                        <div className="form_boxes">
                          <label>Tên</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Tên"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form_boxes">
                          <label>Liên hệ</label>

                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="SĐT"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_boxes">
                          <label>Thành phố</label>

                          <SelectComponent options={["33", "33", "33"]} />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_boxes">
                          <label>Huyện</label>

                          <SelectComponent options={["#", "#", "#"]} />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_boxes">
                          <label>Xã</label>

                          <SelectComponent options={["#", "#", "#"]} />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>Địa chỉ</label>
                          <input
                            name="name"
                            required
                            type="text"
                            placeholder="Địa chỉ"
                          />{" "}
                        </div>
                      </div>
                      <div className="col-lg-12"></div>
                    </form>
                  </div>
                </div>
                <div className="form-submit">
                  <button type="submit" className="theme-btn">
                    Next Location
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_711_3214)">
                        <path
                          d="M13.6106 0H5.05509C4.84013 0 4.66619 0.173943 4.66619 0.388901C4.66619 0.603859 4.84013 0.777802 5.05509 0.777802H12.6719L0.113453 13.3362C-0.0384687 13.4881 -0.0384687 13.7342 0.113453 13.8861C0.189396 13.962 0.288927 14 0.388422 14C0.487917 14 0.587411 13.962 0.663391 13.8861L13.2218 1.3277V8.94447C13.2218 9.15943 13.3957 9.33337 13.6107 9.33337C13.8256 9.33337 13.9996 9.15943 13.9996 8.94447V0.388901C13.9995 0.173943 13.8256 0 13.6106 0Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_711_3214">
                          <rect width={14} height={14} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
