import axiosClient from '../config/axiosClient';

const mneteeExamApi = {
  createMenteeExam: async (examId, mentorId, menteeId) => {
    try {
      console.log('examId6', examId);
      console.log('mentorId6', mentorId);
      console.log('menteeId6', menteeId);
      const url = '/api/menteeExam/create';
      const data = {examId: examId, mentorId: mentorId, menteeId: menteeId};
      const res = await axiosClient.post(url, data);
      console.log('new mentee exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMenteeExamByMenteeExamId: async (examId) => {
    try {
      const url = `/api/menteeExam/getByMenteeExamId/${examId}`;
      const res = await axiosClient.get(url);
      console.log('mentee exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMenteeExamByMenteeId: async (menteeId) => {
    try {
      const url = `/api/menteeExam/getByMenteeId/${menteeId}`;
      const res = await axiosClient.get(url);
      console.log('mentee exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMenteeExamByMentorId: async (mentorId) => {
    try {
      const url = `/api/menteeExam/getByMentorId/${mentorId}`;
      const res = await axiosClient.get(url);
      console.log('mentee exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createAnswer: async (answer) => {
    try {
      const url = '/api/answer/create';
      console.log('answer', answer);
      const res = await axiosClient.post(url, answer);
      console.log('new answer data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAnswerByMenteeExamId: async (menteeExamId) => {
    try {
      const url = `/api/answer/getByMenteeExamId/${menteeExamId}`;
      const res = await axiosClient.get(url);
      console.log('answer data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAnswerByQuestionId: async (questionId) => {
    try {
      const url = `/api/answer/getByQuestionId/${questionId}`;
      const res = await axiosClient.get(url);
      console.log('answer data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updateAnswer: async (answerId, answer) => {
    try {
      const url = `/api/answer/update/${answerId}`;
      const res = await axiosClient.put(url, answer);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default mneteeExamApi;
