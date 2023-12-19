import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { isEmptyObject } from "../../../utils/dataHelper";
import "../css/SearchBar.css";
import FilterBar from "./FilterBar";

export default function SearchBar({ onSearch, resetSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({});
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const ref = setTimeout(() => {
      if (searchInput.trim() !== "" || !isEmptyObject(filters)) {
        onSearch(searchInput, filters);
      } else {
        resetSearch();
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
    console.log("TYPE", type, value);
    switch (type) {
      case "skill": {
        setFilters(() => ({ ...filters, skill: value }));
        break;
      }
      case "price": {
        setFilters(() => ({
          ...filters,
          minValue: value.min,
          maxValue: value.max,
        }));
        break;
      }

      default:
        console.log("value is invalid");
    }
  };
  console.log("filters", filters);
  useEffect(() => {
    if (isEmptyObject(filters)) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [filters]);
  const clearAllFilters = () => {
    setFilters(() => ({}));
  };
  return (
    <Container style={{ marginTop: 12 }}>
      <Row>
        <Col sm={6}>
          <Form className="d-flex">
            <InputGroup>
              <FormControl
                onChange={handleSearchInputChange}
                type="search"
                value={searchInput}
                placeholder="Search"
                className="me-2 search-input"
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      ></FilterBar>
      <div
        style={{
          marginTop: 8,
          height: 30,
          marginLeft: 50,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          width: "auto",
        }}
        className="button-effect"
        onClick={clearAllFilters}
      >
        {isShow && (
          <>
            <AiFillCloseCircle fontSize={24}></AiFillCloseCircle>
            <p style={{ fontWeight: "500", margin: 0, marginLeft: 8 }}>
              Xoá tất cả bộ lọc
            </p>
          </>
        )}
      </div>
    </Container>
  );
}
