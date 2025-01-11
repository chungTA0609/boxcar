import axiosInstance from "@/core/axiosInstance";
import { carData } from "@/data/cars";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import Cars from "../otherPages/Cars";
import Dialog from "../otherPages/Dialog";
import lock from "../../../public/images/icons/lock.svg";
import unlock from "../../../public/images/icons/unlock.svg";
const buttons = [
  { label: "New cars", isActive: true },
  { label: "Used Cars", isActive: false },
  { label: "In Stock", isActive: false },
];

export default function UserDetail({ teamMember }) {
  const [selectedCategory, setSelectedCategory] = useState(buttons[0]);
  const [sortedItems, setSortedItems] = useState([...carData]);
  const [userData, setUserData] = useState({});

  const [showLockDialog, setShowLockDialog] = useState(false);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const handleDialogLockClose = (confirmed) => {
    setShowLockDialog(false);
    if (!confirmed) {
    }
  };
  const handleDialogUnlockClose = (confirmed) => {
    setShowUnlockDialog(false);
    if (!confirmed) {
    }
  };

  const handleDialogLockSubmit = async () => {
    try {
      const res = await axiosInstance.put(`admin/users/${item.id}/unlock`);
      if (res.data.code === 200) {
        toast.success("Đã khóa tài khoản !");
        navigate("/list-user");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  const handleDialogUnlockSubmit = async () => {
    console.log("Form submitted!");
    try {
      const res = await axiosInstance.put(`admin/users/${item.id}/lock`);
      if (res.data.code === 200) {
        toast.success("Đã mở khóa tài khoản !");
        navigate("/list-user");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  const getUserData = async () => {
    try {
      const res = await axiosInstance.get(`/admin/users/${teamMember.id}`);
      setUserData(res.data.data);
    } catch (error) {}
  };
  const getUserCarData = async () => {
    try {
      const res = await axiosInstance.get(`/admin/users/${teamMember.id}/cars`);
      setSortedItems(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    setSortedItems([
      ...carData.filter((elm) =>
        elm.filterCategories.includes(selectedCategory.label)
      ),
    ]);
  }, [selectedCategory]);
  useEffect(() => {
    getUserData();
    getUserCarData();
  }, []);
  return (
    <section className="vehicles-section-three layout-radius">
      <div className="boxcar-container">
        <div className="right-box">
          <div
            className="boxcar-title wow fadeInUp"
            style={{ maxWidth: "none" }}
          >
            <ul className="breadcrumb">
              <li>
                <Link to={`/list-user`}>Danh sách người dùng</Link>
              </li>
              <li>
                <span>Thông tin người dùng</span>
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <h2 className="mb-0 ">{userData?.fullname}</h2>
              <div
                className="content-box"
                style={{
                  textAlign: "right",
                }}
              >
                <div
                  className="btn-box v2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  {userData.lock && (
                    <div
                      className="share-btn"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <span style={{ fontWeight: 900, color: "#405ff2" }}>
                        Mở khóa
                      </span>
                      <a
                        onClick={() => setShowUnlockDialog(true)}
                        className="share"
                        style={{
                          display: "block",
                          fill: "var(--White, #fff)",
                          border: "1px solid #e1e1e1",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          lineHeight: "32px",
                          textAlign: "center",
                          filter:
                            "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.05))",
                        }}
                      >
                        <img src={unlock} width={12} height={12} alt="" />
                      </a>
                    </div>
                  )}
                  {!userData.lock && (
                    <div
                      className="share-btn"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <span style={{ fontWeight: 900, color: "red" }}>
                        Khóa
                      </span>
                      <a
                        onClick={() => setShowLockDialog(true)}
                        className="share"
                        style={{
                          display: "block",
                          fill: "var(--White, #fff)",
                          border: "1px solid #e1e1e1",
                          borderRadius: "50%",
                          width: "36px",
                          height: "36px",
                          lineHeight: "32px",
                          textAlign: "center",
                          filter:
                            "drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.05))",
                        }}
                      >
                        <img src={lock} width={12} height={12} alt="" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="contact-box">
              <div className="content-box">
                <ul className="contact-list">
                  <li>
                    <div style={{ display: "flex" }}>
                      <div
                        className="image-box"
                        style={{ paddingRight: "10px" }}
                      >
                        <img
                          src="/images/resource/phone1-1.svg"
                          width={18}
                          height={18}
                          alt=""
                        />
                      </div>
                      {userData && userData.username}
                    </div>
                  </li>
                  <li>
                    <div style={{ display: "flex" }}>
                      <div
                        className="image-box"
                        style={{ paddingRight: "10px" }}
                      >
                        <img
                          src="/images/resource/phone1-1.svg"
                          width={18}
                          height={18}
                          alt=""
                        />
                      </div>
                      {userData && userData.lock ? "Đã khóa" : "Đang hoạt động"}
                    </div>
                  </li>
                  <li>
                    <div style={{ display: "flex" }}>
                      <div
                        className="image-box"
                        style={{ paddingRight: "10px" }}
                      >
                        <img
                          src="/images/resource/phone1-1.svg"
                          width={18}
                          height={18}
                          alt=""
                        />
                      </div>
                      {userData && userData.ward?.pathWithType}
                    </div>
                  </li>
                  <li>
                    <div style={{ display: "flex" }}>
                      <div
                        className="image-box"
                        style={{ paddingRight: "10px" }}
                      >
                        <img
                          src="/images/resource/phone1-2.svg"
                          width={18}
                          height={18}
                          alt=""
                        />
                      </div>
                      {userData && userData.phoneNum}
                    </div>
                  </li>
                </ul>
              </div>
            </div>{" "}
          </div>
        </div>
        {/* cars-section-three */}
        <Cars sellCar={sortedItems} buyCar={[]} />
      </div>
      {/* End shop section two */}
      {showLockDialog && (
        <Dialog
          title={"Khóa tài khoản " + userData.username}
          content="Bạn chắc chắn muốn khóa tài khoản này?"
          onClose={handleDialogLockClose}
          onSubmit={handleDialogLockSubmit}
        />
      )}
      {showUnlockDialog && (
        <Dialog
          title={"Mở khóa tài khoản " + userData.username}
          content="Bạn chắc chắn muốn mở khóa tài khoản này?"
          onClose={handleDialogUnlockClose}
          onSubmit={handleDialogUnlockSubmit}
        />
      )}
    </section>
  );
}
