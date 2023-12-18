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
  searchMentor: async (
    name = "",
    skillIds = [],
    minPrice = null,
    maxPrice = null
  ) => {
    try {
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
      if (skillIds.length > 0) {
        url += `${firstParamAdded ? "&" : "?"}skillIds=${skillIds.join(",")}`;
      }
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default mentorApi;
