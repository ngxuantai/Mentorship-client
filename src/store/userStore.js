import create from 'zustand';
import menteeApi from '../api/mentee';
import {UserRole} from '../constants';

export const useUserStore = create((set) => ({
  user: {},
  setUser: (user) => set({user}),
  updateUser: async (id, updatedUser) => {
    console.log('user', updatedUser);

    // Destructure the user from the state
    const {user} = set.getState();

    if (user.role === UserRole.MENTEE) {
      try {
        // Assuming menteeApi.updateMentee returns the updated mentee
        const updatedMentee = await menteeApi.updateMentee(id, updatedUser);

        // Use the set function to update the state
        set({user: updatedMentee});
      } catch (error) {
        console.error('Error updating mentee:', error);
      }
    } else if (user.role === UserRole.MENTOR) {
      // Handle mentor update logic here if needed
    }
  },
}));
// user: null,
// isAuthenticated: false,
// token: null,

// setUser: (user, token) => set({user, token, isAuthenticated: true}),

// login: ({user, token}) => {
//   if (!token || !user) {
//     console.error('Invalid token or user data');
//     return;
//   }

//   set({isAuthenticated: true, token: token, user: user});
//   console.log('user', user);
//   console.log('token', token);
// },

// logout: () => set({user: null, isAuthenticated: false, token: null}),
