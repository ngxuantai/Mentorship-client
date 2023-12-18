import { Container, Row } from "react-bootstrap";

import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import ReactSlider from "react-slider";
import FilterButton from "./FilterButton";
export default function FilterBar({ onFilterChange }) {
  const [searchInput, setSearchInput] = useState("");
  return (
    <Container style={{}} className="mt-5">
      <Row
        style={{
          marginTop: 8,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          width: "auto",
        }}
      >
        <FilterButton></FilterButton>
        <PriceFilterButton></PriceFilterButton>
      </Row>
    </Container>
  );
}

function PriceFilterButton({}) {
  const [searchInput, setSearchInput] = useState("");
  const [selectedItem, setSelectedItem] = useState("Select price");
  const [showOptions, setShowOptions] = useState(false);
  const [isOptionListHovered, setOptionListHovered] = useState(false);
  const filterOptionListRef = useRef(null);
  const timeoutRef = useRef();

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
        minWidth: 150,
        marginRight: 24,
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        paddingRight: 18,
        paddingLeft: 18,
        position: "relative",
        borderRadius: 24,
        justifyContent: "space-between",
        border: "1px solid gray",
        width: "auto",
      }}
      className={`${!isOptionListHovered ? "button-effect" : ""}`}
      onClick={showMenuOption}
    >
      <p style={{ margin: 0, marginRight: 8, fontWeight: "bold" }}>
        {selectedItem}
      </p>
      <BsChevronDown fontSize={16}></BsChevronDown>
      {showOptions && <PriceSlider></PriceSlider>}
    </div>
  );
}

const PriceSlider = () => {
  const [value, setValue] = useState([0, 100]);

  return (
    <div
      style={{
        width: "300px",
        height: "25px",
        position: "absolute",
        // backgroundColor: "gray",
        top: "100%",
        marginTop: 12,
        // padding: 24,
        borderRadius: "4px",

        border: "1px solid gray",

        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        defaultValue={[0, 2000]}
        style={{ width: "100px" }}
        ariaLabel={["Leftmost thumb", "Rightmost thumb"]}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        pearling
        minDistance={10}
      />
    </div>
  );
};
