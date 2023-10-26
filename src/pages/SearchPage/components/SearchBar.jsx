import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "../css/SearchBar.css";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import FilterBar from "./FilterBar";

export default function SearchBar({}) {
  const [searchInput, setSearchInput] = useState("");

  const timeoutRef = useRef();
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef);
    }

    if (searchInput.trim() === "") {
      // resetList();
    } else {
      const newTimeout = setTimeout(() => {
        // search(searchInput);
        console.log("SEARCH");
      }, 500);
      timeoutRef.current = newTimeout;
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchInput]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const clearAllFilters = () => {
    console.log("clicked");
  };
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

      <FilterBar></FilterBar>
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
