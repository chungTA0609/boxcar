import Footer1 from "@/components/footers/Footer1";
import HeaderDashboard from "@/components/headers/HeaderDashboard";
import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import MetaComponent from "@/components/common/Metacomonent";
import ColorList from "@/components/dashboard/ColorList";
import UserList from "@/components/dashboard/UserList";
const metadata = {
  title: "Admin",
  description: "Admin",
};
export default function ListUserPage() {
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

        <UserList />
        <Footer1 parentClass="boxcar-footer footer-style-one v2" />
      </div>
    </>
  );
}
