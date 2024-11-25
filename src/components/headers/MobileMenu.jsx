import {
  blogLinks,
  homeLinks,
  megaMenuData,
  pages,
  shopLinks,
} from "@/data/menu";
import { Link, useLocation } from "react-router-dom";

import React, { useEffect, useState } from "react";

export default function MobileMenu() {
  const { pathname } = useLocation();
  const [memuOpen, setMemuOpen] = useState(-1);
  const [showMenu, setShowMenu] = useState(false);
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

  const closeMenu = () => {
    const mobileNavigation = document.querySelector(".mobile-navigation");
    const mobileMenu = document.getElementById("nav-mobile");

    mobileNavigation?.classList.remove("active");
    mobileMenu?.classList.remove("mm-menu_opened");
  };
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
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
      {showMenu && (
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
                <span>Menu</span>
              </a>
            </div>
            <ul className="navigation mm-listview">
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(homeLinks) ? "current" : ""
                }`}
              >
                <a
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                >
                  Trang chủ 
                </a>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(blogLinks) ? "current" : ""
                }`}
              >
                <a
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                >
                  Tìm kiếm xe
                </a>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(shopLinks) ? "current" : ""
                }`}
              >
                <a
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                >
                  Đăng tin mua xe
                </a>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(pages) ? "current" : ""
                }`}
              >
                <a
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                  onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
                >
                  Tin mua xe
                </a>
              </li>
              <li
                className={`current-dropdown mm-listitem ${
                  isMenuActive(pages) ? "current" : ""
                }`}
              >
                <a
                  className="mm-btn mm-btn_next mm-listitem__btn mm-listitem__text"
                  onClick={() => setMemuOpen((pre) => (pre == 5 ? -1 : 5))}
                >
                  Đăng tin bán xe
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="overlay" onClick={closeMenu}></div>
    </div>
  );
}
