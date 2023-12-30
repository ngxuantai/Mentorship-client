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
  getAllApplications: async () => {
    try {
      const url = "/application/getAllApplication";
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getApplicationById: async (id) => {
    try {
      const url = `/application/getApplicationById/${id}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  updateApplicationStatus: async (id, status) => {
    try {
      const url = `/application/updateApplicationStatus/${id}`;
      const res = await axiosClient.put(url, status);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  deleteApplication: async (id) => {
    try {
      const url = `/application/deleteApplication/${id}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default applicationApi;
