import axiosClient from '../config/axiosClient';

const fieldApi = {
  getAllFields: async () => {
    try {
      const url = '/field/getAllFields';
      const res = await axiosClient.get(url);
      console.log('field res data', res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createField: async (field) => {
    try {
      const url = '/field/createField';
      const res = await axiosClient.post(url, field);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default fieldApi;
