import React, {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import skillApi from '../../../api/skill';
import {useLocation} from 'react-router';

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

export default function SkillFilterButton({filters, onFilterChange}) {
  const [personName, setPersonName] = useState([]);
  const [skills, setSkills] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const skill = queryParams.get('skill');

  useEffect(() => {
    const fetchSkills = async () => {
      const allSkills = await skillApi.getAllSkills();
      const sortedSkills = allSkills.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setSkills(sortedSkills);
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (skill === null) {
      // update selected skill
      setPersonName([]);
    } else {
      console.log('SKILL', skill);
    }
  }, [skill]);

  const handleChange = (event) => {
    const {
      target: {value, key},
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSkillToggle = (skill) => {
    onFilterChange('skill', skill);
  };

  return (
    <div
      style={{
        minWidth: 150,
        width: 200,
        maxWidth: 300,
      }}
    >
      <FormControl
        sx={{width: '100%', height: 45, borderRadius: 24}}
        size="small"
      >
        <InputLabel id="demo-multiple-checkbox-label">Kĩ năng</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Kĩ năng" />}
          renderValue={(selected) => {
            if (selected.length > 2) {
              return `${selected.length} kĩ năng`;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          size="small"
          sx={{borderRadius: 24, height: 45}}
        >
          {skills.map((skill) => (
            <MenuItem
              key={skill.id}
              value={skill.name}
              onClick={() => handleSkillToggle(skill)}
            >
              <Checkbox checked={personName.indexOf(skill.name) > -1} />
              <ListItemText primary={skill.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
