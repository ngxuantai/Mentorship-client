import {create} from 'zustand';
import menteeApplicationApi from '../api/menteeApplication';

export const useMenteeAppliStore = create((set) => ({
  menteeApplications: [],
  menteeAppliApproved: [],
  setMenteeApplications: (menteeApplications) => set({menteeApplications}),
  getMenteeAppliByMentorId: async (mentorId) => {
    try {
      const menteeApplications =
        await menteeApplicationApi.getMenteeApplicationByMentorId(mentorId);
      console.log('menteeApplications11', menteeApplications);

      // Lọc và thêm vào menteeAppliApproved nếu status = 1
      const menteeAppliApproved = menteeApplications.filter(
        (app) => app.status === 1
      );

      set({menteeApplications, menteeAppliApproved});
    } catch (error) {
      console.error(error);
    }
  },
  updateMenteeAppliStatus: async (id, status) => {
    try {
      const updatedMenteeApplication =
        await menteeApplicationApi.updateMenteeApplicationStatus(id, status);

      // Nếu status = 1, thêm vào menteeAppliApproved
      if (status === 1) {
        set((state) => ({
          menteeApplications: state.menteeApplications.map((app) =>
            app.id === id ? {...app, status} : app
          ),
          menteeAppliApproved: [
            ...state.menteeAppliApproved,
            updatedMenteeApplication,
          ],
        }));
      } else {
        set((state) => ({
          menteeApplications: state.menteeApplications.map((app) =>
            app.id === id ? {...app, status} : app
          ),
        }));
      }
    } catch (error) {
      console.error(error);
    }
  },
}));