import DropdownFilter from "@/components/carListings/DropdownFilter";
import Sidebar from "@/components/carListings/Sidebar";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { useState } from "react";

import MetaComponent from "@/components/common/Metacomonent";
import Listings2 from "@/components/carListings/Listings2";

const metadata = {
  title: "Inventory List 1 || Boxcar - Reactjs Car Template",
  description: "Boxcar - Reactjs Car Template",
};
export default function InventoryListPage1() {
  const [cars, setCars] = useState([]);
  const handleCarChange = (cars) => {
    setCars(cars);
  };

  return (
    <>
      <MetaComponent meta={metadata} />

      <Header1 headerClass="boxcar-header header-style-v1 style-two inner-header bb-0" />
      <div className="bb-0"></div>
      <DropdownFilter carListChange={handleCarChange} />
      <Sidebar />
      <Listings2 carSearch={cars} />
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
