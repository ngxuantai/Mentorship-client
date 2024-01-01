import {create} from 'zustand';
import {UserRole} from '../constants';
import menteeApi from '../api/mentee';
import mentorApi from '../api/mentor';

export const useUserStore = create((set) => ({
  user: {},
  setUser: (user) => set({user}),
  updateUser: async (id, updatedUser) => {
    console.log('user', updatedUser);

    // Destructure the user from the state
    const {user} = useUserStore.getState();

    try {
      if (user.role === UserRole.MENTEE) {
        const updatedMentee = await menteeApi.updateMentee(id, updatedUser);

        set({user: updatedMentee});
      } else if (user.role === UserRole.MENTOR) {
        // Handle mentor update logic here if needed
        const updateMentor = await mentorApi.updateMentor(id, updatedUser);

        set({user: updateMentor});
      }
    } catch (error) {
      console.error('Error updating mentee:', error);
    }
  },
  login: (user) => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user.id,
        role: user.role,
      })
    );
    set({user});
  },
  logout: () => set({user: {}}),
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
