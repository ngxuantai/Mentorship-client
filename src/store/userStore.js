import {create} from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,

  setUser: (user, token) => set({user, token, isAuthenticated: true}),

  login: ({user, token}) => {
    if (!token || !user) {
      console.error('Invalid token or user data');
      return;
    }

    set({isAuthenticated: true, token: token, user: user});
    console.log('user', user);
    console.log('token', token);
  },

  logout: () => set({user: null, isAuthenticated: false, token: null}),
}));

export default useUserStore;
