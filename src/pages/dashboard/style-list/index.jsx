import AddListings from "@/components/dashboard/AddListings";
import Footer1 from "@/components/footers/Footer1";

import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
import Style from "@/components/dashboard/Style";
const metadata = {
  title: "Add Listings || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function StyleListPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <Style />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
