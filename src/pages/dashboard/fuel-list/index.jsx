import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/Metacomonent";
import FuelList from "@/components/dashboard/FuelList";
const metadata = {
  title: "Admin",
  description: "Admin",
};
export default function ListFuelPage() {
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const userData = useStoreState((state) => state.userData);
  useEffect(() => {
    if (!(userData && userData.role === "ADMIN")) navigate("/");
  }, []);
  return (
    <>
      <MetaComponent meta={metadata} />
      <div style={{ background: "var(--theme-color-dark)" }}>
        <HeaderDashboard />

        <FuelList />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
