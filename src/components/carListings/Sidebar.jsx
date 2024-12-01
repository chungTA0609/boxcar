import React, { useEffect, useState } from "react";
import SelectComponent from "../common/SelectComponent";
import { useStoreState, useStoreActions } from "easy-peasy";

import axiosInstance from "@/core/axiosInstance";
export default function Sidebar() {
  const [fuelList, setFuelList] = useState([]);
  const [originList, setOriginList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [styleList, setStyleList] = useState([]);
  const [price, setPrice] = useState([100, 10000]);
  const dropdownValues = useStoreState((state) => state.dropdownValues);
  const [place, setPlace] = useState(""); // State for the "Số chỗ ngồi" input

  const setDropdownValue = useStoreActions(
    (actions) => actions.setDropdownValue
  );
  // Handle dropdown change
  const handleDropdownChange = (key, value) => {
    setDropdownValue({ key, value });
  };

  // Handle seat capacity input change
  const handleSeatCapacityChange = (e) => {
    const value = e.target.value.replace(/\D/, ""); // Allow only numeric values
    setPlace(value);
    handleDropdownChange("seatCapacity", value);
  };

  // Handle price input change
  const handlePriceChange = (index, value) => {
    const numericValue = Number(value) || 0; // Ensure numeric input
    setPrice((prevPrice) => {
      const updatedPrice = [...prevPrice];
      updatedPrice[index] = numericValue;

      // Update the store with the latest values
      if (index === 0) handleDropdownChange("minPrice", updatedPrice[0]);
      else handleDropdownChange("maxPrice", updatedPrice[1]);

      return updatedPrice; // Return updated state
    });
  };

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
  useEffect(() => {
    getAllFuel();
    getAllOrigin();
    getAllColor();
    getAllStyle();
  }, []);
  useEffect(() => {
    console.log(dropdownValues);
  }, [dropdownValues]);
  const getAllFuel = async () => {
    try {
      const res = await axiosInstance.get("/fuels");
      setFuelList(res.data.data);
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  const getAllOrigin = async () => {
    try {
      const res = await axiosInstance.get("/origins");
      setOriginList(res.data.data);
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  const getAllColor = async () => {
    try {
      const res = await axiosInstance.get("/colors");
      setColorList(res.data.data);
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  const getAllStyle = async () => {
    try {
      const res = await axiosInstance.get("/styles");
      setStyleList(res.data.data);
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  return (
    <div className="wrap-fixed-sidebar">
      <div className="sidebar-backdrop" />
      <div className="widget-sidebar-filter">
        <div className="fixed-sidebar-title">
          <h3>Tìm kiếm</h3>
          <a href="#" title="" className="close-filters">
            <img alt="" src="/images/icons/close.svg" width={30} height={30} />
          </a>
        </div>
        <div className="inventory-sidebar">
          <div className="inventroy-widget widget-location">
            <div className="row">
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Nhiên liệu</label>

                  <SelectComponent
                    options={fuelList}
                    onChange={(value) =>
                      handleDropdownChange("fuelId", value.id)
                    }
                    value={
                      fuelList.find((el) => el.id === dropdownValues.fuelId)
                        ?.name ?? "Loại nhiên liệu"
                    }
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Xuất xứ</label>

                  <SelectComponent
                    options={originList}
                    onChange={(value) =>
                      handleDropdownChange("originId", value.id)
                    }
                    value={
                      originList.find((el) => el.id === dropdownValues.originId)
                        ?.name ?? "Xuất xứ"
                    }
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Màu xe</label>

                  <SelectComponent
                    options={colorList}
                    onChange={(value) =>
                      handleDropdownChange("outsideColorId", value.id)
                    }
                    value={
                      colorList.find(
                        (el) => el.id === dropdownValues.outsideColorId
                      )?.name ?? "Màu xe"
                    }
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Kiểu dáng</label>

                  <SelectComponent
                    options={styleList}
                    onChange={(value) =>
                      handleDropdownChange("styleId", value.id)
                    }
                    value={
                      styleList.find((el) => el.id === dropdownValues.styleId)
                        ?.name ?? "Kiểu dáng"
                    }
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Dẫn động</label>

                  <SelectComponent
                    options={transmissionList}
                    onChange={(value) =>
                      handleDropdownChange("drivetrain", value.code)
                    }
                    value={
                      transmissionList.find(
                        (el) => el.code === dropdownValues.drivetrain
                      )?.name ?? "Dẫn động"
                    }
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form_boxes">
                  <label>Số chỗ ngồi</label>
                  <input
                    name="place"
                    required
                    type="text"
                    placeholder="Số chỗ ngồi"
                    value={place}
                    onChange={handleSeatCapacityChange}
                  />{" "}
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
                            onChange={(e) =>
                              handlePriceChange(0, e.target.value)
                            }
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
                            onChange={(e) =>
                              handlePriceChange(1, e.target.value)
                            }
                          />{" "}
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*widget end*/}
        </div>
      </div>
    </div>
  );
}
