import {
  blogLinks,
  homeLinks,
  megaMenuData,
  pages,
  shopLinks,
  dangTinMua,
  admin,
  myCars,
} from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useTokenCookie } from "@/core/useTokenCookie";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

export default function AddminMenu() {
  const { pathname } = useLocation();
  const [memuOpen, setMemuOpen] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
  const { deleteTokenCookie } = useTokenCookie();
  const { setUserData, setIsLogin } = useStoreActions((actions) => actions);

  const logOut = () => {
    deleteTokenCookie();
    setUserData(null);
    setIsLogin(false);
    // navigate("/");
  };
  useEffect(() => {
    setShowMenu(true);
    const mobileNavigation = document.querySelectorAll('[href="#nav-mobile"]');
    const mobileMenu = document.getElementById("nav-mobile");
    mobileNavigation.forEach((elm) => elm?.classList.remove("active"));

    mobileMenu?.classList.remove("mm-menu_opened");
    const toggleActiveClass = (e) => {
      e?.preventDefault();
      mobileNavigation.forEach((elm) => elm?.classList.toggle("active"));
      mobileMenu?.classList.toggle("mm-menu_opened");
    };

    // Add event listener for click
    mobileNavigation.forEach((elm) =>
      elm?.addEventListener("click", toggleActiveClass)
    );

    // Cleanup event listener on component unmount
    return () => {
      mobileNavigation.forEach((elm) =>
        elm?.removeEventListener("click", toggleActiveClass)
      );
    };
  }, [pathname]); // Empty dependency array ensures it only runs on mount/unmount
  const userData = useStoreState((state) => state.userData);
  const isLogin = useStoreState((state) => state.isLogin);
  const navigate = useNavigate();
  const resetDropDownValue = useStoreActions(
    (actions) => actions.resetDropDownValue
  );
  const closeMenu = () => {
    const mobileNavigation = document.querySelector(".mobile-navigation");
    const mobileMenu = document.getElementById("nav-mobile");

    mobileNavigation?.classList.remove("active");
    mobileMenu?.classList.remove("mm-menu_opened");
  };
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.length) {
      if (menuItem[0].href?.split("/")[1] === pathname.split("/")[1]) {
        active = true;
      }
    }
    return active;
  };
  return (
    <div
      id="nav-mobile"
      className="mm-menu mm-menu_offcanvas mm-menu_position-left mm-menu_ mm-menu_theme-black "
      style={{
        zIndex: 100,
        display: "block",
        transition: "0.5s",
        opacity: 0.5,
        visibility: "hidden",
        left: "-100%",
      }}
    >
      {
        <div className="mm-panels">
          <div
            id="navbar"
            className={`mm-panel ${
              memuOpen > 0
                ? "mm-panel_opened-parent mm-hidden"
                : "mm-panel_opened"
            } `}
          >
            <div className="mm-navbar mm-navbar_sticky">
              <a className="mm-navbar__title">
                <span>Lối tắt</span>
              </a>
            </div>
            <ul className="navigation mm-listview">
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(homeLinks) ? "current" : ""
                }`}
              >
                <Link
                  to={"/"}
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                >
                  Trang chủ
                </Link>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(blogLinks) ? "current" : ""
                }`}
              >
                <Link
                  to={"/tim-kiem-xe"}
                  onClick={() => {
                    resetDropDownValue();
                  }}
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                >
                  Tìm kiếm xe
                </Link>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(shopLinks) ? "current" : ""
                }`}
              >
                <Link
                  to={"/dang-tin-ban"}
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                >
                  Đăng tin bán
                </Link>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(pages) ? "current" : ""
                }`}
              >
                <Link
                  to={"/tin-mua"}
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                  // onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
                >
                  Tin mua xe
                </Link>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(dangTinMua) ? "current" : ""
                }`}
              >
                <Link
                  to={"/dang-tin-mua"}
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                  // onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
                >
                  Đăng tin mua xe
                </Link>
              </li>
              {userData && (
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(myCars) ? "current" : ""
                  }`}
                >
                  <Link
                    to={`/color-list`}
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                  >
                    Xe tôi đã đăng
                  </Link>
                </li>
              )}
              {userData && userData.role === "ADMIN" && (
                <li
                  className={`current-dropdown mm-listitem ${
                    isMenuActive(admin) ? "current" : ""
                  }`}
                >
                  <Link
                    to={`/brands`}
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    // onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
                  >
                    Admin
                  </Link>
                </li>
              )}
              {isLogin && (
                <li className={`current-dropdown mm-listitem `}>
                  <a
                    className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                    onClick={() => {
                      // setMemuOpen((pre) => (pre == 5 ? -1 : 5));
                      logOut();
                      navigate("/");
                      toast.success("Đăng xuất thành công");
                    }}
                  >
                    Đăng xuất
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      }
      <div className="overlay" onClick={closeMenu}></div>
    </div>
  );
}
