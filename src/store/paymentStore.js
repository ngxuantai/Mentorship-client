import {create} from 'zustand';
import paymentApi from '../api/payment';

const usePaymentStore = create((set) => ({
  payment: null,
  setPayment: (payment) => set({payment}),
  createPayment: async (payment) => {
    try {
      const newPayment = await paymentApi.createPayment(payment);
      console.log('new payment data', newPayment);
      set({payment: newPayment});
    } catch (error) {
      console.error(error);
    }
  },
}));

export default usePaymentStore;
