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

export default function SearchBar({text, onSearch, resetSearch}) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(text || '');
  const [filters, setFilters] = useState({});
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const ref = setTimeout(() => {
      if (searchInput.trim() !== '' || !isEmptyObject(filters)) {
        onSearch(searchInput, filters);
        const queryParams = new URLSearchParams();
        if (searchInput.trim() !== '') {
          queryParams.append('text', searchInput);
        }
        if (filters.skill !== null) {
          queryParams.append('skill', filters.skill.name);
        }
        if (filters.minValue) {
          queryParams.append('minValue', filters.minValue);
        }
        if (filters.maxValue) {
          queryParams.append('maxValue', filters.maxValue);
        }
        navigate(`/mentor/search?${queryParams.toString()}`);
      } else {
        resetSearch();
        navigate('/mentor/search');
      }
    }, 500);
    return () => {
      clearTimeout(ref);
    };
  }, [searchInput, filters]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleFilterChange = (type, value) => {
    console.log('TYPE', type, value);
    switch (type) {
      case 'skill': {
        setFilters(() => ({...filters, skill: value}));
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
      <div>
        <Col sm={7}>
          <Form className="d-flex" style={{height: '45px'}}>
            <InputGroup>
              <FormControl
                onChange={handleSearchInputChange}
                type="search"
                value={searchInput}
                placeholder="Search"
                className=" search-input"
              />
            </InputGroup>
          </Form>
        </Col>
      </div>

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
