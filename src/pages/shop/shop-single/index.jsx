import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ShopSingle from "@/components/shop/ShopSingle";
import { products } from "@/data/products";

import React from "react";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Shop Single || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function ShopSinglePage() {
  let params = useParams();
  const product =
    products.filter((elm) => elm.id == params.id)[0] || products[0];
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <ShopSingle product={product} />

      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
