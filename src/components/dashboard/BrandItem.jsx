import axiosInstance from "@/core/axiosInstance";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "../otherPages/Dialog";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

const removeIcon = "/images/icons/remove.svg";
const editIcon = "/images/icons/edit.svg";
export default function BrandItem({ item, index, onBrandDelete, type }) {
  const setBrand = useStoreActions((actions) => actions.setBrand);
  const setStyle = useStoreActions((actions) => actions.setStyle);
  const setOrigin = useStoreActions((actions) => actions.setOrigin);
  const setModel = useStoreActions((actions) => actions.setModel);
  const setFuel = useStoreActions((actions) => actions.setFuel);
  const setColor = useStoreActions((actions) => actions.setColor);

  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleDialogDeleteSubmit = () => {
    console.log("Form submitted!");
    handleBrandDeleted();
    // Add your submission logic here
  };
  const handleDialogDeleteClose = (confirmed) => {
    setShowDeleteDialog(false);
    if (!confirmed) {
      console.log("Dialog closed without submission.");
    }
  };
  const editBrand = (element) => {
    switch (type) {
      case "brand":
        setBrand(element);
        break;
      case "style":
        setStyle(element);
        break;
      case "origin":
        setOrigin(element);
        break;
      case "model":
        setModel(element);
        break;
      case "fuel":
        setFuel(element);
        break;
      case "color":
        setColor(element);
        break;

      default:
        break;
    }

    navigate(`/${type}`);
  };
  const handleBrandDeleted = async () => {
    try {
      await axiosInstance.delete(`${type}s/${item.id}`);
      toast.success("Xóa thành công");
      if (onBrandDelete) {
        onBrandDelete(); // Emit event to the parent
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  return (
    <>
      <tr key={index}>
        <td>
          <span>{item.name}</span>
        </td>
        <td>
          <a className="remove-cart-item">
            <img
              alt="Remove item"
              src={removeIcon}
              width={18}
              height={18}
              onClick={() => {
                setShowDeleteDialog(true);
              }}
            />
          </a>
          <a className="remove-cart-item" onClick={() => editBrand(item)}>
            <img alt="Edit item" src={editIcon} width={18} height={18} />
          </a>
        </td>
      </tr>
      {showDeleteDialog && (
        <Dialog
          title="Xóa "
          content="Bạn chắc chắn muốn xóa ?"
          onClose={handleDialogDeleteClose}
          onSubmit={handleDialogDeleteSubmit}
        />
      )}
    </>
  );
}
