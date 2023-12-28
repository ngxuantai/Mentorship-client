import axiosClient from "../config/axiosClient";

const learningProgressApi = {
  createLearningProgress: async (data) => {
    try {
      const url = "/learningProgress/createLearningProgress";
      const res = await axiosClient.post(url, data);
      console.log("learningProgress res data", data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  updateLearningProgress: async (id, data) => {
    try {
      const url = `/learningProgress/updateLearningProgress/${id}`;
      const res = await axiosClient.put(url, data);
      console.log("learningProgress res data", data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getLearningProgressByMenteeId: async (menteeId) => {
    try {
      const url = `/learningProgress/getLearningProgressByMenteeId/${menteeId}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getLearningProgressByMentorId: async (mentorId, year) => {
    try {
      const url = `/learningProgress/getLearningProgressByMentorId/${mentorId}${
        year ? `/${year}` : ""
      }`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  getLearningProgressByApplicationId: async (applicationId) => {
    try {
      const url = `/learningProgress/getLearningProgressByApplicationId/${applicationId}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default learningProgressApi;
