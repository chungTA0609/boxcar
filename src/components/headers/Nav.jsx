import {
  blogLinks,
  homeLinks,
  megaMenuData,
  pages,
  shopLinks,
} from "@/data/menu";
import { Link, useLocation } from "react-router-dom";

import React from "react";

export default function Nav() {
  const { pathname } = useLocation();
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
    <>
      <li className="current-dropdown current">
        <Link to={"/"} className={isMenuActive(homeLinks) ? "menuActive" : ""}>
          Trang chủ
        </Link>
      </li>
      <li className="current-dropdown">
        <Link
          to={`/inventory-list-01`}
          className={isMenuActive(megaMenuData) ? "menuActive" : ""}
        >
          Tìm kiếm xe
        </Link>
      </li>
      <li className="current-dropdown">
        <Link
          to={"/blog-list-01"}
          className={isMenuActive(blogLinks) ? "menuActive" : ""}
        >
          Đăng tin bán
        </Link>
      </li>
      <li className="current-dropdown">
        <Link
          to={"/inventory-sidebar-rows"}
          className={isMenuActive(shopLinks) ? "menuActive" : ""}
        >
          Tin mua xe
        </Link>
      </li>
      <li className="current-dropdown right-one">
        <Link
          to={"/team-list"}
          className={isMenuActive(pages) ? "menuActive" : ""}
        >
          Đăng tin mua xe
        </Link>
      </li>
    </>
  );
}
