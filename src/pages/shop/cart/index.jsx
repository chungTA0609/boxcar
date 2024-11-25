import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Cart from "@/components/shop/Cart";

import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Cart || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function CartPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Cart />

      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
