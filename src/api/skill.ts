import axiosClient from "../config/axiosClient";
const skillApi = {
  getAllSkills: async () => {
    try {
      const url = "/skill/getAllSkills";
      const res = await axiosClient.get(url);

      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createSkill: async (skill) => {
    try {
      const url = "/skill/createSkill";
      const res = await axiosClient.post(url, skill);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getSkillsByFieldId: async (fieldId) => {
    try {
      const url = `/skill/getSkillsByFieldId/${fieldId}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default skillApi;
