import { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import FilterOptionList from "./FilterOptionList";
export default function FilterButton({ filters, onFilterChange }) {
  const [searchInput, setSearchInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isOptionListHovered, setOptionListHovered] = useState(false);
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
        {filters.skill?.name || "Kĩ năng"}
      </p>
      <BsChevronDown fontSize={16}></BsChevronDown>
      {showOptions && (
        <FilterOptionList
          onSelected={(item) => {
            onFilterChange("skill", item);
          }}
          setShowOptions={setShowOptions}
          setOptionListHovered={setOptionListHovered}
          forwardRef={filterOptionListRef}
        ></FilterOptionList>
      )}
    </div>
  );
}
