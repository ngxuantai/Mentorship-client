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

      // Lọc và thêm và o menteeAppliApproved nếu status = 1
      const menteeAppliApproved = menteeApplications.filter(
        (app) => app.status === 1 || app.status === 2
      );
      console.log('menteeAppliApproved', menteeAppliApproved);
      set({menteeApplications, menteeAppliApproved});
    } catch (error) {
      console.error(error);
    }
  },
  getMenteeAppliByMenteeId: async (menteeId) => {
    try {
      const menteeApplications =
        await menteeApplicationApi.getMenteeApplicationByMenteeId(menteeId);
      const menteeAppliApproved = menteeApplications.filter(
        (app) => app.status === 1 || app.status === 2
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

      if (status === 1 || status === 2) {
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
  updateMenteeApplication: async (id, application) => {
    try {
      const updatedMenteeApplication =
        await menteeApplicationApi.updateMenteeApplication(id, application);

      set((state) => ({
        menteeApplications: state.menteeApplications.map((app) =>
          app.id === id ? updatedMenteeApplication : app
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
