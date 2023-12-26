import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import fieldApi from "../../../../api/field";
import skillApi from "../../../../api/skill";

export default function Profile({ values, onInputChange, onButtonClick }) {
  const [selectedField, setSelectedField] = useState([]);
  const [fields, setFields] = useState([]);
  const [skills, setSkills] = useState([]);
  console.log("profile: field", fields);
  useEffect(() => {
    const getField = async () => {
      const fieldsData = await fieldApi.getAllFields();
      setFields(fieldsData);
    };

    getField();
  }, []);
  const onFieldChange = async (event) => {
    const { name, value } = event.target;
    if (name === "field") {
      console.log("fieldValue", value);
      await fetchFieldSkills(value);
    }
  };
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
    if (selectedField) {
    }
  }, [selectedField]);
  return (
    <Container>
      <ContentContainer>
        <InforContainer onSubmit={handleSubmit}>
          <FormControl style={{ width: "50%" }}>
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
          </FormControl>
          <FormControl style={{ width: "50%" }}>
            <InputLabel size="small">Field</InputLabel>
            <Select
              name="skill"
              label="Skill"
              onChange={(e) => {}}
              size="small"
              defaultValue=""
            >
              {skills.map((s) => {
                return (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className="content">
            <TextField
              name="skill"
              autoComplete="off"
              label="Skill"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
              required
              helperText="Comma-separated list of your skills (keep it below 10). Mentees will use this to find you."
            />
          </div>
          <TextField
            name="bio"
            multiline
            value={values.bio}
            onChange={onInputChange}
            autoComplete="off"
            label="Bio"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              fontSize: "1rem",
              "& textarea": {
                minHeight: "8rem",
                resize: "vertical",
              },
            }}
            required
            helperText="Tell us (and your mentees) a little bit about yourself. Talk about yourself in the first person, as if you'd directly talk to a mentee. This will be public."
          />
          <div className="content">
            <TextField
              name="linkedin"
              onChange={onInputChange}
              autoComplete="off"
              label="LinkedIn"
              value={values.linkedin}
              placeholder="https://www.linkedin.com/"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
              required
            />
            <TextField
              name="twitter"
              value={values.twitter}
              onChange={onInputChange}
              autoComplete="off"
              label="Twitter"
              placeholder="https://twitter.com/"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
            />
          </div>
          <div
            className="content"
            style={{ width: "50%", paddingRight: "0.5rem" }}
          >
            <TextField
              name="personalWebsite"
              autoComplete="off"
              label="Personal Website"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
              helperText="You can add your blog, GitHub profile or similar here"
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
  .content {
    display: flex;
    flex-direction: row;
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
