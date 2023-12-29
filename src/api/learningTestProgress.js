import axiosClient from '../config/axiosClient';

const learningTestProgressApi = {
  createLearningTestProgress: async (data) => {
    try {
      const url = '/learningTestProgress/create';
      const res = await axiosClient.post(url, data);
      console.log('learningTestProgress res data', data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getByMenteeId: async (menteeId) => {
    try {
      const url = `/learningTestProgress/getByMenteeId/${menteeId}`;
      const res = await axiosClient.get(url);
      console.log('learningTestProgress res data', res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  update: async (data) => {
    try {
      console.log('learningTestProgress data', data);
      const url = `/learningTestProgress/update/${data.id}`;
      const res = await axiosClient.put(url, data);
      console.log('learningTestProgress res data', data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default learningTestProgressApi;
