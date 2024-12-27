import FilterSidebar from "@/components/common/FilterSidebar";

import BackToTop from "@/components/common/BackToTop";
import MobileMenu from "@/components/headers/MobileMenu";
import Context from "@/context/Context";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import WOW from "wow.js";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import HomePage1 from "./pages";
import BlogListingPage1 from "./pages/blogs/blog-list-01";
import BlogSinglePage from "./pages/blogs/blog-single";
import InventoryListPage1 from "./pages/car-listings/inventory-list-01";
import InventorySidebarRowsPage from "./pages/car-listings/inventory-sidebar-rows";
import InventorySinglePage2 from "./pages/car-singles/inventory-page-single-v2";
import AddListingsPage from "./pages/dashboard/add-listings";
import BrandPage from "./pages/dashboard/brands";
import ColorPage from "./pages/dashboard/color";
import ListColorPage from "./pages/dashboard/color-list";
import FuelPage from "./pages/dashboard/fuel";
import ListFuelPage from "./pages/dashboard/fuel-list";
import ModelPage from "./pages/dashboard/model";
import ListModelPage from "./pages/dashboard/model-list";
import MyListStylePage from "./pages/dashboard/my-list-style";
import MyListingsPage from "./pages/dashboard/my-listings";
import OriginPage from "./pages/dashboard/origin";
import ListOriginPage from "./pages/dashboard/origin-list";
import StyleListPage from "./pages/dashboard/style-list";
import NotFoundPage from "./pages/not-found";
import InvoicePage from "./pages/otherPages/invoice";
import LoginPage from "./pages/otherPages/login";
import TeamListPage from "./pages/otherPages/team-list";
import "./styles/style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import AddminMenu from "./components/headers/AddminMenu";
import MyCars from "./pages/car-listings/my-cars";
import EditCars from "./pages/edit-cars";
const adminPath = [
  "/brands",
  "/brand",
  "/style-list",
  "/style",
  "/origin-list",
  "/origin",
  "/model-list",
  "/model",
  "/fuel-list",
  "/fuel",
  "/color-list",
  "/color",
];
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  useEffect(() => {
    new WOW({
      live: false,
    }).init();
  }, [pathname]);

  return (
    <>
      <Context>
        <ToastContainer /> {/* Add ToastContainer */}
        {adminPath.includes(pathname) && <MobileMenu />}
        {!adminPath.includes(pathname) && <AddminMenu />}
        <div className="boxcar-wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage1 />} />

              <Route path="tim-kiem-xe" element={<InventoryListPage1 />} />
              <Route path="dang-tin-ban" element={<BlogListingPage1 />} />

              <Route path="tin-mua" element={<InventorySidebarRowsPage />} />
              <Route path="dang-tin-mua" element={<TeamListPage />} />

              <Route
                path="thong-tin-xe/:id"
                element={<InventorySinglePage2 />}
              />
              <Route path="my-cars" element={<MyCars />} />
              <Route path="edit-cars" element={<EditCars />} />

              <Route path="brands" element={<MyListingsPage />} />
              <Route path="brand" element={<BrandPage />} />

              <Route path="style-list" element={<MyListStylePage />} />
              <Route path="style" element={<StyleListPage />} />

              <Route path="origin-list" element={<ListOriginPage />} />
              <Route path="origin" element={<OriginPage />} />

              <Route path="model-list" element={<ListModelPage />} />
              <Route path="model" element={<ModelPage />} />

              <Route path="fuel-list" element={<ListFuelPage />} />
              <Route path="fuel" element={<FuelPage />} />

              <Route path="color-list" element={<ListColorPage />} />
              <Route path="color" element={<ColorPage />} />

              <Route path="login" element={<LoginPage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="invoice" element={<InvoicePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>{" "}
        <FilterSidebar />{" "}
      </Context>
      <BackToTop />
      <ScrollTopBehaviour />
    </>
  );
}

export default App;
