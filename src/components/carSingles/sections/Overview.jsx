import React, { useEffect, useState } from "react";

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
export default function Overview({ detailData }) {
  const [vehicleDetails, setVehicleDetails] = useState([
    {
      icon: "/images/resource/insep1-1.svg",
      label: "Kiểu xe",
      value: "SUV",
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-2.svg",
      label: "Mileage",
      value: "28,000 miles",
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-3.svg",
      label: "Fuel Type",
      value: "Petrol",
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-4.svg",
      label: "Year",
      value: "2023",
      width: 16,
      height: 16,
    },
    {
      icon: "/images/resource/insep1-5.svg",
      label: "Transmission",
      value: "Automatics",
      width: 16,
      height: 16,
    },
    {
      icon: "/images/resource/insep1-6.svg",
      label: "Drive Type",
      value: "Front Wheel Drive",
      width: 18,
      height: 18,
    },
  ]);
  const [vehicleAdditionalDetails, setVehicleAdditionalDetails] = useState([
    {
      icon: "/images/resource/insep1-1.svg",
      label: "Kiểu xe",
      value: "SUV",
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-2.svg",
      label: "Mileage",
      value: "28,000 miles",
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-3.svg",
      label: "Fuel Type",
      value: "Petrol",
      width: 18,
      height: 18,
    },
    {
      icon: "/images/resource/insep1-4.svg",
      label: "Year",
      value: "2023",
      width: 16,
      height: 16,
    },
    {
      icon: "/images/resource/insep1-5.svg",
      label: "Transmission",
      value: "Automatics",
      width: 16,
      height: 16,
    },
    {
      icon: "/images/resource/insep1-6.svg",
      label: "Drive Type",
      value: "Front Wheel Drive",
      width: 18,
      height: 18,
    },
  ]);
  useEffect(() => {
    setVehicleDetails([
      {
        icon: "/images/resource/insep1-1.svg",
        label: "Kiểu xe",
        value: detailData ? detailData.style.name : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-2.svg",
        label: "Số km đã đi",
        value: detailData ? detailData.kmDriven + " km" : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-3.svg",
        label: "Nhiên liệu",
        value: detailData ? detailData.fuel.name : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-4.svg",
        label: "Năm sản xuất",
        value: detailData ? detailData.manufacturingYear : "",
        width: 16,
        height: 16,
      },
      {
        icon: "/images/resource/insep1-5.svg",
        label: "Hộp số",
        value: detailData
          ? gearItems.find((el) => el.code === detailData.transmission)?.name ??
            ""
          : "",
        width: 16,
        height: 16,
      },
      {
        icon: "/images/resource/insep1-6.svg",
        label: "Hệ dẫn động",
        value: detailData
          ? transmissionList.find((el) => el.code === detailData.drivetrain)
              ?.name ?? ""
          : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-12.svg",
        label: "Phiên bản",
        value: detailData ? detailData.version : "",
        width: 18,
        height: 18,
      },
    ]);
    setVehicleAdditionalDetails([
      {
        icon: "/images/resource/insep1-7.svg",
        label: "Tình trạng",
        value: detailData
          ? detailData.status === "OLD"
            ? "Xe cũ"
            : detailData.status === "NEW"
            ? "Xe mới"
            : ""
          : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-9.svg",
        label: "Số chỗ ngồi",
        value: detailData ? detailData.seatCapacity : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-10.svg",
        label: "Nội thất",
        value: detailData ? detailData.insideColor.name : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-11.svg",
        label: "Ngoại thất",
        value: detailData ? detailData.outsideColor.name : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-12.svg",
        label: "Mã sản phẩm",
        value: detailData ? detailData.code : "",
        width: 18,
        height: 18,
      },
      {
        icon: "/images/resource/insep1-12.svg",
        label: "Xuất xứ",
        value: detailData ? detailData.origin.name : "",
        width: 18,
        height: 18,
      },
    ]);
  }, [detailData]);
  return (
    <>
      <h4 className="title">Thông số</h4>
      <div className="row">
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {vehicleDetails.map((detail, index) => (
                <li key={index}>
                  <span>
                    <img
                      src={detail.icon}
                      width={detail.width}
                      height={detail.height}
                      alt=""
                    />
                    {detail.label}
                  </span>
                  {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="content-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner-column">
            <ul className="list">
              {vehicleAdditionalDetails.map((detail, index) => (
                <li key={index}>
                  <span>
                    <img
                      src={detail.icon}
                      width={detail.width}
                      height={detail.height}
                      alt=""
                    />
                    {detail.label}
                  </span>
                  {detail.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
