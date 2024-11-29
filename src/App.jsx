import FilterSidebar from "@/components/common/FilterSidebar";

import "./styles/style.css";
import "photoswipe/dist/photoswipe.css";
import "rc-slider/assets/index.css";
import { useEffect } from "react";
import MobileMenu from "@/components/headers/MobileMenu";
import Context from "@/context/Context";
import BackToTop from "@/components/common/BackToTop";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage1 from "./pages";
import InventoryListPage1 from "./pages/car-listings/inventory-list-01";
import InventoryListPage2 from "./pages/car-listings/inventory-list-02";
import InventoryMapCardsPage from "./pages/car-listings/inventory-map-cards";
import InventoryMapRowsPage from "./pages/car-listings/inventory-map-rows";
import InventorySidebarRowsPage from "./pages/car-listings/inventory-sidebar-rows";
import InventorySidebarCardsPage from "./pages/car-listings/inventory-sidebar-cards";
import InventorySinglePage1 from "./pages/car-singles/inventory-page-single-v1";
import InventorySinglePage2 from "./pages/car-singles/inventory-page-single-v2";
import InventorySinglePage3 from "./pages/car-singles/inventory-page-single-v3";
import InventorySinglePage4 from "./pages/car-singles/inventory-page-single-v4";
import InventorySinglePage5 from "./pages/car-singles/inventory-page-single-v5";
import BlogListingPage1 from "./pages/blogs/blog-list-01";
import BlogListingPage2 from "./pages/blogs/blog-list-02";
import BlogListingPage3 from "./pages/blogs/blog-list-03";
import BlogSinglePage from "./pages/blogs/blog-single";
import ShopListPage from "./pages/shop/shop-list";
import ShopSinglePage from "./pages/shop/shop-single";
import CartPage from "./pages/shop/cart";
import CheckoutPage from "./pages/shop/checkout";
import DashboardPage from "./pages/dashboard/dashboard";
import MyListingsPage from "./pages/dashboard/my-listings";
import AddListingsPage from "./pages/dashboard/add-listings";
import FavoritePage from "./pages/dashboard/favorite";
import SavedPage from "./pages/dashboard/saved";
import MessagesPage from "./pages/dashboard/messages";
import ProfilePage from "./pages/dashboard/profile";
import AboutPage from "./pages/otherPages/about";
import ContactPage from "./pages/otherPages/contact";
import LoginPage from "./pages/otherPages/login";
import FaqPage from "./pages/otherPages/faq";
import PricingPage from "./pages/otherPages/pricing";
import TermsPage from "./pages/otherPages/terms";
import TeamListPage from "./pages/otherPages/team-list";
import TeamSinglePage from "./pages/otherPages/team-single";
import DealerPage from "./pages/otherPages/dealer";
import DealerSinglePage from "./pages/otherPages/dealer-single";
import LoanCalculatorPage from "./pages/otherPages/loan-calculator";
import ComparePage from "./pages/otherPages/compare";
import NotFoundPage from "./pages/not-found";
import InvoicePage from "./pages/otherPages/invoice";
import UIElementsPage from "./pages/otherPages/ui-elements";
import ScrollTopBehaviour from "./components/common/ScrollToTopBehaviour";
import WOW from "wow.js";
import Brand from "./components/dashboard/Brand";
import BrandPage from "./pages/dashboard/brands";
import StyleListPage from "./pages/dashboard/style-list";
import MyListStylePage from "./pages/dashboard/my-list-style";
import ListOriginPage from "./pages/dashboard/origin-list";
import OriginPage from "./pages/dashboard/origin";
import ListModelPage from "./pages/dashboard/model-list";
import ModelList from "./components/dashboard/ModelList";
import ModelPage from "./pages/dashboard/model";

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
                path="inventory-list-02"
                element={<InventoryListPage2 />}
              />
              <Route
                path="inventory-map-cards"
                element={<InventoryMapCardsPage />}
              />
              <Route
                path="inventory-map-rows"
                element={<InventoryMapRowsPage />}
              />
              <Route
                path="inventory-sidebar-rows"
                element={<InventorySidebarRowsPage />}
              />
              <Route
                path="inventory-sidebar-cards"
                element={<InventorySidebarCardsPage />}
              />

              <Route
                path="inventory-page-single-v1/:id"
                element={<InventorySinglePage1 />}
              />
              <Route
                path="inventory-page-single-v2/:id"
                element={<InventorySinglePage2 />}
              />
              <Route
                path="inventory-page-single-v3"
                element={<InventorySinglePage3 />}
              />
              <Route
                path="inventory-page-single-v4"
                element={<InventorySinglePage4 />}
              />
              <Route
                path="inventory-page-single-v5"
                element={<InventorySinglePage5 />}
              />

              <Route path="blog-list-01" element={<BlogListingPage1 />} />
              <Route path="blog-list-02" element={<BlogListingPage2 />} />
              <Route path="blog-list-03" element={<BlogListingPage3 />} />
              <Route path="blog-single/:id" element={<BlogSinglePage />} />

              <Route path="shop-list" element={<ShopListPage />} />
              <Route path="shop-single/:id" element={<ShopSinglePage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />

              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="my-listings" element={<MyListingsPage />} />
              <Route path="brands" element={<BrandPage />} />
              <Route path="style-list" element={<MyListStylePage />} />
              <Route path="style" element={<StyleListPage />} />
              <Route path="origin-list" element={<ListOriginPage />} />
              <Route path="origin" element={<OriginPage />} />
              <Route path="model-list" element={<ListModelPage />} />
              <Route path="model" element={<ModelPage />} />
              <Route path="add-listings" element={<AddListingsPage />} />
              <Route path="favorite" element={<FavoritePage />} />
              <Route path="saved" element={<SavedPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="profile" element={<ProfilePage />} />

              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="team-list" element={<TeamListPage />} />
              <Route path="team-single/:id" element={<TeamSinglePage />} />
              <Route path="dealer" element={<DealerPage />} />
              <Route path="dealer-single/:id" element={<DealerSinglePage />} />
              <Route path="loan-calculator" element={<LoanCalculatorPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="404" element={<NotFoundPage />} />
              <Route path="invoice" element={<InvoicePage />} />
              <Route path="ui-elements" element={<UIElementsPage />} />
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
