import React, {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import skillApi from '../../../api/skill';

export default function FilterButton({filters, onFilterChange}) {
  const [personName, setPersonName] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {}, []);

  const handleChange = (event) => {
    const {
      target: {value, key},
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    console.log('VALUE', value);
    console.log('KEY', key);
    console.log('PERSON NAME', personName);
  };

  return (
    <div
      style={{
        minWidth: 150,
        width: 150,
        maxWidth: 300,
      }}
    >
      <FormControl
        sx={{m: 1, width: '100%', height: 45, borderRadius: 24, margin: 0}}
        size="small"
      >
        <InputLabel id="demo-multiple-checkbox-label">Học phí</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Học phí" />}
          renderValue={(selected) => selected.join(', ')}
          size="small"
          sx={{borderRadius: 24, height: 45}}
        >
          // slider
        </Select>
      </FormControl>
    </div>
  );
}
