import {create} from 'zustand';

const useCourseStore = create((set) => ({
  courses: [],
  course: null,

  setCourses: (courses) => set({courses}),
  setCourse: (course) => set({course}),

  fectchCourses: async () => {
    try {
      // call api
      set({courses});
    } catch (error) {}
  },

  fectchCourseById: async (id) => {
    try {
      // call api
      set({course});
      set((state) => ({
        course: state.courses.map((c) => (c.id === id ? course : c)),
      }));
    } catch (error) {}
  },
}));
