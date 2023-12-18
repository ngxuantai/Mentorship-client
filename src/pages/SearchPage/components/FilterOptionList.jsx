import { useEffect, useRef, useState } from "react";
import { Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import FilterOptionItem from "./FilterOptionItem";

export default function FilterOptionList({
  forwardRef,
  setShowOptions,
  setSelectedItem,
  setOptionListHovered,
}) {
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
  const onItemClick = (item) => {
    setSelectedItem(item);
    setShowOptions(false);
  };
  return (
    <Container
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => {
        setOptionListHovered(true);
      }}
      onMouseLeave={() => {
        setOptionListHovered(false);
      }}
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
              className="search-input"
            />
          </InputGroup>
        </Form>
      </Row>
      <Row style={{ display: "flex", marginTop: 12 }}>
        <FilterOptionItem onItemClick={onItemClick}></FilterOptionItem>
      </Row>
    </Container>
  );
}
