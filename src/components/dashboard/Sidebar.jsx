import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    href: "/dashboard",
    src: "/images/icons/dash1.svg",
    width: 18,
    height: 18,
    label: "Dashboard",
  },
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
    href: "/add-listings",
    src: "/images/icons/dash3.svg",
    width: 22,
    height: 22,
    label: "Add Listings",
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
  {
    href: "/messages",
    src: "/images/icons/dash6.svg",
    width: 18,
    height: 18,
    label: "Messages",
  },
  {
    href: "/profile",
    src: "/images/icons/dash7.svg",
    width: 18,
    height: 18,
    label: "My Profile",
  },
  {
    href: "#",
    src: "/images/icons/dash8.svg",
    width: 18,
    height: 18,
    label: "Logout",
    isExternal: true,
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
