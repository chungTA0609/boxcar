import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Features from "@/components/homes/home-1/Features";
import Features2 from "@/components/homes/home-1/Features2";
import About from "@/components/otherPages/About";
import Brands from "@/components/otherPages/Brands";
import Facts from "@/components/otherPages/Facts";
import Faqs from "@/components/otherPages/Faqs";
import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "About || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function AboutPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <section className="about-inner-one layout-radius">
        <About />
        <Features2 />
        <Features />
        <Facts />

        <Brands />
        <Faqs />
      </section>
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
