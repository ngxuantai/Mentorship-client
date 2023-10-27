import axiosClient from "../config/axiosClient";

const authApi = {
  login: async (username, password) => {
    return axiosClient.post("", { username, password });
  },
};

export default authApi;
