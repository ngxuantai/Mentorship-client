import axiosClient from "../config/axiosClient";

const mentorApi = {
  getAllMentors: async () => {
    try {
      const url = "/api/mentor/get";
      const res = await axiosClient.get(url);
      console.log("mentor res data", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createMentor: async (mentor) => {
    try {
      const url = "/api/mentor/create";
      const res = await axiosClient.post(url, mentor);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getMentorById: async (id) => {
    try {
      const url = `/api/mentor/get/${id}`;
      const res = await axiosClient.get(url);
      console.log("mentor res data", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  searchMentor: async (name = "", filters = {}) => {
    try {
      const { skill = null, minPrice = null, maxPrice = null } = filters;
      let url = "/api/mentor/search";
      let firstParamAdded = false;
      if (name) {
        url += `?name=${name}`;
        firstParamAdded = true;
      }
      if (minPrice !== null) {
        url += `${firstParamAdded ? "&" : "?"}minPrice=${minPrice}`;
        firstParamAdded = true;
      }
      if (maxPrice !== null) {
        url += `${firstParamAdded ? "&" : "?"}maxPrice=${maxPrice}`;
        firstParamAdded = true;
      }
      if (skill !== null) {
        url += `${firstParamAdded ? "&" : "?"}skillId=${skill.id}`;
      }
      console.log("search filters", url, filters);
      const res = await axiosClient.get(url);
      console.log("search result", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default mentorApi;
