import axiosClient from '../config/axiosClient';

const paymentApi = {
  createPayment: async (payment) => {
    try {
      const url = '/payment';
      const res = await axiosClient.post(url, payment);
      console.log('new payment data', res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAllPayments: async () => {
    try {
      const url = '/payment';
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPaymentsByUserId: async (userId) => {
    try {
      const url = `/payment/user/${userId}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getRequestUrl: async (payment) => {
    try {
      const url = '/getRequestUrl';
      const res = await axiosClient.post(url, payment);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default paymentApi;
