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
