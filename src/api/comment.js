import axiosClient from '../config/axiosClient';

const commentApi = {
  createComment: async (comment) => {
    try {
      const url = '/api/comment/create';
      const res = await axiosClient.post(url, comment);
      console.log('new comment data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAllCommentByMentorId : async (mentorId) => {
    try {
      const url = `/api/comment/getall/${mentorId}`;
      const res = await axiosClient.get(url);
      console.log('all comment data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default commentApi;
