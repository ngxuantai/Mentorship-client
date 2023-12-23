import {create} from 'zustand';
import paymentApi from '../api/payment';

const usePaymentStore = create((set) => ({
  payment: null,
  setPayment: (payment) => set({payment}),
  createPayment: async (data) => {
    try {
      const newPayment = await paymentApi.createPayment(data);
      set({payment: newPayment});
    } catch (error) {
      console.error(error);
    }
  },
}));

export default usePaymentStore;
