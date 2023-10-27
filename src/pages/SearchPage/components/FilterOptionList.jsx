import {
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import FilterBar from "./FilterBar";

export default function FilterOptionList({ forwardRef }) {
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
    <Container
      onClick={(e) => e.stopPropagation()}
      ref={forwardRef}
      style={{
        minWidth: 200,
        position: "absolute",
        maxHeight: 600,
        top: "100%",
        border: "1px solid rgb(236, 236, 236)",
        borderRadius: 4,
        marginTop: 10,
        left: 0,
        padding: 12,
        backgroundColor: "white",
      }}
    >
      <Row>
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
      </Row>
      <Row style={{ display: "inline-flex" }}>
        <p style={{ backgroundColor: "gray" }}>Skill 1 </p>
        <p>Skill 2 </p>
      </Row>
    </Container>
  );
}
