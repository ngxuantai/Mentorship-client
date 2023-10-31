import React, {useState} from 'react';
import styled from 'styled-components';
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import {colors} from '../../../../constants/colors';

export default function TimeAvailable() {
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container>
      <h5 style={{fontWeight: 'bold'}}>Time availability</h5>
      <FormControl>
        <FormLabel
          sx={{
            color: 'black',
            marginBottom: '1rem',
          }}
        >
          In general, when do you prefer to meet your mentor?
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Early mornings (before 9am)"
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="During the day (between 9am and 5pm)"
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="In the evenings (after 5pm)"
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="I'm flexible"
          />
          <FormControlLabel value="female" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>
      <button>Save changes</button>
    </Container>
  );
}

const Container = styled.div`
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
