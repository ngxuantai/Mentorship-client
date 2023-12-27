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

const folderApi = {
  getFoldersByMentorId: async (mentorId) => {
    try {
      const url = `/api/folder/getByMentorId/${mentorId}`;
      const res = await axiosClient.get(url);
      console.log('folder res data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createFolder: async (folder) => {
    try {
      const url = '/api/folder/create';
      const res = await axiosClient.post(url, folder);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export {fileApi, folderApi};
