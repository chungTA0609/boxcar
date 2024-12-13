import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Login from "@/components/otherPages/Login";

import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Đăng nhập - Đăng ký",
  description: "Đăng nhập - Đăng ký",
};
export default function LoginPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Login />

      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
