// import {useEffect, useRef, useState} from 'react';
// import {BsChevronDown} from 'react-icons/bs';
// import FilterOptionList from './FilterOptionList';
// export default function FilterButton({filters, onFilterChange}) {
//   const [searchInput, setSearchInput] = useState('');
//   const [showOptions, setShowOptions] = useState(false);
//   const [isOptionListHovered, setOptionListHovered] = useState(false);
//   const filterOptionListRef = useRef(null);
//   const timeoutRef = useRef();

//   useEffect(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef);
//     }

//     if (searchInput.trim() === '') {
//       // resetList();
//     } else {
//       const newTimeout = setTimeout(() => {
//         // search(searchInput);
//         console.log('SEARCH');
//       }, 500);
//       timeoutRef.current = newTimeout;
//     }
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [searchInput]);

//   const showMenuOption = () => {
//     setShowOptions(!showOptions);
//   };

//   const closeOptionsOnClickOutside = (e) => {
//     if (
//       filterOptionListRef.current &&
//       !filterOptionListRef.current.contains(e.target)
//     ) {
//       setShowOptions(false);
//     }
//   };
//   useEffect(() => {
//     document.addEventListener('mousedown', closeOptionsOnClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', closeOptionsOnClickOutside);
//     };
//   }, []);
//   return (
//     <div
//       style={{
//         minWidth: 150,
//         marginRight: 24,
//         display: 'inline-flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 10,
//         paddingRight: 18,
//         paddingLeft: 18,
//         backgroundColor: 'white',
//         position: 'relative',
//         borderRadius: 24,
//         zIndex: 1,
//         justifyContent: 'space-between',
//         border: '1px solid gray',
//         width: 'auto',
//       }}
//       className={`${!isOptionListHovered ? 'button-effect' : ''}`}
//       onClick={showMenuOption}
//     >
//       <p style={{margin: 0, marginRight: 8, fontWeight: 'bold'}}>
//         {filters.skill?.name || 'Kĩ năng'}
//       </p>
//       <BsChevronDown fontSize={16}></BsChevronDown>
//       {showOptions && (
//         <FilterOptionList
//           onSelected={(item) => {
//             onFilterChange('skill', item);
//           }}
//           setShowOptions={setShowOptions}
//           setOptionListHovered={setOptionListHovered}
//           forwardRef={filterOptionListRef}
//         ></FilterOptionList>
//       )}
//     </div>
//   );
// }

import React, {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import skillApi from '../../../api/skill';

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

export default function FilterButton({filters, onFilterChange}) {
  const [personName, setPersonName] = useState([]);
  const [skills, setSkills] = useState([]);

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

  const handleChange = (event) => {
    const {
      target: {value, key},
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    console.log('VALUE', value);
    console.log('KEY', key);
    console.log('PERSON NAME', personName);
  };

  const handleSkillToggle = (skill) => {
    console.log('SKILL', skill);
  };

  return (
    <div
      style={{
        minWidth: 150,
        width: 300,
        maxWidth: 300,
      }}
    >
      <FormControl
        sx={{m: 1, width: '100%', height: 45, borderRadius: 24, margin: 0}}
        size="small"
      >
        <InputLabel id="demo-multiple-checkbox-label">Kĩ năng</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Kĩ năng" />}
          renderValue={(selected) => selected.join(', ')}
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
