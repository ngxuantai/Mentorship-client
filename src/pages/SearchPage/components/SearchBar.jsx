import {useEffect, useState} from 'react';
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';
import {AiFillCloseCircle} from 'react-icons/ai';
import {isEmptyObject} from '../../../utils/dataHelper';
import '../css/SearchBar.css';
import FilterBar from './FilterBar';
import {useNavigate} from 'react-router-dom';
import {
  Paper,
  IconButton,
  InputBase,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {TextInput} from 'flowbite-react';

export default function SearchBar({text, skill, onSearch, resetSearch}) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(text || '');
  const [filters, setFilters] = useState({});
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (searchInput.trim() !== '' || !isEmptyObject(filters)) {
      const queryParams = new URLSearchParams();
      if (searchInput.trim() !== '') {
        queryParams.append('name', searchInput);
      }
      if (filters.skill && filters.skill.length !== 0) {
        const skillString = filters.skill.map((skill) => skill.name).join('%');
        queryParams.append('skill', skillString);
      }
      if (filters.minValue) {
        queryParams.append('minValue', filters.minValue);
      }
      if (filters.maxValue) {
        queryParams.append('maxValue', filters.maxValue);
      }
      navigate(`/mentor/search?${queryParams.toString()}`);
      // onSearch(searchInput, filters);
    } else {
      resetSearch();
      navigate('/mentor/search');
    }
  }, [searchInput, filters]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFilterChange = (type, value) => {
    console.log('TYPE', type, value);
    switch (type) {
      case 'skill': {
        const isSkillExist = filters.skill?.some(
          (skill) => skill.id === value.id
        );
        if (isSkillExist) {
          const skillArray = filters.skill.filter(
            (skill) => skill.id !== value.id
          );
          setFilters(() => ({...filters, skill: skillArray}));
          return;
        }
        const skillArray = Array.isArray(filters.skill)
          ? [...filters.skill, value]
          : [value];
        setFilters(() => ({...filters, skill: skillArray}));
        break;
      }
      case 'price': {
        setFilters(() => ({
          ...filters,
          minValue: value.min,
          maxValue: value.max,
        }));
        break;
      }

      default:
        console.log('value is invalid');
    }
  };

  useEffect(() => {
    if (isEmptyObject(filters)) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [filters]);
  const clearAllFilters = () => {
    setFilters(() => ({}));
    setSearchInput('');
    navigate('/mentor/search');
  };
  return (
    <Container
      style={{
        marginTop: '24px',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <Col sm={7}>
        <Form
          className="d-flex"
          style={{width: '100%', height: '45px', borderRadius: '24px'}}
        >
          <InputGroup>
            <FormControl
              onChange={handleSearchInputChange}
              type="search"
              value={searchInput}
              placeholder="Search"
              className=" search-input"
              onSubmit={() => handleSearchInputChange}
              bsPrefix="custom-form-control" // Set a custom prefix
              style={{
                width: '100%',
                borderRadius: '24px',
                '&:focus': {
                  boxShadow: 'none',
                },
              }}
            />
          </InputGroup>
        </Form>
      </Col>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      ></FilterBar>
      <div
        style={{
          height: 30,
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          width: 'auto',
          marginBottom: 12,
        }}
        // className="button-effect"
        onClick={clearAllFilters}
      >
        {isShow && (
          <>
            <AiFillCloseCircle fontSize={24}></AiFillCloseCircle>
            <p style={{fontWeight: '500', margin: 0, marginLeft: 8}}>
              Xoá tất cả bộ lọc
            </p>
          </>
        )}
      </div>
    </Container>
  );
}
