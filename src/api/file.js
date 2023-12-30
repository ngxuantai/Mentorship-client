import axiosClient from '../config/axiosClient';

const fileApi = {
  createFile: async (file, folderId) => {
    try {
      const url = `/api/file/create/${folderId}`;
      const payload = {file, folderId}; // Assuming you need to send both file and folderId

      const res = await axiosClient.post(url, file);
      console.log('res', res);
      return res.data;

      // if (res.data.success) {
      //   return res.data;
      // } else {
      //   // Handle the case where the server response indicates failure
      //   console.error('Create file failed:', res.data.error);
      //   return null;
      // }
    } catch (error) {
      console.error('Error creating file:', error);
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
  getFileById: async (fileId) => {
    try {
      const url = `/api/file/getById/${fileId}`;
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
