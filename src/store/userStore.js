import create from "zustand";
import menteeApi from "../api/mentee";
import { UserRole } from "../constants";

export const useUserStore = create((set) => ({
  user: {},
  setUser: (user) => set({ user }),
  updateUser: async (id, updatedUser) => {
    console.log("user", updatedUser);
    if (user.role === UserRole.MENTEE) {
      const updatedMentee = await menteeApi.updateMentee(id, updatedUser);
      if (updatedMentee) {
        set({ user: updatedMentee });
      }
    } else if (user.role === UserRole.MENTOR) {
    }
  },
}));
