import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { TextInput, Textarea, Spinner, FloatingLabel } from "flowbite-react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import fieldApi from "../../../../api/field";
import skillApi from "../../../../api/skill";
import { set } from "date-fns";

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

export default function Profile({ values, onInputChange, onButtonClick }) {
  const [selectedField, setSelectedField] = useState([]);
  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const getField = async () => {
      const fieldsData = await fieldApi.getAllFields();
      setFields(fieldsData);
    };

    const getSkills = async () => {
      const skillsData = await skillApi.getAllSkills();
      setSkills(skillsData);
    };

    getField();
    getSkills();
  }, []);
  const onFieldChange = async (event) => {
    const { name, value } = event.target;
    if (name === "field") {
      console.log("fieldValue", value);
      await fetchFieldSkills(value);
    }
  };

  const handleSkillChange = (event) => {
    const {
      target: { value, key },
    } = event;
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  }
  const fetchFieldSkills = async (fieldId) => {
    const data = await skillApi.getSkillsByFieldId(fieldId);
    if (data) {
      setSkills(data);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onButtonClick("pagethree");
  };

  useEffect(() => {
    values.skillIds = selectedSkills;
  }, [selectedSkills]);
  

  return (
    <Container>
      <ContentContainer>
        <InforContainer onSubmit={handleSubmit}>
          {/* <FormControl style={{ width: "50%" }}>
            <InputLabel size="small">Field</InputLabel>
            <Select
              name="field"
              label="Field"
              onChange={onFieldChange}
              size="small"
              defaultValue=""
            >
              {fields.map((f) => {
                return (
                  <MenuItem key={f.id} value={f.id}>
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
              value={selectedSkills}
              onChange={handleSkillChange}
              multiple
              name="skill"
              label="Skill"
              input={<OutlinedInput label="Kỹ năng" />}
              MenuProps={MenuProps}
              renderValue={(selected) => {
                return `Đã chọn ${selected.length} kỹ năng`;
              }}
            >
              {skills.map((skill) => (
                <MenuItem key={skill.id} value={skill.id}>
                  <Checkbox checked={selectedSkills.indexOf(skill.id) > -1} />
                  <ListItemText primary={skill.name} />
                </MenuItem>

              ))}
              
            </Select>
          </FormControl>
          {/* <div className="content">
            <TextInput className="w-full "
              placeholder="Điền kỹ năng của bạn"
              name="skill"
              autoComplete="off"
              label="Skill"
              required
              helperText="Dùng dấu phẩy để ngăn cách các kỹ năng của bạn (dưới 10 kỹ năng). Mentees sẽ dùng chúng để tìm đến bạn"             
            />
          </div> */}

          <div>
          <Textarea className="w-full bg-white"
            
            rows={5}
            name="bio"
            multiline
            value={values.bio}
            onChange={onInputChange}
            placeholder="Bio của bạn"
            autoComplete="off"
            label="Bio"
            required
            helperText='Hãy cho chúng tôi và các mentees biết về bạn, những gì bạn muốn chia sẻ với họ.'
          />
          </div>
          <div className="content grid grid-cols-2 justify-stretch space-x-4">
            <FloatingLabel className="w-full"
              variant="outlined"
              name="linkedin"
              onChange={onInputChange}
              autoComplete="off"
              label="LinkedIn"
              value={values.linkedin}
              required
            />
            <FloatingLabel className="w-full"
              name="twitter"
              value={values.twitter}
              onChange={onInputChange}
              autoComplete="off"
              label="Twitter"
              variant="outlined"
            />
          </div>
          <div
          >
            <FloatingLabel className="w-[50%]"
              variant="outlined"
              name="personalWebsite"
              autoComplete="off"
              label="Website cá nhân"
              helperText="Bạn có thể thêm link blog cá nhân, github, facebook,... ở đây"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <button
              onClick={() => {
                onButtonClick("pageone");
              }}
            >
              Previous step
            </button>
            <button>Next step</button>
          </div>
        </InforContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  width: 90%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

const InforContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

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
