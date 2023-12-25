import axiosClient from "../config/axiosClient";
const applicationApi = {
  createApplication: async (data) => {
    try {
      const url = "/application/createApplication";
      const res = await axiosClient.post(url, data);
      console.log("application res data", data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default applicationApi;
