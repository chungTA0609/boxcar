import React, { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import axiosInstance from "@/core/axiosInstance";
import SelectComponent from "../common/SelectComponent";
export default function DropdownFilter({ carListChange }) {
  const dropdownValues = useStoreState((state) => state.dropdownValues);
  const [brandList, setBrandList] = useState([]);
  const [paramChanged, setParamChanged] = useState([]);
  const [param, setParam] = useState({});
  const [provinces, setProvinces] = useState([]);
  const setDropdownValue = useStoreActions(
    (actions) => actions.setDropdownValue
  );
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
  // Handle dropdown value change
  const handleDropdownChange = (key, value) => {
    // setParamChanged(paramChanged.push(key));
    setParam({ ...param, [key]: value });
    setDropdownValue({ key, value }); // Update the store
  };
  const getAllCities = async () => {
    try {
      const res = await axiosInstance.get("/address/cities");
      setProvinces(res.data.data);
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  // Handle form submission
  const handleSubmit = () => {
    console.log("Selected Filters:", dropdownValues);
    queryCar();
    // e.preventDefault();
    // Add logic to filter results based on selected values
  };
  useEffect(() => {
    getAllBrand();
    getAllCities();
  }, []);
  const getAllBrand = async () => {
    try {
      const res = await axiosInstance.get("/brands");
      setBrandList(
        res.data.data.map((element) => {
          return element;
        })
      );
    } catch (error) {
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  const queryCar = async () => {
    try {
      console.log({
        ...dropdownValues,
        ...param,
      });

      const res = await axiosInstance.post("/cars/query", {
        ...dropdownValues,
        ...param,
      });
      carListChange(res.data.data.list);
    } catch (error) {}
  };
  return (
    <section className="inventory-pager style-1">
      <div className="boxcar-container">
        <form onSubmit={(e) => e.preventDefault()} className="inventory-form">
          <div className="form_boxes line-r">
            <SelectComponent
              options={brandList}
              value={
                brandList.find((el) => el.id === dropdownValues.brandId)
                  ?.name ?? "Hãng xe"
              }
              onChange={(value) => handleDropdownChange("brandId", value.id)}
            />{" "}
          </div>
          <div className="form_boxes line-r">
            <SelectComponent
              options={dropdownItems}
              value={
                dropdownValues.status
                  ? dropdownItems.find(
                      (el) => (el.code === dropdownValues.status)
                    ).name ?? "Tình trạng xe"
                  : "Tình trạng xe"
              }
              onChange={(value) => handleDropdownChange("status", value.code)}
            />
          </div>
          <div className="form_boxes line-r">
            <SelectComponent
              options={provinces}
              value={
                provinces.find((el) => el.id === dropdownValues.cityId)?.name ??
                "Thành phố"
              }
              onChange={(value) => handleDropdownChange("cityId", value.id)}
            />{" "}
          </div>
          <div className="form_boxes line-r">
            <SelectComponent
              options={gearItems}
              value={
                dropdownValues.transmission
                  ? gearItems.find(
                      (el) => (el.code === dropdownValues.transmission)
                    ).name ?? "Hộp số"
                  : "Hộp sô"
              }
              onChange={(value) =>
                handleDropdownChange("transmission", value.code)
              }
            />{" "}
          </div>
          <div className="form_boxes" style={{ width: "13%" }}>
            <a title="" className="filter-popup">
              <img
                alt=""
                src="/images/icons/filter.svg"
                width={24}
                height={24}
              />
              More Filters
            </a>
          </div>
          <div className="form-submit">
            <button
              type="submit"
              className="theme-btn"
              onClick={() => handleSubmit()}
            >
              <i className="flaticon-search" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
