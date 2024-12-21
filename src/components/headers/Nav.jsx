import {
  blogLinks,
  dangTinMua,
  homeLinks,
  pages,
  shopLinks,
} from "@/data/menu";
import { useStoreActions } from "easy-peasy";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.length) {
      if (menuItem[0].href?.split("/")[1] === pathname.split("/")[1]) {
        active = true;
      }
    }

    return active;
  };
  const navigate = useNavigate();

  const resetDropDownValue = useStoreActions(
    (actions) => actions.resetDropDownValue
  );
  return (
    <>
      <li className="current-dropdown current">
        <Link to={"/"} className={isMenuActive(homeLinks) ? "menuActive" : ""}>
          Trang chủ
        </Link>
      </li>
      <li className="current-dropdown">
        <span
          className={isMenuActive(blogLinks) ? "menuActive" : ""}
          onClick={() => {
            navigate(`/tim-kiem-xe`);
            resetDropDownValue();
          }}
        >
          Tìm kiếm xe
        </span>
      </li>
      <li className="current-dropdown">
        <Link
          to={"/dang-tin-ban"}
          className={isMenuActive(shopLinks) ? "menuActive" : ""}
        >
          Đăng tin bán
        </Link>
      </li>
      <li className="current-dropdown">
        <Link
          to={"/tin-mua"}
          className={isMenuActive(pages) ? "menuActive" : ""}
        >
          Tin mua xe
        </Link>
      </li>
      <li className="current-dropdown right-one">
        <Link
          to={"/dang-tin-mua"}
          className={isMenuActive(dangTinMua) ? "menuActive" : ""}
        >
          Đăng tin mua xe
        </Link>
      </li>
    </>
  );
}
