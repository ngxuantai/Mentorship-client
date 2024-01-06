import { Chip, FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText, OutlinedInput} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fieldApi from "../../../../api/field";
import mentorApi from "../../../../api/mentor";
import skillApi from "../../../../api/skill";
import { useUserStore } from "../../../../store/userStore";


const ITEM_HEIGHT = 44;
const ITEM_PADDING_TOP = 6;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MentorSkills() {
  const { user, updateUser } = useUserStore();
  console.log("user infor", user);
  // const [values, setValues] = useState({
  //   bio: user.bio,
  //   introduction: user.introduction,
  // });

  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [mentorSkills, setMentorSkills] = useState([]);
  //const [selectedField, setSelectedField] = useState([]);
  //const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedSkillsId, setSelectedSkillsId] = useState([]);

  console.log(user.skillIds);

  const handleSaveChange = async (event) => {
    event.preventDefault();
    const updatedUser = { ...user, skillIds: selectedSkillsId };
    await updateUser(user.id, updatedUser);


    const fetchMentorSkills = async () => {
      const mentorSkillsData = await mentorApi.getMentorSkills(user.id);
      if (mentorSkillsData) {
        setMentorSkills(mentorSkillsData);
      }
      //setSelectedSkillsId(mentorSkillsData.map((skill) => skill.id));
    };

    fetchMentorSkills();
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const skillsData = await skillApi.getAllSkills();
      const sortedSkills = skillsData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSkills(sortedSkills);
    };
    const fetchMentorSkills = async () => {
      const mentorSkillsData = await mentorApi.getMentorSkills(user.id);
      if (mentorSkillsData) {
        setMentorSkills(mentorSkillsData);
      }
      setSelectedSkillsId(mentorSkillsData.map((skill) => skill.id));
    };
   
    fetchSkills();
    fetchMentorSkills();

  }, []);


  const handleSkillChange = (event) => {
    const {
      target: { value, key },
    } = event;
    setSelectedSkillsId(typeof value === 'string' ? value.split(',') : value);
  }

  console.log("selectedSkillsId", selectedSkillsId);

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
            {/* <FormControl style={{ width: "50%", marginRight: 24 }}>
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
            </FormControl> */}
          <FormControl className="w-[50%]">
            <InputLabel>Kỹ năng</InputLabel>
            <Select className=""
              required
              value={selectedSkillsId}
              onChange={handleSkillChange}
              multiple
              name="skill"
              label="Skill"
              input={<OutlinedInput label="Kỹ năng" />}
              MenuProps={MenuProps}
              renderValue={(selected) => {
                return `${selected.length} kỹ năng`;
              }}
            >
              {skills.map((skill) => (
                <MenuItem key={skill.id} value={skill.id}>
                  <Checkbox checked={selectedSkillsId.indexOf(skill.id) > -1} 
                    onClick={() => handleCheckboxChange(skill)}/>
                  <ListItemText primary={skill.name} />
                </MenuItem>

              ))}
              
            </Select>
          </FormControl>
          </div>
          <div>
            {mentorSkills.map((skill) => (
              <Chip
                key={skill.id}
                label={skill.name}
                //onDelete={() => handleDeleteSkill(skill.id)}
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
