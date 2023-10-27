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
import { BsChevronDown } from "react-icons/bs";
import FilterOptionList from "./FilterOptionList";

export default function FilterButton({}) {
  const [searchInput, setSearchInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const filterOptionListRef = useRef(null);
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
  const clearAllFilters = (e) => {
    console.log("clicked");
    e.stopPropagation();
  };
  const showMenuOption = () => {
    setShowOptions(!showOptions);
  };

  const closeOptionsOnClickOutside = (e) => {
    console.log("filterOptionListRef", e.target, filterOptionListRef.current);
    if (
      filterOptionListRef.current &&
      !filterOptionListRef.current.contains(e.target)
    ) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", closeOptionsOnClickOutside);
    return () => {
      document.removeEventListener("mousedown", closeOptionsOnClickOutside);
    };
  }, []);
  return (
    <div
      style={{
        marginRight: 24,
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingRight: 18,
        paddingLeft: 18,
        position: "relative",
        borderRadius: 24,
        justifyContent: "start",
        border: "1px solid gray",
        width: "auto",
      }}
      className="button-effect"
      onClick={showMenuOption}
    >
      <p style={{ margin: 0, marginRight: 8, fontWeight: "bold" }}>
        Filter name
      </p>
      <BsChevronDown fontSize={16}></BsChevronDown>
      {showOptions && (
        <FilterOptionList forwardRef={filterOptionListRef}> </FilterOptionList>
      )}
    </div>
  );
}
