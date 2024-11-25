import SelectComponent from "@/components/common/SelectComponent";
import MetaComponent from "@/components/common/Metacomonent";
import Header1 from "@/components/headers/Header1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import React from "react";
import axiosInstance from "@/core/axiosInstance";
import { useEffect, useState } from "react";
export default function AddListings() {
  const [images, setImages] = useState([]);
  const [fuelList, setFuelList] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [styleList, setStyleList] = useState([]);
  const [params, setParams] = useState({
    name: "string",
    description: "string",
    manufacturingYear: 0,
    seatCapacity: 1,
    status: "string",
    transmission: "string",
    drivetrain: "string",
    images: ["string"],
    slug: "string",
    version: "string",
    kmDriven: 0,
    price: 0,
    logo: "string",
    brandId: 0,
    modelId: 0,
    styleId: 0,
    originId: 0,
    fuelId: 0,
    outsideColorId: 0,
    insideColorId: 0,
    cityId: 0,
    districtId: 0,
    wardId: 0,
    address: "string",
  });
  const dropdownItems = [
    { name: "Tình trạng xe", code: "" },
    { name: "Xe mới", code: "NEW" },
    { name: "Xe cũ", code: "OLD" },
  ];
  const gearItems = [
    { name: "Số sàn", code: "Manual" },
    { name: "Số tự động", code: "Automatic" },
    { name: "Hybrid", code: "Hybird" },
    { name: "Khác", code: "Other" },
  ];
  const metadata = {
    title: "Add Listings || Boxcar - Reactjs Car Template",
    description: "Boxcar - Reactjs Car Template",
  };
  const [brandList, setBrandList] = useState([]);
  const [provinces, setProvinces] = useState([]);
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
  const handleDropdownChange = (key, value) => {
    // setDropdownValue({ key, value }); // Update the store
  };
  const getAllCities = async () => {
    try {
      const res = await axiosInstance.get("/address/cities");
      setProvinces(res.data.data);
    } catch (error) {}
  };
  // Handle form submission
  const handleSubmit = () => {
    // console.log("Selected Filters:", dropdownValues);
    queryCar();
    // e.preventDefault();
    // Add logic to filter results based on selected values
  };
  const uploadImg = async (element) => {
    try {
      const formData = new FormData();
      formData.append("file", element);

      const res = await axios.post(
        "http://18.139.116.136:8080/api/files/upload",
        formData,
        {
          headers: {
            Accept: undefined,
          },
        }
      );
      imgList.value.push(res.data.data);
    } catch (error) {
      console.log(error);
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  useEffect(() => {
    getAllBrand();
    getAllCities();
    getAllFuel();
    getAllOrigin();
    getAllColor();
    getAllStyle();
  }, []);
  const getAllFuel = async () => {
    try {
      const res = await axiosInstance.get("/fuels");
      setFuelList(res.data.data);
    } catch (error) {}
  };
  const getAllOrigin = async () => {
    try {
      const res = await axiosInstance.get("/origins");
      setOriginList(res.data.data);
    } catch (error) {}
  };
  const getAllColor = async () => {
    try {
      const res = await axiosInstance.get("/colors");
      setColorList(res.data.data);
    } catch (error) {}
  };
  const getAllStyle = async () => {
    try {
      const res = await axiosInstance.get("/styles");
      setStyleList(res.data.data);
    } catch (error) {}
  };
  const getAllBrand = async () => {
    try {
      const res = await axiosInstance.get("/brands");
      setBrandList(res.data.data);
    } catch (error) {}
  };
  const onSubmit = () => {
    console.log(images);
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
                  <p class="line-height-3 m-0 mt-4 red">
                    Chú ý: Tin đăng của bạn sẽ không được duyệt (ko được đăng)
                    nếu :
                  </p>
                  <p class="line-height-3 m-0 mt-1 red">
                    - Nội dung tin đăng không đúng, tin đăng có dạng quảng cáo,
                    spam
                  </p>
                  <p class="line-height-3 m-0 mt-1 red">
                    - Trong phần mô tả để thông tin liên hệ (số ĐT hay email).
                    (Thông tin liên hệ sẽ được lấy trong phần thông tin cá nhân
                    tương ứng với tài khoản của bạn).
                  </p>
                  <p class="line-height-3 m-0 mt-1 red">
                    <b>
                      Bạn vui lòng nhập đúng thông tin và đúng quy định để tin
                      đăng được kiểm duyệt nhanh, xin cảm ơn !
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
                    <form className="row">
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Hãng sản xuất</label>
                          <SelectComponent
                            options={brandList}
                            value={
                              brandList.find((el) => el.id === params.brandId)
                                ?.name ?? params.brandId
                            }
                            onChange={(value) =>
                              setParams({ ...params, brandId: value.id })
                            }
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
                          />
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
                            options={styleList}
                            value={
                              styleList.find((el) => el.id === params.styleId)
                                ?.name ?? params.styleId
                            }
                            onChange={(value) =>
                              setParams({ ...params, styleId: value.id })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Xuất xứ</label>
                          <SelectComponent
                            options={originList}
                            value={
                              originList.find((el) => el.id === params.originId)
                                ?.name ?? params.originId
                            }
                            onChange={(value) =>
                              setParams({ ...params, originId: value.id })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Tình trạng</label>
                          <SelectComponent
                            options={dropdownItems}
                            value={
                              dropdownItems.find(
                                (el) => el.code === params.status
                              )?.name ?? params.status
                            }
                            onChange={(value) =>
                              setParams({ ...params, status: value.code })
                            }
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
                            options={gearItems}
                            value={
                              styleList.find(
                                (el) => el.code === params.transmission
                              )?.name ?? params.transmission
                            }
                            onChange={(value) =>
                              setParams({ ...params, transmission: value.code })
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Nhiên liệu</label>
                          <SelectComponent
                            options={fuelList}
                            value={
                              fuelList.find((el) => el.id === params.fuelId)
                                ?.name ?? params.fuelId
                            }
                            onChange={(value) =>
                              setParams({ ...params, fuelId: value.id })
                            }
                          />{" "}
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
                            options={colorList}
                            value={
                              colorList.find(
                                (el) => el.id === params.outsideColorId
                              )?.name ?? params.outsideColorId
                            }
                            onChange={(value) =>
                              setParams({ ...params, outsideColorId: value.id })
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Nội thất</label>
                          <SelectComponent
                            options={colorList}
                            value={
                              colorList.find(
                                (el) => el.id === params.insideColorId
                              )?.name ?? params.insideColorId
                            }
                            onChange={(value) =>
                              setParams({ ...params, insideColorId: value.id })
                            }
                          />{" "}
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
                    <form className="row">
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
                          />
                        </div>
                      </div>
                      <div className="col-lg-12"></div>
                    </form>
                  </div>
                </div>
                <div className="form-submit">
                  <button className="theme-btn" onClick={onSubmit}>
                    Đăng tin bán xe
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
