import React from 'react';
import styled from 'styled-components';
import PersonalInfor from './PersonalInfor';
import TimeAvailable from './TimeAvailable';
import {Checkbox, FormGroup, FormControlLabel} from '@mui/material';

export default function Profiles() {
  return (
    <Container>
      <PersonalInfor />
      <TimeAvailable />
      <EmailContainer>
        <h5 style={{fontWeight: 'bold'}}>Email preferences</h5>
        <p style={{padding: 0, margin: 0}}>
          Configure your email notifications so you can focus on what’s really
          important.
        </p>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Important updates about your account, mentorship, messages and billing"
            disabled={true}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Regular reminders of your ongoing mentorships"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Notifications of mentors on your wishlist"
          />
        </FormGroup>
        <button>Save changes</button>
      </EmailContainer>
      <DeleteContainer>
        <h5 style={{fontWeight: 'bold'}}>Close your account</h5>
        <p>
          Once you delete your account, there’s no going back. Please be
          certain!
        </p>
        <button>Delete account</button>
      </DeleteContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  gap: 2rem;
  padding: 2rem;
`;

const EmailContainer = styled.div`
  max-width: 900px;
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const DeleteContainer = styled.div`
  max-width: 900px;
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    width: 150px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;
    padding: 8px 14px;
    color: #ffffff;
    background-color: #c81e1e;
    &:hover {
      background-color: #771d1d;
    }
  }
`;
