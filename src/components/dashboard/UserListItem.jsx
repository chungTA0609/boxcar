import { Link } from "react-router-dom";
import lock from "../../../public/images/icons/lock.svg";
import unlock from "../../../public/images/icons/unlock.svg";
import { useState } from "react";
import Dialog from "../otherPages/Dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
export default function UserListItem({ item, index, onUserChange }) {
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);

  const navigate = useNavigate(); // Use useNavigate for navigation in v6

  const handleDialogLockClose = (confirmed) => {
    setShowLockDialog(false);
    if (!confirmed) {
    }
  };
  const handleDialogUnlockClose = (confirmed) => {
    setShowUnlockDialog(false);
    if (!confirmed) {
    }
  };

  const handleDialogLockSubmit = async () => {
    try {
      const res = await axiosInstance.put(`admin/users/${item.id}/unlock`);
      if (res.data.code === 200) {
        toast.success("Đã khóa tài khoản !");
        if (onUserChange) {
          onUserChange(); // Emit event to the parent
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
    // Add your submission logic here
  };
  const handleDialogUnlockSubmit = async () => {
    console.log("Form submitted!");
    try {
      const res = await axiosInstance.put(`admin/users/${item.id}/lock`);
      if (res.data.code === 200) {
        toast.success("Đã mở khóa tài khoản !");
        if (onUserChange) {
          onUserChange(); // Emit event to the parent
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
        <span style={{ paddingLeft: "45px" }}>{index + 1}</span>
      </td>
      <td onClick={() => navigate(`/user-detail/${item.id}`)}>
        <div className="shop-cart-product">
          <div className="shop-product-cart-info">
            <h3>
              <span>{item.fullname}</span>
            </h3>
          </div>
        </div>
      </td>
      <td onClick={() => navigate(`/user-detail/${item.id}`)}>
        <span>{item.id}</span>
      </td>
      <td onClick={() => navigate(`/user-detail/${item.id}`)}>
        <span>{item.phoneNum}</span>
      </td>
      <td onClick={() => navigate(`/user-detail/${item.id}`)}>
        <span>{item.username}</span>
      </td>
      <td onClick={() => navigate(`/user-detail/${item.id}`)}>
        <span>{item.username}</span>
      </td>
      <td>
        <a className="remove-cart-item" onClick={() => setShowLockDialog(true)}>
          <img alt="lock item" src={lock} width={18} height={18} />
        </a>
        <a
          className="remove-cart-item"
          onClick={() => setShowUnlockDialog(true)}
        >
          <img alt="unlock item" src={unlock} width={18} height={18} />
        </a>
      </td>
      {showLockDialog && (
        <Dialog
          title={"Khóa tài khoản " + item.username}
          content="Bạn chắc chắn muốn khóa tài khoản này?"
          onClose={handleDialogLockClose}
          onSubmit={handleDialogLockSubmit}
        />
      )}
      {showUnlockDialog && (
        <Dialog
          title={"Mở khóa tài khoản " + item.username}
          content="Bạn chắc chắn muốn mở khóa tài khoản này?"
          onClose={handleDialogUnlockClose}
          onSubmit={handleDialogUnlockSubmit}
        />
      )}
    </tr>
  );
}
