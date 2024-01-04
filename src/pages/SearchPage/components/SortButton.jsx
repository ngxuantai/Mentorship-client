// import * as React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import ListSubheader from '@mui/material/ListSubheader';

// const ITEM_HEIGHT = 44;
// const ITEM_PADDING_TOP = 6;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const listSort = [
//   {
//     id: 1,
//     name: 'Học phí cao nhất',
//     value: 'maxPrice',
//   },
//   {
//     id: 2,
//     name: 'Học phí thấp nhất',
//     value: 'minPrice',
//   },
//   {
//     id: 3,
//     name: 'Đánh giá cao nhất',
//     value: 'maxRating',
//   },
//   {
//     id: 4,
//     name: 'Đánh giá thấp nhất',
//     value: 'minRating',
//   },
// ];

// export default function SortButton({setSortBy}) {
//   const [sortName, setSortName] = React.useState([]);
//   const [sortId, setSortId] = React.useState([]);

//   const handleChange = (event) => {
//     const {
//       target: {value},
//     } = event;
//     setSortName(typeof value === 'string' ? value.split(',') : value);
//   };

//   const handleClick = (sort) => {
//     setSortBy(sort.id);
//   };

//   return (
//     <div
//       style={{
//         minWidth: 150,
//         width: 300,
//         maxWidth: 300,
//       }}
//     >
//       <FormControl
//         sx={{m: 1, width: '100%', height: 45, borderRadius: 24}}
//         size="small"
//       >
//         <InputLabel id="demo-multiple-checkbox-label">Sắp xếp</InputLabel>
//         <Select
//           labelId="demo-multiple-checkbox-label"
//           multiple
//           value={sortName}
//           onChange={handleChange}
//           input={<OutlinedInput label="Sắp xếp" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//           size="small"
//           sx={{borderRadius: 24, height: 45}}
//         >
//           {listSort.map((sort) => (
//             <MenuItem
//               key={sort.id}
//               value={sort.name}
//               onClick={() => handleClick(sort)}
//             >
//               <Checkbox checked={sortName.indexOf(sort.name) > -1} />
//               <ListItemText primary={sort.name} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
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
import ListSubheader from '@mui/material/ListSubheader';

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

const listSort = [
  {
    id: 1,
    name: 'Học phí cao nhất',
  },
  {
    id: 2,
    name: 'Học phí thấp nhất',
  },
  {
    id: 3,
    name: 'Đánh giá cao nhất',
  },
  {
    id: 4,
    name: 'Đánh giá thấp nhất',
  },
];

export default function SortButton({setSortBy}) {
  const [sortName, setSortName] = React.useState('');

  const handleSortChange = (event) => {
    setSortName(event.target.value);
  };

  const handleCopyClick = (sort) => {
    setSortBy(sort.id);
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
          value={sortName}
          input={<OutlinedInput label="Sắp xếp" />}
          onChange={handleSortChange}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
          size="small"
          sx={{borderRadius: 24, height: 45}}
        >
          {listSort.map((sort) => (
            <MenuItem
              key={sort.id}
              value={sort.name}
              onClick={() => handleCopyClick(sort)}
            >
              <Checkbox checked={sortName === sort.name} />
              <ListItemText primary={sort.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
