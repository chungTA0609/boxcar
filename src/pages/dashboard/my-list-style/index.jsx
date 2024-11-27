import MyListings from "@/components/dashboard/MyListings";
import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
import StyleList from "@/components/dashboard/StyleList";
const metadata = {
  title: "My Listings || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function MyListStylePage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <StyleList />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
