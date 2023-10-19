import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "./apiConfig";

const axiosClient = axios.create({
  baseURL,
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //refresh token failed
    return Promise.reject(error);
  }
);

export default axiosClient;
