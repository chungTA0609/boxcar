import React, { useState, useEffect } from "react";
import axiosInstance from "@/core/axiosInstance";
import SelectComponent from "@/components/common/SelectComponent";
import { useTokenCookie } from "@/core/useTokenCookie";
import { useStoreActions } from "easy-peasy"; // Import actions for store
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { setTokenCookie } = useTokenCookie();
  const navigate = useNavigate(); // Use useNavigate for navigation in v6
  const { setUserData, setIsLogin } = useStoreActions((actions) => actions);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // States for register form
  const [username, setUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showReigisterPassword, setShowRegisterPassword] = useState(false); // State to toggle password visibility
  const [showRePassword, setShowRePassword] = useState(false); // State to toggle password visibility

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    username: "",
    registerPassword: "",
    rePassword: "",
    emailRegister: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });
  // Validation helper function
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username) {
      errors.username = "Username is required.";
      isValid = false;
    }

    if (!phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
      isValid = false;
    }

    if (!fullName) {
      errors.fullName = "Full name is required.";
      isValid = false;
    }

    if (!registerPassword) {
      errors.registerPassword = "Password is required.";
      isValid = false;
    }

    if (registerPassword !== rePassword) {
      errors.rePassword = "Passwords do not match.";
      isValid = false;
    }

    if (!address) {
      errors.address = "Address is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  const validateFormLogin = () => {
    let errors = {};
    let isValid = true;

    if (!email) {
      errors.email = "Email is required.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };
  const getAllCities = async () => {
    try {
      const res = await axiosInstance.get("/address/cities");
      setProvinces(res.data.data);
    } catch (error) {}
  };

  const getDistrictByCity = async (cityCode) => {
    try {
      const res = await axiosInstance.get(
        `/address/districts?cityCode=${cityCode}`
      );
      setDistricts(res.data.data);
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
    getAllCities();
  }, []);
  useEffect(() => {
    getDistrictByCity(provinces.find((el) => el.id === province)?.code);
  }, [province]);
  useEffect(() => {
    getWardByDistrict(districts.find((el) => el.id === district)?.code);
  }, [district]);
  const getWardByDistrict = async (districtCode) => {
    try {
      const res = await axiosInstance.get(
        `/address/wards?districtCode=${districtCode}`
      );
      setWards(res.data.data);
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

  const onLogin = async (values) => {
    try {
      if (!validateFormLogin()) {
        return;
      }

      const res = await axiosInstance.post("/users/auth", {
        username: email,
        password: password,
      });
      setIsLogin(true);
      setTokenCookie(res.data.data.token, 1);
      getMe();
    } catch (error) {
      console.log(error);
    }
  };

  const getMe = async () => {
    try {
      const res = await axiosInstance.get("/users/me");
      setUserData(res.data.data);
      navigate("/");
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
  const onRegister = async () => {
    try {
      if (registerPassword !== rePassword) {
        console.log("a");
        setRegisterError("Passwords do not match");
        return;
      }
      if (!validateForm()) {
        return;
      }

      const res = await axiosInstance.post("/users/register", {
        username: username,
        phoneNum: phoneNumber,
        fullname: fullName,
        wardId: ward,
        password: registerPassword,
      });

      // You could handle login automatically after successful registration here
      setTokenCookie(res.data.data.token, 1);
      getMe();
    } catch (error) {
      console.log(error);
      setRegisterError("Registration failed. Please try again.");
    }
  };

  return (
    <section className="login-section layout-radius">
      <div className="inner-container">
        <div className="right-box">
          <div className="form-sec">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Sign in
                </button>
                <button
                  className="nav-link"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  Register
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="form-box">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div
                      className="form_boxes"
                      style={{
                        borderColor: formErrors.email ? "red" : "",
                      }}
                    >
                      <label>Username</label>
                      <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {formErrors.email && (
                        <span className="error-input-text">
                          {formErrors.email}
                        </span>
                      )}
                    </div>

                    <div
                      className="form_boxes"
                      style={{
                        borderColor: formErrors.password ? "red" : "",
                        position: "relative",
                      }}
                    >
                      <label>Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingRight: "30px" }} // Add space for the icon
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)} // Toggle the state
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? "👁️" : "🙈"}{" "}
                        {/* Change the icon based on state */}
                      </span>
                      {formErrors.password && (
                        <span className="error-input-text">
                          {formErrors.password}
                        </span>
                      )}
                    </div>

                    <div className="btn-box">
                      <label className="contain"></label>
                      <a href="#" className="pasword-btn">
                        Forgotten password?
                      </a>
                    </div>
                    <div className="form-submit">
                      <button className="theme-btn" onClick={onLogin}>
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="form-box two">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div
                      className="form_boxes"
                      style={{
                        borderColor: formErrors.username ? "red" : "",
                      }}
                    >
                      <label>Username</label>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      {formErrors.username && (
                        <span className="error-input-text">
                          {formErrors.username}
                        </span>
                      )}
                    </div>
                    <div
                      className="form_boxes"
                      style={{
                        borderColor: formErrors.phoneNumber ? "red" : "",
                      }}
                    >
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      {formErrors.phoneNumber && (
                        <span className="error-input-text">
                          {formErrors.phoneNumber}
                        </span>
                      )}
                    </div>
                    <div
                      className="form_boxes"
                      style={{
                        borderColor: formErrors.fullName ? "red" : "",
                      }}
                    >
                      <label>Tên đầy đủ</label>
                      <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      {formErrors.fullName && (
                        <span className="error-input-text">
                          {formErrors.fullName}
                        </span>
                      )}
                    </div>
                    <div
                      className="form_boxes"
                      style={{
                        position: "relative",
                        borderColor: formErrors.registerPassword ? "red" : "",
                      }}
                    >
                      <label>Mật khẩu</label>
                      <input
                        type={showReigisterPassword ? "text" : "password"}
                        name="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                      <span
                        onClick={() =>
                          setShowRegisterPassword(!showReigisterPassword)
                        } // Toggle the state
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showReigisterPassword ? "👁️" : "🙈"}{" "}
                        {/* Change the icon based on state */}
                      </span>
                      {formErrors.registerPassword && (
                        <span className="error-input-text">
                          {formErrors.registerPassword}
                        </span>
                      )}
                    </div>

                    <div
                      className="form_boxes"
                      style={{
                        position: "relative",
                        borderColor: formErrors.rePassword ? "red" : "",
                      }}
                    >
                      <label>Nhập lại mật khẩu</label>
                      <input
                        type={showRePassword ? "text" : "password"}
                        name="rePassword"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowRePassword(!showRePassword)} // Toggle the state
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showRePassword ? "👁️" : "🙈"}{" "}
                        {/* Change the icon based on state */}
                      </span>
                      {formErrors.rePassword && (
                        <span className="error-input-text">
                          {formErrors.rePassword}
                        </span>
                      )}
                    </div>

                    <div className="form_boxes">
                      <label>Thành phố</label>
                      <SelectComponent
                        options={provinces}
                        value={
                          provinces.find((el) => el.id === province)?.name ??
                          "Thành phố"
                        }
                        onChange={(value) => setProvince(value.id)}
                      />{" "}
                    </div>

                    <div className="form_boxes">
                      <label>Huyện</label>
                      <SelectComponent
                        options={districts}
                        value={
                          districts.find((el) => el.id === district)?.name ??
                          "Huyện"
                        }
                        onChange={(value) => setDistrict(value.id)}
                      />{" "}
                    </div>

                    <div className="form_boxes">
                      <label>Xã</label>
                      <SelectComponent
                        options={wards}
                        value={wards.find((el) => el.id === ward)?.name ?? "Xã"}
                        onChange={(value) => setWard(value.id)}
                      />
                    </div>
                    <div className="form_boxes">
                      <label>Địa chỉ</label>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAdress(e.target.value)}
                      />
                    </div>
                    <div className="form-submit">
                      <button onClick={onRegister} className="theme-btn">
                        Register{" "}
                      </button>
                    </div>
                    <div className="btn-box">
                      <label className="contain">
                        I accept the privacy policy
                        <input
                          required
                          type="checkbox"
                          defaultChecked="checked"
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
