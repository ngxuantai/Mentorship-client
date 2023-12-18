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
import "../css/SearchBar.css";
import FilterBar from "./FilterBar";

export default function SearchBar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const ref = setTimeout(() => {
      if (searchInput.trim() !== "") {
        onSearch(searchInput, filters);
      } else {
        onSearch("");
      }
    }, 500);
    return () => {
      clearTimeout(ref);
    };
  }, [searchInput, filters]);
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleFilterChange = ({ type, filter }) => {
    switch (type) {
      case "skill": {
        setFilters({ ...filters, skill: filter });
        break;
      }
      case "price": {
        setFilters({ ...filters, price: filter });
        break;
      }
      default:
        console.log("filter is invalid");
    }
  };

  const clearAllFilters = () => {};
  return (
    <Container style={{}}>
      <Row>
        <Col sm={4}>
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

      <FilterBar onFilterChange={handleFilterChange}></FilterBar>
      <div
        style={{
          marginTop: 8,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          width: "auto",
        }}
        className="button-effect"
        onClick={clearAllFilters}
      >
        <AiFillCloseCircle fontSize={24}></AiFillCloseCircle>
        <p style={{ margin: 0, marginLeft: 8 }}>Reset all filters</p>
      </div>
    </Container>
  );
}
