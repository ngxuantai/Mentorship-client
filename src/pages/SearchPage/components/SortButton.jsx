// import {useEffect, useRef, useState} from 'react';
// import {Label, Select} from 'flowbite-react';
// import {BsChevronDown} from 'react-icons/bs';
// import FilterOptionList from './FilterOptionList';
// export default function SortButton({filters, onFilterChange}) {
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
//         // padding: 10,
//         // paddingRight: 18,
//         // paddingLeft: 18,
//         backgroundColor: 'white',
//         position: 'relative',
//         borderRadius: 24,
//         zIndex: 1,
//         justifyContent: 'space-between',
//         border: '1px solid gray',
//         width: 'auto',
//       }}
//     >
//       <Select
//         id="sort"
//         style={{
//           border: 'none',
//         }}
//       >
//         <option>Sắp xếp</option>
//         <option>Học phí cao nhất</option>
//         <option>Học phí thấp nhất</option>
//         <option>Đánh giá cao nhất</option>
//         <option>Đánh giá thấp nhất</option>
//       </Select>
//     </div>
//   );
// }

import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const names = [
  'Học phí cao nhất',
  'Học phí thấp nhất',
  'Đánh giá cao nhất',
  'Đánh giá thấp nhất',
];

export default function SortButton() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
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
        sx={{m: 1, width: '100%', height: 45, borderRadius: 24}}
        size="small"
      >
        <InputLabel id="demo-multiple-checkbox-label">Sắp xếp</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Sắp xếp" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          size="small"
          sx={{borderRadius: 24, height: 45}}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
