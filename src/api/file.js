import axiosClient from '../config/axiosClient';

const fileApi = {
  createFile: async (file) => {
    try {
      const url = '/api/file/create';
      const res = await axiosClient.post(url, file);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getFilesByMentorId: async (mentorId) => {
    try {
      const url = `/api/file/getByMentorId/${mentorId}`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default fileApi;
