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
        <MobileMenu />
        <div className="boxcar-wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage1 />} />

              <Route
                path="inventory-list-01"
                element={<InventoryListPage1 />}
              />
              <Route
                path="inventory-sidebar-rows"
                element={<InventorySidebarRowsPage />}
              />

              <Route
                path="inventory-page-single-v2/:id"
                element={<InventorySinglePage2 />}
              />

              <Route path="blog-list-01" element={<BlogListingPage1 />} />
              <Route path="blog-single/:id" element={<BlogSinglePage />} />

              {/* <Route path="shop-list" element={<ShopListPage />} />
              <Route path="shop-single/:id" element={<ShopSinglePage />} /> */}
              {/* <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} /> */}

              <Route path="my-listings" element={<MyListingsPage />} />
              <Route path="brands" element={<BrandPage />} />

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

              <Route path="add-listings" element={<AddListingsPage />} />
              <Route path="login" element={<LoginPage />} />
              {/* <Route path="pricing" element={<PricingPage />} /> */}
              <Route path="team-list" element={<TeamListPage />} />
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
