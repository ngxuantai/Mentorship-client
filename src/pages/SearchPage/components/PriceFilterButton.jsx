import React, {useEffect, useState} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import {set} from 'date-fns';

const minDistance = 1;

export default function FilterButton({filters, onFilterChange}) {
  const [personName, setPersonName] = useState([]);
  const [skills, setSkills] = useState([]);
  const [value, setValue] = useState([1, 4]);
  const [price, setPrice] = useState([]);

  useEffect(() => {}, []);

  function valuetext(value) {
    return `${value * 100000}`;
  }

  const handleChange = (event) => {
    const {
      target: {value, key},
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const handlePriceChange = (event, newValue) => {
    setValue(newValue);
    setPrice([newValue[0] * 100000, newValue[1] * 100000]);
    onFilterChange('price', {
      min: newValue[0] * 100000,
      max: newValue[1] * 100000,
    });
    console.log('price', price);
  };

  useEffect(() => {
    console.log(price);
  }, [price]);

  return (
    <div
      style={{
        minWidth: 150,
        width: 180,
        maxWidth: 400,
      }}
    >
      <FormControl
        sx={{width: '100%', height: 45, borderRadius: 24}}
        size="small"
      >
        <InputLabel id="demo-multiple-checkbox-label">Học phí</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          value={price}
          //onChange={handleChange}
          input={<OutlinedInput label="Học phí" />}
          renderValue={(price) => price.join(' - ')}
          size="small"
          sx={{borderRadius: 24, height: 45}}
        >
          <Box className="w-[400px] h-[100px] flex justify-center items-center py-2 px-3">
            <span className="mx-3">100.000</span>
            <Slider
              getAriaLabel={() => 'Minimum distance'}
              valueLabelFormat={valuetext}
              valueLabelDisplay="auto"
              disableSwap
              value={value}
              onChange={handlePriceChange}
              step={1}
              min={1}
              max={5}
              marks
            />
            <span className="mx-3">500.000</span>
          </Box>
        </Select>
      </FormControl>
    </div>
  );
}
