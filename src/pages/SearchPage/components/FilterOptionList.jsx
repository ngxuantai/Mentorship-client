import { useEffect, useRef, useState } from "react";
import { Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import skillApi from "../../../api/skill";

export default function FilterOptionList({
  forwardRef,
  setShowOptions,
  onSelected,
  setOptionListHovered,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [skills, setSkills] = useState([]);
  const skillList = useRef([]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onItemClick = (skill) => {
    onSelected(skill);
    setShowOptions(false);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const allSkills = await skillApi.getAllSkills();
      setSkills(allSkills);
      skillList.current = allSkills;
    };

    fetchSkills();
  }, []);
  useEffect(() => {
    const newTimeout = setTimeout(() => {
      // search(searchInput);
      if (searchInput) {
        const res = skills.filter((skill) =>
          skill.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSkills(res);
      } else {
        setSkills(skillList.current);
      }
    }, 500);

    return () => {
      if (newTimeout) {
        clearTimeout(newTimeout);
      }
    };
  }, [searchInput]);

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
      <Row
        style={{
          display: "flex",
          marginTop: 12,
          maxHeight: 130,
          overflowY: "auto",
        }}
      >
        {skills.map((skill) => (
          <FilterOptionItem
            key={skill.id}
            skill={skill}
            onItemClick={onItemClick}
          />
        ))}
      </Row>
    </Container>
  );
}
function FilterOptionItem({ skill, onItemClick }) {
  return (
    <div
      onClick={() => onItemClick(skill)}
      style={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "start",
        width: "100%",
      }}
      onMouseOver={(e) => e.stopPropagation()}
      className="button-effect"
    >
      <p style={{ margin: 0 }}>{skill.name} </p>
    </div>
  );
}
