import { Chip, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fieldApi from "../../../../api/field";
import mentorApi from "../../../../api/mentor";
import skillApi from "../../../../api/skill";
import { useUserStore } from "../../../../store/userStore";

export default function MentorSkills() {
  const { user, updateUser } = useUserStore();
  console.log("user infor", user);
  const [values, setValues] = React.useState({
    bio: user.bio,
    introduction: user.introduction,
  });

  const [fields, setFields] = useState([]);
  const [mentorSkills, setMentorSkills] = useState([]);
  const [selectedField, setSelectedField] = useState([]);
  console.log("profile: field", fields);
  useEffect(() => {
    const getField = async () => {
      const fieldsData = await fieldApi.getAllFields();
      setFields(fieldsData);
    };

    getField();
  }, []);
  const handleSelectedFieldChange = async (event) => {
    const { name, value } = event.target;
    setSelectedField(value);

    console.log("fieldValue", value);
  };
  const handleSelectedSkillChange = async (event) => {
    const { value } = event.target;

    const isSkillExist = mentorSkills.some((skill) => skill.id === value.id);

    if (!isSkillExist) {
      setMentorSkills([...mentorSkills, value]);
    }
  };
  const handleSaveChange = async (event) => {
    event.preventDefault();
    const newSkillIds = mentorSkills.map((skill) => skill.id);
    const updatedUser = { ...user, skillIds: newSkillIds };
    await updateUser(user.id, updatedUser);
  };

  const handleDeleteSkill = (skillId) => {
    setMentorSkills(mentorSkills.filter((skill) => skill.id !== skillId));
  };

  const handleAddSkill = (skill) => {
    setMentorSkills([...mentorSkills, skill]);
  };

  useEffect(() => {
    const fetchFields = async () => {
      const fieldsData = await fieldApi.getAllFields();
      console.log("fieldsData", fieldsData);
      if (fieldsData) {
        const fieldsAndSkills = await Promise.all(
          fieldsData.map(async (f) => {
            const skills = await skillApi.getSkillsByFieldId(f.id);
            return {
              ...f,
              skills,
            };
          })
        );
        setFields(fieldsAndSkills);
      }
    };

    fetchFields();
  }, []);
  useEffect(() => {
    const fetchMentorSkills = async () => {
      const mentorSkillsData = await mentorApi.getMentorSkills(user.id);
      if (mentorSkillsData) {
        setMentorSkills(mentorSkillsData);
      }
    };

    fetchMentorSkills();
  }, []);
  return (
    <Container>
      <Tittle>
        <h3>Kỹ năng</h3>
      </Tittle>
      <ContentContainer>
        {/* <TipsContainer>
          <p>
            <PrivacyTipIcon style={{ color: "#3f83f8", fontSize: "16px" }} />{" "}
            Mẹo
          </p>
          <ul>
            <li>
              Hãy thêm ảnh cá nhân và liên kết đến các trang mạng xã hội để tạo
              ấn tượng tích cực về bạn là người hướng dẫn đích thực.
            </li>
            <li>
              Ghi rõ về kinh nghiệm của bạn để mentee có cái nhìn tổng quan về
              bạn.
            </li>
          </ul>
        </TipsContainer> */}
        <InforContainer onSubmit={handleSaveChange}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormControl style={{ width: "50%", marginRight: 24 }}>
              <InputLabel size="small">Field</InputLabel>
              <Select
                name="field"
                label="Field"
                onChange={handleSelectedFieldChange}
                size="small"
                defaultValue=""
              >
                {fields.map((f) => {
                  return (
                    <MenuItem key={f.id} value={f}>
                      {f.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl style={{ width: "50%", marginRight: 24 }}>
              <InputLabel size="small">Skill</InputLabel>
              <Select
                name="skill"
                label="Skill"
                onChange={handleSelectedSkillChange}
                size="small"
                defaultValue=""
              >
                {selectedField?.skills?.map((s) => {
                  return (
                    <MenuItem key={s.id} value={s}>
                      {s.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            {mentorSkills.map((skill) => (
              <Chip
                key={skill.id}
                label={skill.name}
                onDelete={() => handleDeleteSkill(skill.id)}
                style={{ fontWeight: "bold", marginRight: 12 }}
              />
            ))}
          </div>

          <button>Lưu thay đổi</button>
        </InforContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  width: 90%;
`;
const TipsContainer = styled.div`
  background-color: #e0edfe;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;
const Tittle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    width: 100%;
    font-weight: bold;
  }
`;

const ContentContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  gap: 1rem;
`;

const InforContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  gap: 1rem;
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  button {
    width: 140px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;
    padding: 8px 14px;
    color: #ffffff;
    background-color: #1c3d7a;
    &:hover {
      background-color: #172e59;
    }
  }
`;
