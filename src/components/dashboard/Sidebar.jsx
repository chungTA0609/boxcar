import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    href: "/my-listings",
    src: "/images/icons/dash2.svg",
    width: 25,
    height: 22,
    label: "Quản lý Hãng",
  },
  {
    href: "/style-list",
    src: "/images/icons/dash2.svg",
    width: 25,
    height: 22,
    label: "Quản lý kiểu xe",
  },
  {
    href: "/origin-list",
    src: "/images/icons/dash4.svg",
    width: 18,
    height: 18,
    label: "Xuất xứ",
  },
  {
    href: "/model-list",
    src: "/images/icons/dash5.svg",
    width: 18,
    height: 18,
    label: "Mẫu xe",
  },
];
export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <div className="side-bar">
      <ul className="nav-list">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.isExternal ? (
              <a href={item.href}>
                <img
                  alt=""
                  src={item.src}
                  width={item.width}
                  height={item.height}
                />
                {item.label}
              </a>
            ) : (
              <Link
                to={item.href}
                className={pathname == item.href ? "menuActive" : ""}
              >
                <img
                  alt=""
                  src={item.src}
                  width={item.width}
                  height={item.height}
                />
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
