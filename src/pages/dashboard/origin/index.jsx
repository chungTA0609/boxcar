import Footer1 from "@/components/footers/Footer1";

import MetaComponent from "@/components/common/Metacomonent";
import Origin from "@/components/dashboard/Origin";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const metadata = {
  title: "Admin",
  description: "Admin",
};
export default function OriginPage() {
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

        <Origin />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
