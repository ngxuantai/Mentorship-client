import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import InfoIcon from '@mui/icons-material/Info';
import {
  TextField,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function Profile({onButtonClick}) {
  const [values, setValues] = useState({
    category: '',
    skill: '',
    bio: '',
    linkedin: '',
    twitter: '',
    personalWebsite: '',
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onButtonClick('pagethree');
  };

  return (
    <Container>
      <ContentContainer>
        <InforContainer onSubmit={handleSubmit}>
          <FormControl style={{width: '50%'}}>
            <InputLabel size="small">Category</InputLabel>
            <Select
              name="category"
              label="Category"
              onChange={(event) => handleChange(event)}
              size="small"
              defaultValue=""
            >
              <MenuItem value="1">Engineering & Data</MenuItem>
              <MenuItem value="2">UX & Design</MenuItem>
              <MenuItem value="3">Business & Management</MenuItem>
              <MenuItem value="4">Product & Marketing</MenuItem>
            </Select>
          </FormControl>
          <div className="content">
            <TextField
              name="skill"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Skill"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
              helperText="Comma-separated list of your skills (keep it below 10). Mentees will use this to find you."
            />
          </div>
          <TextField
            name="bio"
            multiline
            onChange={(event) => handleChange(event)}
            autoComplete="off"
            label="Bio"
            variant="outlined"
            size="small"
            sx={{
              width: '100%',
              fontSize: '1rem',
              '& textarea': {
                minHeight: '8rem',
                resize: 'vertical',
              },
            }}
            required
            helperText="Tell us (and your mentees) a little bit about yourself. Talk about yourself in the first person, as if you'd directly talk to a mentee. This will be public."
          />
          <div className="content">
            <TextField
              name="linkedin"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="LinkedIn"
              placeholder="https://www.linkedin.com/"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
            />
            <TextField
              name="twitter"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Twitter"
              placeholder="https://twitter.com/"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
            />
          </div>
          <div
            className="content"
            style={{width: '50%', paddingRight: '0.5rem'}}
          >
            <TextField
              name="personalWebsite"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Personal Website"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              helperText="You can add your blog, GitHub profile or similar here"
            />
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <button
              onClick={() => {
                onButtonClick('pageone');
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
