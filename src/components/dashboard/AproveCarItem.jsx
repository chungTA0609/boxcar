import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import Dialog from "../otherPages/Dialog";

import axiosInstance from "@/core/axiosInstance";
import checkIcon from "../../../public/images/icons/check.svg";
import removeIcon from "../../../public/images/icons/remove.svg";
export default function ApproveCarItem({ item, index, onCarChange }) {
  const [showAproveDialog, setShowAproveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDialogAproveClose = (confirmed) => {
    setShowAproveDialog(false);
    if (!confirmed) {
    }
  };
  const handleDialogDeleteClose = (confirmed) => {
    setShowDeleteDialog(false);
    if (!confirmed) {
    }
  };

  const handleDialogAproveSubmit = async () => {
    try {
      const res = await axiosInstance.put(`admin/users/${item.id}/unlock-car`);
      if (res.data.code === 200) {
        toast.success("Xe đã được duyệt");
        if (onCarChange) {
          onCarChange(); // Emit event to the parent
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  const handleDialogDeleteSubmit = async () => {
    console.log("Form submitted!");
    try {
      const res = await axiosInstance.put(`admin/users/${item.id}/lock-car`);
      if (res.data.code === 200) {
        toast.success("Đã từ chối tin xe");
        if (onCarChange) {
          onCarChange(); // Emit event to the parent
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  return (
    <tr key={index}>
      <td>
        <div className="shop-cart-product">
          <div className="shop-product-cart-img">
            <img alt={item.name} src={item.logo} width={120} height={105} />
          </div>
          <div className="shop-product-cart-info">
            <h3>
              <Link to={`/waiting-approve-car-detail/${item.slug}`}>
                {item.name}
              </Link>
            </h3>
            <p>{item.description}</p>
            <div className="price">
              <span>{item.price.toLocaleString("en-US")}</span>
            </div>
          </div>
        </div>
      </td>
      <td>
        <span>{item.brand.name}</span>
      </td>
      <td>
        <span>{item.manufacturingYear}</span>
      </td>
      <td>
        <span>{item.transmission}</span>
      </td>
      <td>
        <span>{item.fuel.name}</span>
      </td>
      <td>
        <a
          className="remove-cart-item"
          onClick={() => setShowAproveDialog(true)}
        >
          <img alt="Approve item" src={checkIcon} width={18} height={18} />
        </a>
        <a
          className="remove-cart-item"
          onClick={() => setShowDeleteDialog(true)}
        >
          <img alt="Remove item" src={removeIcon} width={18} height={18} />
        </a>
      </td>
      {showAproveDialog && (
        <Dialog
          title={"Duyệt tin bán xe " + item.name}
          content="Bạn chắc chắn muốn duyệt xe này?"
          onClose={handleDialogAproveClose}
          onSubmit={handleDialogAproveSubmit}
        />
      )}
      {showDeleteDialog && (
        <Dialog
          title="Xóa tin bán xe"
          content="Bạn chắc chắn muốn xóa xe này?"
          onClose={handleDialogDeleteClose}
          onSubmit={handleDialogDeleteSubmit}
        />
      )}
    </tr>
  );
}
