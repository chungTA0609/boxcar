import Footer1 from "@/components/footers/Footer1";

import MetaComponent from "@/components/common/Metacomonent";
import Color from "@/components/dashboard/Color";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const metadata = {
  title: "Add Listings || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function ColorPage() {
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

        <Color />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}