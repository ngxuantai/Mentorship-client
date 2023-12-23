import axiosClient from '../config/axiosClient';

const examApi = {
  createExam: async (exam) => {
    try {
      const url = '/api/exam/create';
      const res = await axiosClient.post(url, exam);
      console.log('new exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getExamByExamId: async (examId) => {
    try {
      const url = `/api/exam/getByExamId/${examId}`;
      const res = await axiosClient.get(url);
      console.log('exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getExamByMentorId: async (mentorId) => {
    try {
      const url = `/api/exam/getByMentorId/${mentorId}`;
      const res = await axiosClient.get(url);
      console.log('exam data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deleteExam: async (examId) => {
    try {
      const url = `/api/exam/delete/${examId}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createQuestion: async (question) => {
    try {
      const url = '/api/question/create';
      console.log('question', question);
      const res = await axiosClient.post(url, question);
      console.log('new question data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getQuestionByExamId: async (examId) => {
    try {
      const url = `/api/question/get/${examId}`;
      const res = await axiosClient.get(url);
      console.log('question data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deleteQuestion: async (questionId) => {
    try {
      const url = `/api/question/delete/${questionId}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default examApi;
