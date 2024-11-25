import axiosInstance from "./axiosInstance";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data; // Adjust based on your API response
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    window.location.href = "/login"; // Redirect to login page
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me"); // Endpoint to fetch user details
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};
