import Single1 from "@/components/carSingles/Single1";
import Single2 from "@/components/carSingles/Single2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/core/axiosInstance";
import MetaComponent from "@/components/common/Metacomonent";
const metadata = {
  title: "Inventory Single 2 || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function InventorySinglePage2() {
  let params = useParams();
  const [detailData, setDetaiData] = useState(null);
  const getDataBySlug = async () => {
    try {
      const res = await axiosInstance.get(`/cars/${params.id}`);
      setDetaiData(res.data.data);
    } catch (error) {
      console.log(error);
      // toast.add({
      //   severity: "error",
      //   summary: "Lỗi",
      //   detail: "Lỗi hệ thống",
      //   life: 3000,
      // });
    }
  };
  useEffect(() => {
    getDataBySlug();
  }, []);
  return (
    <>
      <MetaComponent
        meta={{
          title: detailData ? detailData.name : "Xe",
          description: detailData ? detailData.name : "Xe",
        }}
      />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <Single2 detailData={detailData} />
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
