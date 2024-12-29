import { useStoreActions } from "easy-peasy";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "../otherPages/Dialog";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import axiosInstance from "@/core/axiosInstance";
import threeDot from "../../../public/images/icons/three-dots-svgrepo-com.svg";
export default function Cardcar({ car, onCarDeleted }) {
  const [showSelect, setShowSelect] = useState(false);
  const setEditCarData = useStoreActions((state) => state.setEditCarData);
  const selectRef = useRef(null); // Ref for dropdown
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDialogDeleteClose = (confirmed) => {
    setShowDeleteDialog(false);
    if (!confirmed) {
      console.log("Dialog closed without submission.");
    }
  };
  const handleDialogDeleteSubmit = () => {
    console.log("Form submitted!");
    deleteCar();
    // Add your submission logic here
  };
  const gearItems = [
    { name: "Số sàn", code: "Manual" },
    { name: "Số tự động", code: "Automatic" },
    { name: "Hybrid", code: "Hybird" },
    { name: "Khác", code: "Other" },
  ];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowSelect(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const deleteCar = async () => {
    try {
      await axiosInstance.delete(`/cars/${car.id}`);
      toast.success("Xóa xe thành công");
      if (onCarDeleted) {
        onCarDeleted(); // Emit event to the parent
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  return (
    <div
      key={car.id}
      className="car-block-four col-xl-3 col-lg-4 col-md-6 col-sm-6"
    >
      <div className="inner-box">
        <div className="image-box">
          <figure className="image">
            <Link
              to={`/edit-cars`}
              className="details"
              onClick={() => {
                setEditCarData(car);
              }}
            >
              <img
                alt={car.alt}
                src={car.logo}
                width={329}
                height={220}
                style={{ height: "220px" }}
              />
            </Link>
          </figure>
          <a
            className="icon-box"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from propagating to document
              setShowSelect((prev) => !prev);
            }}
          >
            <img src={threeDot} width={12} height={12} />
          </a>
          {showSelect && (
            <div
              className="select-container"
              ref={selectRef}
              style={{
                position: "absolute",
                top: `60px`,
                left: `110px`,
                zIndex: 1000,
              }}
            >
              <ul>
                <li
                  onClick={() => {
                    setShowSelect(false);
                    setEditCarData(car);
                    navigate("/edit-cars");
                  }}
                >
                  Chỉnh sửa thông tin xe
                </li>
                <li
                  onClick={() => {
                    setShowDeleteDialog(true);
                    setShowSelect(false);
                  }}
                >
                  Xóa xe
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="content-box">
          <h6 className="title">
            <Link
              to={`/edit-cars`}
              className="details"
              onClick={() => {
                setEditCarData(car);
              }}
            >
              {car.brand.isTruck ? car.brand.name : car.name}
            </Link>
          </h6>
          <div className="text">{car.description.slice(0, 50)}...</div>
          <ul>
            <li>
              <i className="flaticon-gasoline-pump" /> {car.kmDriven} km
            </li>
            <li>
              <i className="flaticon-speedometer" /> {car.fuel.name}
            </li>
            <li>
              <i className="flaticon-gearbox" />{" "}
              {gearItems.find((el) => el.code === car.transmission)?.name ?? ""}
            </li>
          </ul>
          <div className="btn-box">
            <span>{car.price.toLocaleString("en-US")}</span>
          </div>
        </div>
        {showDeleteDialog && (
          <Dialog
            title="Xóa tin bán xe "
            content="Bạn chắc chắn muốn xóa xe này?"
            onClose={handleDialogDeleteClose}
            onSubmit={handleDialogDeleteSubmit}
          />
        )}
      </div>
    </div>
  );
}
