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

  getMenteeApplicationById: async (id) => {
    try {
      const url = `/menteeApplication/getMenteeApplicationById/${id}`;
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
  getMenteeApplicationByMentorId: async (mentorId) => {
    try {
      const url = `/menteeApplication/getMenteeApplicationByMentorId?mentorId=${mentorId}`;
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
      console.log("res", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updateMenteeApplication: async (id, application) => {
    try {
      const url = `/menteeApplication/update/${id}`;
      const res = await axiosClient.put(url, application);
      console.log("res", res.data);
      return res.data;
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

      return res.data.data;
    } catch (error) {
      throw error;
    }
  },
  checkMenteeRegistration: async (menteeId, mentorId) => {
    try {
      const url = `/menteeApplication/checkRegistration`;
      const res = await axiosClient.post(url, { menteeId, mentorId });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getMenteeApplicationByMenteeIdAndMentorId: async (menteeId, mentorId) => {
    try {
      const url = `/menteeApplication/getMenteeApplicationByMenteeIdAndMentorId`;
      const res = await axiosClient.post(url, { menteeId, mentorId });
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default menteeApplicationApi;
