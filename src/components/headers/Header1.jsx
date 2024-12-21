import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useTokenCookie } from "@/core/useTokenCookie";
import axiosInstance from "@/core/axiosInstance";
import { carItemsSearch } from "@/data/cars";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

export default function Header1({
  headerClass = "header-style-v1 header-default",
  white = false,
}) {
  const { deleteTokenCookie } = useTokenCookie();
  const navigate = useNavigate(); // Use useNavigate for navigation in v6

  const userData = useStoreState((state) => state.userData);
  const isLogin = useStoreState((state) => state.isLogin);
  const { setUserData, setIsLogin } = useStoreActions((actions) => actions);

  const [searchQuery, setSearchQuery] = useState("");

  const handleFocus = () => {
    document.getElementById("box-content-search").classList.add("active");
    document
      .getElementById("box-content-search")
      .closest(".layout-search")
      .classList.add("active");
  };
  const getMe = async () => {
    try {
      const res = await axiosInstance.get("/users/me");
      setUserData(res.data.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      logOut();
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  const logOut = () => {
    deleteTokenCookie();
    setUserData(null);
    setIsLogin(false);
    // navigate("/");
  };
  const handleBlur = () => {
    document.getElementById("box-content-search").classList.remove("active");
    document
      .getElementById("box-content-search")
      .closest(".layout-search")
      .classList.remove("active");
  };
  useEffect(() => {
    getMe();
  }, []);
  return (
    <header className={`boxcar-header  ${headerClass}`}>
      <div className="header-inner">
        <div className="inner-container">
          {/* Main box */}
          <div className="c-box">
            <div className="logo-inner">
              <div className="logo">
                <Link to={`/`}>
                  {white ? (
                    <img
                      alt=""
                      title="Boxcar"
                      src="/images/logo.png"
                      width="200"
                      height="50"
                    />
                  ) : (
                    <img
                      alt=""
                      title="Boxcar"
                      src="/images/logo.png"
                      width={200}
                      height={50}
                    />
                  )}
                </Link>
              </div>
            </div>
            {/*Nav Box*/}
            <div className="nav-out-bar">
              <nav className="nav main-menu">
                <ul className="navigation" id="navbar">
                  <Nav />
                </ul>
              </nav>
              {/* Main Menu End*/}
            </div>
            <div className="right-box">
              {!isLogin && (
                <Link to={`/login`} title="" className="box-account">
                  <span className="icon">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_147_6490)">
                        <path
                          d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z"
                          fill="white"
                        />
                        <path
                          d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_147_6490">
                          <rect width={16} height={16} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Đăng nhập
                </Link>
              )}
              {isLogin && (
                <span title="" className="box-account">
                  <span className="icon">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_147_6490)">
                        <path
                          d="M7.99998 9.01221C3.19258 9.01221 0.544983 11.2865 0.544983 15.4161C0.544983 15.7386 0.806389 16.0001 1.12892 16.0001H14.871C15.1935 16.0001 15.455 15.7386 15.455 15.4161C15.455 11.2867 12.8074 9.01221 7.99998 9.01221ZM1.73411 14.8322C1.9638 11.7445 4.06889 10.1801 7.99998 10.1801C11.9311 10.1801 14.0362 11.7445 14.2661 14.8322H1.73411Z"
                          fill="white"
                        />
                        <path
                          d="M7.99999 0C5.79171 0 4.12653 1.69869 4.12653 3.95116C4.12653 6.26959 5.86415 8.15553 7.99999 8.15553C10.1358 8.15553 11.8735 6.26959 11.8735 3.95134C11.8735 1.69869 10.2083 0 7.99999 0ZM7.99999 6.98784C6.50803 6.98784 5.2944 5.62569 5.2944 3.95134C5.2944 2.3385 6.43231 1.16788 7.99999 1.16788C9.54259 1.16788 10.7056 2.36438 10.7056 3.95134C10.7056 5.62569 9.49196 6.98784 7.99999 6.98784Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_147_6490">
                          <rect width={16} height={16} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  {userData ? userData.fullname : "Đăng nhập"}
                </span>
              )}
              {userData && userData.role === "ADMIN" && (
                <div className="btn">
                  <Link to={`/brands`} className="header-btn-two">
                    Admin
                  </Link>
                </div>
              )}
              {isLogin && (
                <div
                  className="btn"
                  onClick={() => {
                    logOut();
                    navigate("/");
                    toast.success("Đăng xuất thành công")
                  }}
                >
                  <a className="header-btn-two">Đăng xuất</a>
                </div>
              )}
              <div className="mobile-navigation">
                {white ? (
                  <a href="#nav-mobile" title="">
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="#050B20" />
                      <rect y={9} width={22} height={2} fill="#050B20" />
                    </svg>
                  </a>
                ) : (
                  <a href="#nav-mobile" title="">
                    {/* <i className="fa fa-bars"></i> */}
                    <svg
                      width={22}
                      height={11}
                      viewBox="0 0 22 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={22} height={2} fill="white" />
                      <rect y={9} width={22} height={2} fill="white" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Mobile Menu  */}
        </div>
      </div>
      {/* Header Search */}
      <div className="search-popup">
        <span className="search-back-drop" />
        <button className="close-search">
          <span className="fa fa-times" />
        </button>
        <div className="search-inner">
          <form onSubmit={(e) => e.preventDefault()} method="post">
            <div className="form-group">
              <input
                type="search"
                name="search-field"
                defaultValue=""
                placeholder="Tìm kiếm..."
                required
              />
              <button type="submit">
                <i className="fa fa-search" />
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* End Header Search */}
      <div id="nav-mobile" />
    </header>
  );
}
