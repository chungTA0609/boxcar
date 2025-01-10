import MetaComponent from "@/components/common/Metacomonent";
import WaitingCarApproveDetail from "@/components/dashboard/WaitingCarApproveDetail";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const metadata = {
  title: "Inventory Single 2 || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function InventorySinglePage2() {
  let params = useParams();
  const userData = useStoreState((state) => state.userData);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6

  const [detailData, setDetaiData] = useState(null);
  const getDataCar = async () => {
    try {
      const res = await axiosInstance.get(`/cars/${params.id}`);
      setDetaiData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataCar();
  }, [params.id]);
  useEffect(() => {
    if (!(userData && userData.role === "ADMIN")) navigate("/");
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
      <WaitingCarApproveDetail detailData={detailData} />
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
