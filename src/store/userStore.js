import create from "zustand";

export const useUserStore = create((set) => ({
  user: {
    id: "6545fadf162346b2815226b5",
    avatar: "https://picsum.photos/200/300",
    displayName: "Default User",
    email: "default.user@example.com",
    phoneNumber: "123-456-7890",
  },
  setUser: (user) => set({ user }),
}));
