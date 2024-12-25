import DropdownFilter from "@/components/carListings/DropdownFilter";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { useState } from "react";

import MetaComponent from "@/components/common/Metacomonent";
import MyListings from "@/components/carListings/MyListings";

const metadata = {
  title: "Tin xe của tôi",
  description: "Tin xe của tôi",
};
export default function MyCars() {
  return (
    <>
      <MetaComponent meta={metadata} />

      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <section className="inventory-pager style-1"></section>

      <Sidebar />
      <MyListings />
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
