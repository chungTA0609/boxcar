import SelectComponent from "@/components/common/SelectComponent";
import MetaComponent from "@/components/common/Metacomonent";
import Header1 from "@/components/headers/Header1";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import React from "react";
import axiosInstance from "@/core/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

import { useEffect, useState } from "react";
export default function AddListings() {
  const isLogin = useStoreState((state) => state.isLogin);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const userData = useStoreState((state) => state.userData);

  const [images, setImages] = useState([]);
  const [imagesBinanry, setImagesBinanry] = useState([]);
  const [fuelList, setFuelList] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [styleList, setStyleList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [params, setParams] = useState({
    name: "string",
    description: "string",
    manufacturingYear: 0,
    seatCapacity: 1,
    status: "string",
    transmission: "string",
    drivetrain: "string",
    images: [],
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
    address: "",
  });
  const dropdownItems = [
    { name: "Tình trạng xe", code: "" },
    { name: "Xe mới", code: "NEW" },
    { name: "Xe cũ", code: "OLD" },
  ];
  const transmissionList = [
    {
      code: "FWD",
      name: "FWD - Dẫn động cầu trước",
    },
    {
      code: "RWD",
      name: "RWD - Dẫn động cầu sau",
    },
    {
      code: "4WD",
      name: "4WD - Dẫn động 4 bánh",
    },
    {
      code: "AWD",
      name: "AWD - 4 bánh toàn thời gian",
    },
  ];
  const gearItems = [
    { name: "Số sàn", code: "Manual" },
    { name: "Số tự động", code: "Automatic" },
    { name: "Hybrid", code: "Hybird" },
    { name: "Khác", code: "Other" },
  ];
  const metadata = {
    title: "Đăng tin bán xe",
    description: "Đăng tin bán xe",
  };
  const [brandList, setBrandList] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newBinImg = [...imagesBinanry];
    newBinImg[index] = file;
    setImagesBinanry(newBinImg);
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
    const newImagesBinary = imagesBinanry.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setImagesBinanry(newImagesBinary);
  };
  const getAllCities = async () => {
    try {
      const res = await axiosInstance.get("/address/cities");
      setProvinces(res.data.data);
    } catch (error) {}
  };

  const getDistrictByCity = async (cityCode) => {
    try {
      const res = await axiosInstance.get(
        `/address/districts?cityCode=${cityCode}`
      );
      setDistricts(res.data.data);
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
  const getWardByDistrict = async (districtCode) => {
    try {
      const res = await axiosInstance.get(
        `/address/wards?districtCode=${districtCode}`
      );
      setWards(res.data.data);
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
  const uploadImg = async (element) => {
    try {
      setParams({ ...params, images: [] });
      const formData = new FormData();
      formData.append("file", element);

      const res = await axiosInstance.post(
        "/files/upload",
        formData
        // {
        //   headers: {
        //     Accept: undefined,
        //   },
        // }
      );
      setParams({ ...params, images: params.images.push(res.data.data) });
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
    if (!isLogin) navigate("/login");
    getAllBrand();
    getAllCities();
    getAllFuel();
    getAllOrigin();
    getAllColor();
    getAllStyle();
  }, []);
  useEffect(() => {
    getDistrictByCity(provinces.find((el) => el.id === params.cityId)?.code);
  }, [params.cityId]);
  useEffect(() => {
    setParams({ ...params, modelId: null });
    getAllModel(provinces.find((el) => el.id === params.cityId)?.id);
  }, [params.brandId]);
  useEffect(() => {
    getWardByDistrict(
      districts.find((el) => el.id === params.districtId)?.code
    );
  }, [params.districtId]);
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
  const getAllModel = async () => {
    try {
      if (params.brandId) {
        const res = await axiosInstance.get(
          `/models?brandId=${params.brandId}`
        );
        setModelList(res.data.data);
      }
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
  const onSubmit = async () => {
    try {
      console.log(imagesBinanry);
      await upLoadProcess();
      pushCar();
    } catch (error) {}
  };
  const upLoadProcess = async () => {
    for (const element of imagesBinanry) {
      await uploadImg(element);
    }
  };

  const pushCar = async () => {
    try {
      await axiosInstance.post("/cars", {
        ...params,
        price: params.price * 1000000,
        slug: (params.name + " " + params.version + " " + Date.now())
          .split(" ")
          .join("-")
          .toLowerCase(),
        manufacturingYear: parseInt(params.manufacturingYear),
        seatCapacity: parseInt(params.seatCapacity),
        kmDriven: parseInt(params.kmDriven),
        address: [
          params.address,
          wards.find((el) => el.id === params.wardId)?.name,
          districts.find((el) => el.id === params.districtId)?.name,
          provinces.find((el) => el.id === params.provinces)?.name,
        ].join(", "),
        logo: params.images[0],
      });
      // isLoading.value = false;
      // toast.add({
      //   severity: "info",
      //   summary: "Confirmed",
      //   detail: "Đăng tin thành công",
      //   life: 3000,
      // });
      // confirmModal.value = false;
      // router.push("/mua-xe");
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
      // confirmModal.value = false;
      // isLoading.value = false;
      console.log(error);
    }
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
                                ?.name ?? "Hãng sản xuất"
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
                          <SelectComponent
                            options={modelList}
                            value={
                              modelList.find((el) => el.id === params.modelId)
                                ?.name ?? "Tên xe"
                            }
                            onChange={(value) =>
                              setParams({ ...params, modelId: value.id })
                            }
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
                            value={params.manufacturingYear}
                            onChange={(value) =>
                              setParams({
                                ...params,
                                manufacturingYear: value.target.value,
                              })
                            }
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
                            value={params.version}
                            onChange={(value) =>
                              setParams({
                                ...params,
                                version: value.target.value,
                              })
                            }
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
                                ?.name ?? "Kiểu dáng"
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
                                ?.name ?? "Xuất xứ"
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
                              )?.name ?? "Tình trạng"
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
                            placeholder="Số km đã đi"
                            value={params.kmDriven}
                            onChange={(value) =>
                              setParams({
                                ...params,
                                kmDriven: value.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Dẫn động</label>
                          <SelectComponent
                            options={transmissionList}
                            value={
                              transmissionList.find(
                                (el) => el.code === params.drivetrain
                              )?.name ?? "Dẫn động"
                            }
                            onChange={(value) =>
                              setParams({ ...params, drivetrain: value.code })
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="form-column col-lg-4">
                        <div className="form_boxes">
                          <label>Hộp số</label>
                          <SelectComponent
                            options={gearItems}
                            value={
                              gearItems.find(
                                (el) => el.code === params.transmission
                              )?.name ?? "Hộp số"
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
                                ?.name ?? "Nhiên liệu"
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
                            value={params.price}
                            onChange={(value) =>
                              setParams({
                                ...params,
                                price: value.target.value,
                              })
                            }
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
                              )?.name ?? "Ngoại thất"
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
                              )?.name ?? "Nội thất"
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
                            placeholder="Số chỗ ngồi"
                            value={params.seatCapacity}
                            onChange={(value) =>
                              setParams({
                                ...params,
                                seatCapacity: value.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-column col-lg-12">
                        <div className="form_boxes v2">
                          <label>Thông tin mô tả</label>
                          <div className="drop-menu">
                            <textarea
                              name="message"
                              placeholder="Thông tin mô tả"
                              defaultValue={""}
                              value={params.description}
                              onChange={(value) =>
                                setParams({
                                  ...params,
                                  description: value.target.value,
                                })
                              }
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
                            disabled
                            type="text"
                            placeholder="Tên"
                            value={userData ? userData.fullname : ""}
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
                            value={userData ? userData.phoneNum : ""}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_boxes">
                          <label>Thành phố</label>
                          <SelectComponent
                            options={provinces}
                            value={
                              provinces.find((el) => el.id === params.cityId)
                                ?.name ?? "Thành phố"
                            }
                            onChange={(value) =>
                              setParams({ ...params, cityId: value.id })
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_boxes">
                          <label>Huyện</label>
                          <SelectComponent
                            options={districts}
                            value={
                              districts.find(
                                (el) => el.id === params.districtId
                              )?.name ?? "Huyện"
                            }
                            onChange={(value) =>
                              setParams({ ...params, districtId: value.id })
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form_boxes">
                          <label>Xã</label>
                          <SelectComponent
                            options={wards}
                            value={
                              wards.find((el) => el.id === params.wardId)
                                ?.name ?? "Xã"
                            }
                            onChange={(value) =>
                              setParams({ ...params, wardId: value.id })
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form_boxes">
                          <label>Địa chỉ</label>
                          <input
                            name="address"
                            required
                            type="text"
                            placeholder="Địa chỉ"
                            onChange={(value) =>
                              setParams({
                                ...params,
                                address: value.target.value,
                              })
                            }
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
