import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SkillTag } from "../../components/Tags";
import { Row, Col, Container, Button } from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import MentorItem from "./components/MentorItem";
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled(Container)`
  border-radius: 24px;
  border-color: gray;
  padding: 24px;
  margin: 12px;
  width: 80%;
`;

const Text = styled.p`
  border-bottom: 1px solid gray;
`;

function Search() {
  return (
    <StyledContainer fluid>
      <Row className="justify-content-between align-items-start">
        <SearchBar></SearchBar>
        <MentorItem></MentorItem>
      </Row>
    </StyledContainer>
  );
}

export default Search;
