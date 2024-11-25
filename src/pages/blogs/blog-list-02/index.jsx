import Blogs1 from "@/components/blogs/Blogs1";
import Blogs2 from "@/components/blogs/Blogs2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Blog List 2 || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function BlogListingPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Blogs2 />
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
