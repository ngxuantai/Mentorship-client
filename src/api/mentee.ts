import axiosClient from "../config/axiosClient";

const menteeApi = {
  getMentee: async (id) => {
    try {
      const url = `/api/mentee/get/${id}`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createMentee: async (mentee) => {
    try {
      const url = "/api/mentee/create";
      const res = await axiosClient.post(url, mentee);
      console.log("new mentee data", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default menteeApi;
