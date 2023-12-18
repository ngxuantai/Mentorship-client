import { useCallback, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import mentorApi from "../../api/mentor";
import Header from "../Mentee/DashBoard/components/Header";
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

  const handleSearch = useCallback(async (searchInput, filters) => {
    console.log("searchInput", searchInput);
    const mentors = await mentorApi.searchMentor(searchInput);
    console.log("searchInput result", mentors);
    setSearchResult(mentors || []);
  }, []);
  return (
    <>
      <Header></Header>
      <StyledContainer fluid>
        <Row className="justify-content-between align-items-start">
          <SearchBar onSearch={handleSearch}></SearchBar>
          {searchResult.map((mentor, index) => (
            <MentorItem key={index} mentor={mentor} />
          ))}
        </Row>
      </StyledContainer>
    </>
  );
}

export default Search;
