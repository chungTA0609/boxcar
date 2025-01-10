import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";

import { useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MetaComponent from "@/components/common/Metacomonent";
import UserDetail from "@/components/dashboard/UserDetail";
const metadata = {
  title: "Team Single || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function UserDetailPage() {
  const userData = useStoreState((state) => state.userData);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6

  let params = useParams();
  useEffect(() => {
    if (!(userData && userData.role === "ADMIN")) navigate("/");
  }, []);
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
      <UserDetail teamMember={params} />

      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
