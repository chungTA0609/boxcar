import Sidebar from "@/components/carListings/Sidebar";
import MetaComponent from "@/components/common/Metacomonent";
import SelectComponent from "@/components/common/SelectComponent";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import FullScreenLoader from "@/components/otherPages/FullScreenLoader";
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
    name: "",
    description: "",
    manufacturingYear: "",
    seatCapacity: "",
    status: "",
    transmission: "",
    drivetrain: "",
    images: [],
    slug: "",
    version: "",
    kmDriven: "",
    price: "",
    logo: "",
    brandId: "",
    modelId: "",
    styleId: "",
    originId: "",
    fuelId: "",
    outsideColorId: "",
    insideColorId: "",
    cityId: "",
    districtId: "",
    wardId: "",
    address: "",
  });
  const statusCar = [
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
  const [loading, setLoading] = useState(false);

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
      handleUserCity(res.data.data);
    } catch (error) {}
  };

  const getDistrictByCity = async (cityCode) => {
    try {
      const res = await axiosInstance.get(
        `/address/districts?cityCode=${cityCode}`
      );
      setDistricts(res.data.data);
      handleUserDistrict(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getWardByDistrict = async (districtCode) => {
    try {
      const res = await axiosInstance.get(
        `/address/wards?districtCode=${districtCode}`
      );
      setWards(res.data.data);
      handleUserWard();
    } catch (error) {
      console.log(error);
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
    if (params.cityId)
      getDistrictByCity(provinces.find((el) => el.id === params.cityId)?.code);
  }, [params.cityId]);
  useEffect(() => {
    setParams({ ...params, modelId: null });
    getAllModel(provinces.find((el) => el.id === params.cityId)?.id);
  }, [params.brandId]);
  useEffect(() => {
    if (params.districtId) {
      getWardByDistrict(
        districts.find((el) => el.id === params.districtId)?.code
      );
    }
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
    }
  };
  const onSubmit = async () => {
    try {
      if (!validateField()) return;
      if (!(imagesBinanry.length > 0)) {
        toast.error("Vui lòng upload ảnh!");
        return;
      }
      setLoading(true);
      await upLoadProcess();
      pushCar();
    } catch (error) {
      setLoading(false);
    }
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
        name: modelList.find((el) => el.id === params.modelId)?.name,
        slug: (params.name + " " + params.version + " " + Date.now())
          .split(" ")
          .join("-")
          .toLowerCase(),
        manufacturingYear: parseInt(params.manufacturingYear),
        seatCapacity: parseInt(params.seatCapacity),
        kmDriven: parseInt(params.kmDriven),
        address:
          (params.address ? params.address + ", " : "") +
          [
            wards.find((el) => el.id === params.wardId)?.name,
            districts.find((el) => el.id === params.districtId)?.name,
            provinces.find((el) => el.id === params.cityId)?.name,
          ].join(", "),
        logo: params.images[0],
      });
      // isLoading.value = false;
      setLoading(false);
      toast.success("Đăng tin thành công");
      // confirmModal.value = false;
      navigate("/tim-kiem-xe");
    } catch (error) {
      // confirmModal.value = false;
      // isLoading.value = false;
      setLoading(false);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
      console.log(error);
    }
  };
  const validateField = () => {
    const requiredFields = [
      "brandId",
      "modelId",
      "manufacturingYear",
      "version",
      "styleId",
      "originId",
      "status",
      "kmDriven",
      "drivetrain",
      "transmission",
      "fuelId",
      "price",
      "outsideColorId",
      "insideColorId",
      "seatCapacity",
      "description",
      "address",
    ];

    // Check for null or undefined parameters
    for (const field of requiredFields) {
      if (
        !params[field] ||
        (Array.isArray(params[field]) && params[field].length === 0)
      ) {
        toast.error(fieldText(field));
        return false;
      }
    }
    return true;
  };
  const fieldText = (field) => {
    switch (field) {
      case "description":
        return "Vui lòng nhập mô tả.";

      case "manufacturingYear":
        return "Vui lòng nhập năm sản xuất.";

      case "seatCapacity":
        return "Vui lòng nhập số chỗ ngồi.";

      case "status":
        return "Vui lòng chọn tình trạng xe.";

      case "transmission":
        return "Vui lòng chọn loại hộp số.";

      case "drivetrain":
        return "Vui lòng chọn hệ dẫn động.";

      case "images":
        return "Vui lòng thêm hình ảnh.";

      case "version":
        return "Vui lòng nhập phiên bản.";

      case "kmDriven":
        return "Vui lòng nhập số km đã chạy.";

      case "price":
        return "Vui lòng nhập giá.";

      case "brandId":
        return "Vui lòng chọn hãng sản xuất.";

      case "modelId":
        return "Vui lòng chọn tên xe.";

      case "styleId":
        return "Vui lòng chọn kiểu dáng.";

      case "originId":
        return "Vui lòng chọn xuất xứ.";

      case "fuelId":
        return "Vui lòng chọn loại nhiên liệu.";

      case "outsideColorId":
        return "Vui lòng chọn màu ngoại thất.";

      case "insideColorId":
        return "Vui lòng chọn màu nội thất.";

      case "address":
        return "Vui lòng nhập địa chỉ.";

      default:
        break;
    }
  };
  const handleUserCity = (array) => {
    const addressArr = userData.ward.path.split(", ");
    const city = array.find((el) => el.name === addressArr[2])?.id;
    setParams({ ...params, cityId: city });
  };
  const handleUserDistrict = (array) => {
    const addressArr = userData.ward.path.split(", ");
    const district = array.find((el) => {
      return el.name === addressArr[1];
    })?.id;
    setParams({ ...params, districtId: district });
  };
  const handleUserWard = () => {
    setParams({ ...params, wardId: userData.ward.id });
  };
  return (
    <>
      {loading && <FullScreenLoader />}
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
                            isSearch={true}
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
                            isSearch={true}
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
                            isSearch={true}
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
                            options={statusCar}
                            value={
                              statusCar.find((el) => el.code === params.status)
                                ?.name ?? "Tình trạng"
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
                          <label>Giá(triệu đồng)</label>

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
                            isSearch={true}
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
                            isSearch={true}
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
                      <h6 className="title">Tải lên ảnh của xe</h6>
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
                                <span>Tải lên</span>
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
                            disabled
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
                            disabled
                            isSearch={true}
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
                            disabled
                            isSearch={true}
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
                            isSearch={true}
                            options={wards}
                            disabled
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
                            value={params.address}
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
