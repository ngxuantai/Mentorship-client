import {Container, Row} from 'react-bootstrap';

import {useEffect, useRef, useState} from 'react';
import {BsChevronDown} from 'react-icons/bs';
import {MAX_PRICE, MIN_PRICE} from '../../../constants';
import '../css/Slider.css';
import FilterButton from './SkillFilterButton';
import SortButton from './SortButton';
import PriceFilterButton from './PriceFilterButton';

export default function FilterBar({filters, onFilterChange}) {
  return (
    <div
      style={{
        marginTop: 8,
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'start',
        width: 'auto',
      }}
    >
      <FilterButton
        filters={filters}
        onFilterChange={onFilterChange}
      ></FilterButton>

      <PriceFilterButton />

      <SortButton />
    </div>
  );
}

// function PriceFilterButton({
//   minValue = MIN_PRICE,
//   maxValue = MAX_PRICE,
//   onFilterChange,
// }) {
//   const [searchInput, setSearchInput] = useState('');
//   const [showOptions, setShowOptions] = useState(false);
//   const [isOptionListHovered, setOptionListHovered] = useState(false);
//   const filterOptionListRef = useRef(null);

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
//   const handleOnChange = (min, max) => {
//     onFilterChange('price', {min, max});
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
//         position: 'relative',
//         borderRadius: 24,
//         justifyContent: 'space-between',
//         border: '1px solid gray',
//         width: 'auto',
//       }}
//       className={`${!isOptionListHovered ? 'button-effect' : ''}`}
//       onClick={showMenuOption}
//     >
//       <p style={{margin: 0, marginRight: 8, fontWeight: 'bold'}}>Giá tiền</p>
//       <BsChevronDown fontSize={16}></BsChevronDown>
//       {showOptions && (
//         <PriceSlider
//           minPrice={minValue}
//           maxPrice={maxValue}
//           onChange={handleOnChange}
//         ></PriceSlider>
//       )}
//     </div>
//   );
// }

// const PriceSlider = ({onChange, minPrice, maxPrice}) => {
//   const [value, setValue] = useState([0, 100]);
//   const handleSliderChange = (newValue) => {
//     onChange(newValue[0], newValue[1]);
//   };
//   return (
//     <div
//       style={{
//         width: '300px',
//         height: '25px',
//         position: 'absolute',
//         // backgroundColor: "gray",
//         top: '100%',
//         marginTop: 12,
//         padding: 24,
//         borderRadius: '4px',

//         border: '1px solid gray',

//         // display: "flex",
//         // alignItems: "center",
//         // justifyContent: "center",
//       }}
//     >
//       <RangeSlider
//         minPrice={minPrice}
//         maxPrice={maxPrice}
//         handleSliderChange={handleSliderChange}
//       ></RangeSlider>
//     </div>
//   );
// };

// import {Slider as BaseSlider, sliderClasses} from '@mui/base/Slider';
// import {alpha, Box, styled} from '@mui/system';
// function RangeSlider({minPrice, maxPrice, handleSliderChange}) {
//   const handleChange = (event, newValue) => {
//     console.log('handleChange', newValue);
//     handleSliderChange(newValue);
//   };

//   return (
//     <Box sx={{width: 300}}>
//       {/* controlled: */}
//       <Slider
//         value={[minPrice, maxPrice]}
//         onChange={handleChange}
//         getAriaLabel={() => 'Temperature range'}
//         getAriaValueText={valuetext}
//         min={0}
//         max={1000}
//       />
//     </Box>
//   );
// }

// function valuetext(value) {
//   return `${value}°C`;
// }

// const blue = {
//   100: '#DAECFF',
//   200: '#99CCF3',
//   400: '#3399FF',
//   300: '#66B2FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B3',
//   900: '#003A75',
// };

// const grey = {
//   50: '#F3F6F9',
//   100: '#E5EAF2',
//   200: '#DAE2ED',
//   300: '#C7D0DD',
//   400: '#B0B8C4',
//   500: '#9DA8B7',
//   600: '#6B7A90',
//   700: '#434D5B',
//   800: '#303740',
//   900: '#1C2025',
// };

// const Slider = styled(BaseSlider)(
//   ({theme}) => `
//   color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
//   height: 6px;
//   width: 100%;
//   padding: 16px 0;
//   display: inline-block;
//   position: relative;
//   cursor: pointer;
//   touch-action: none;
//   -webkit-tap-highlight-color: transparent;

//   &.${sliderClasses.disabled} {
//     pointer-events: none;
//     cursor: default;
//     color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
//     opacity: 0.5;
//   }

//   & .${sliderClasses.rail} {
//     display: block;
//     position: absolute;
//     width: 100%;
//     height: 4px;
//     border-radius: 2px;
//     background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
//   }

//   & .${sliderClasses.track} {
//     display: block;
//     position: absolute;
//     height: 4px;
//     border-radius: 2px;
//     background-color: currentColor;
//   }

//   & .${sliderClasses.thumb} {
//     position: absolute;
//     width: 16px;
//     height: 16px;
//     margin-left: -6px;
//     margin-top: -6px;
//     box-sizing: border-box;
//     border-radius: 50%;
//     outline: 0;
//     border: 3px solid currentColor;
//     background-color: #fff;

//     &:hover{
//       box-shadow: 0 0 0 4px ${alpha(
//         theme.palette.mode === 'light' ? blue[200] : blue[300],
//         0.3
//       )};
//     }

//     &.${sliderClasses.focusVisible} {
//       box-shadow: 0 0 0 4px ${
//         theme.palette.mode === 'dark' ? blue[700] : blue[200]
//       };
//       outline: none;
//     }

//     &.${sliderClasses.active} {
//       box-shadow: 0 0 0 5px ${alpha(
//         theme.palette.mode === 'light' ? blue[200] : blue[300],
//         0.5
//       )};
//       outline: none;
//     }
//   }

//   & .${sliderClasses.mark} {
//     position: absolute;
//     width: 4px;
//     height: 4px;
//     border-radius: 2px;
//     background-color: currentColor;
//     top: 50%;
//     opacity: 0.7;
//     transform: translateX(-50%);
//   }

//   & .${sliderClasses.markActive} {
//     background-color: #fff;
//   }
// `
// );
