import { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import styled from "styled-components";
import mentorApi from "../../api/mentor";
import skillApi from "../../api/skill";
import MentorItem from "./components/MentorItem";
import SearchBar from "./components/SearchBar";
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled(Container)`
  border-radius: 24px;
  border-color: gray;
  align-self: center;
  padding: 24px;
  width: 100%;
`;

const Text = styled.p`
  border-bottom: 1px solid gray;
`;

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [skills, setSkills] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const skillId = queryParams.get("skillId");
  const handleSearch = useCallback(async (searchInput, filters) => {
    const mentors = await mentorApi.searchMentor(searchInput, filters);
    setSearchResult(mentors || []);
  }, []);
  const resetSearch = async () => {
    const mentors = await mentorApi.searchMentor("", {});
    setSearchResult(mentors);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const allSkills = await skillApi.getAllSkills();
      setSkills(allSkills);
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (skillId) {
      handleSearch("", { skillId });
    }
  }, []);
  return (
    <>
      <StyledContainer fluid>
        <Row className="justify-content-between align-items-start">
          <h1
            style={{
              textAlign: "center",
              width: "100%",
              captionSideolor: "gray",
            }}
          >
            Tìm kiếm Mentor
          </h1>
          <SearchBar
            resetSearch={resetSearch}
            onSearch={handleSearch}
          ></SearchBar>
          <div
            style={{
              width: "100%",
              height: 1,
              opacity: 0.5,
              marginBottom: 12,
              backgroundColor: "gray",
            }}
          ></div>
          <h5
            style={{
              textAlign: "left",
              marginLeft: "auto",
              width: "100%",
            }}
          >
            Tìm thấy {searchResult.length} mentor
          </h5>
          {searchResult.map((mentor, index) => {
            const mentorSkills = skills.filter((skill) =>
              mentor.skillIds.includes(skill.id)
            );
            console.log("skills", skills, mentorSkills);

            return (
              <MentorItem
                key={index}
                mentor={{ ...mentor, skills: mentorSkills }}
              />
            );
          })}
        </Row>
      </StyledContainer>
    </>
  );
}

export default Search;
