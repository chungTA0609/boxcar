import Footer1 from "@/components/footers/Footer1";
import axiosInstance from "@/core/axiosInstance";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotfoundItem from "../otherPages/NotfoundItem";
import Cardcar from "./CardCar";
export default function MyListings() {
  const [carList, setCarList] = useState([]); // State for cars list

  const userData = useStoreState((state) => state.userData);
  const navigate = useNavigate(); // Use useNavigate for navigation in v6

  const queryCar = async () => {
    try {
      const res = await axiosInstance.get(`/cars/${userData.id}/users`);
      setCarList(res.data.data);
    } catch (error) {}
  };
  const handleCarDeleted = () => {
    queryCar();
    // Perform any additional actions, such as refreshing the list
  };

  // React to pagination changes
  useEffect(() => {
    if (userData) queryCar();
    else navigate("/login");
  }, [userData]);

  return (
    <>
      <section className="cars-section-four v1 layout-radius">
        <div className="boxcar-container">
          <h2>Danh sách xe tôi đã đăng</h2>
          {carList.length === 0 && <NotfoundItem />}
          {carList.length > 0 && (
            <div className="row wow fadeInUp">
              {carList.map((car) => (
                <Cardcar
                  key={car.id}
                  car={car}
                  onCarDeleted={handleCarDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer1 parentClass="boxcar-footer footer-style-one v1 cus-st-1" />
    </>
  );
}
