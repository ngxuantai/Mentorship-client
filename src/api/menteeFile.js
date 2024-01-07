import axiosClient from '../config/axiosClient';

const menteeFileApi = {
  createMenteeFile: async (fileId, mentorId, menteeId) => {
    try {
      console.log('fileId6', fileId);
      console.log('mentorId6', mentorId);
      console.log('menteeId6', menteeId);
      const url = '/api/menteeFile/create';
      const data = {fileId: fileId, menteeId: menteeId, mentorId: mentorId};
      const res = await axiosClient.post(url, data);
      console.log('new mentee file data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMenteeFileByMenteeFileId: async (menteeFileId) => {
    try {
      const url = `/api/menteeFile/getByMenteeFileId/${menteeFileId}`;
      const res = await axiosClient.get(url);
      console.log('mentee file data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMenteeFileByMenteeId: async (menteeId) => {
    try {
      const url = `/api/menteeFile/getByMenteeId/${menteeId}`;
      const res = await axiosClient.get(url);
      console.log('mentee file data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMenteeFileByMentorId: async (mentorId) => {
    try {
      const url = `/api/menteeFile/getByMentorId/${mentorId}`;
      const res = await axiosClient.get(url);
      console.log('mentee file data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updateMenteeFile: async (menteeFileId, file) => {
    try {
      const url = `/api/menteeFile/update/${menteeFileId}`;
      const data = {file: file};
      const res = await axiosClient.put(url, data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default menteeFileApi;
