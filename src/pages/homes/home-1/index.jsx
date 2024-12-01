import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Blogs from "@/components/homes/home-1/Blogs";
import Brands from "@/components/homes/home-1/Brands";
import Cars from "@/components/homes/home-1/Cars";
import Cars2 from "@/components/homes/home-1/Cars2";
import Cta from "@/components/common/Cta";
import Facts from "@/components/homes/home-1/Facts";
import Features from "@/components/homes/home-1/Features";
import Features2 from "@/components/homes/home-1/Features2";
import Features3 from "@/components/homes/home-1/Features3";
import Hero from "@/components/homes/home-1/Hero";
import Testimonials from "@/components/homes/home-1/Testimonials";
import Listings1 from "@/components/carListings/Listings1";

import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Trang chủ",
  description: "Trang chủ",
};
export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <Hero />
      <Brands />
      <Listings1 />
      {/* <Features /> */}
      {/* <Facts /> */}
      {/* <Features2 /> */}
      {/* <Cars2 /> */}
      {/* <Features3 />
      <Testimonials />
      <Blogs />
      <Cta /> */}
      <Footer1 />
    </>
  );
}
