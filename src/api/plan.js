import axiosClient from '../config/axiosClient';

const planApi = {
  createPlan: async (plan) => {
    try {
      const url = '/api/plan/create';
      const res = await axiosClient.post(url, plan);
      console.log('new plan data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPlanByPlanId: async (planId) => {
    try {
      const url = `/api/plan/get/${planId}`;
      const res = await axiosClient.get(url);
      console.log('plan data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPlanByMentorId: async (mentorId) => {
    try {
      const url = `/api/plan/getall/${mentorId}`;
      console.log('url', url);
      const res = await axiosClient.get(url);
      console.log('plan data', res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deletePlan: async (planId) => {
    try {
      const url = `/api/plan/delete/${planId}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updatePlan: async (planId, plan) => {
    try {
      const url = `/api/plan/update/${planId}`;
      const res = await axiosClient.put(url, plan);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default planApi;
