import axiosClient from "../config/axiosClient";

const menteeApplicationApi = {
  getAllMenteeApplication: async () => {
    try {
      const url = "/menteeApplication/getAllMenteeApplication";
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getMenteeApplicationByMenteeId: async (menteeId) => {
    try {
      const url = `/menteeApplication/getMenteeApplicationByMenteeId/${menteeId}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  updateMenteeApplicationStatus: async (id, status) => {
    try {
      const url = `/menteeApplication/updateMenteeApplicationStatus/${id}`;
      const res = await axiosClient.put(url, status);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  deleteMenteeApplication: async (id) => {
    try {
      const url = `/menteeApplication/deleteMenteeApplication/${id}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  createMenteeApplication: async (menteeApplication) => {
    try {
      const url = "/menteeApplication/createMenteeApplication";
      const res = await axiosClient.post(url, menteeApplication);
      console.log("mentee application res", res.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default menteeApplicationApi;
