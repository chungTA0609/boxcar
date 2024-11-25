import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://18.139.116.136:8080/api/", // Replace with your API base URL
  withCredentials: true, // Allow cookies to be sent with requests
});

// Intercept Requests to Add CSRF Token (Optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the config here if needed (e.g., add custom headers)
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Errors in Responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
