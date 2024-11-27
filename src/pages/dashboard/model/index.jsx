import AddListings from "@/components/dashboard/AddListings";
import Footer1 from "@/components/footers/Footer1";

import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
import Style from "@/components/dashboard/Style";
import Origin from "@/components/dashboard/Origin";
import Model from "@/components/dashboard/Model";
const metadata = {
  title: "Add Listings || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function ModelPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <Model />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
