import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Container, Button } from "react-bootstrap";
import { SkillTag } from "../../../../components/Tags";
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled(Container)`
  border: 1px solid white;
  border-radius: 24px;
  align-items: center;
  border-color: gray;
  padding: 12px;
  overflow: hidden;
  margin: 24px 12px;
  width: 50%;
  background-color: white;
`;

function RecommendItem() {
  return (
    <StyledContainer fluid>
      <Row className=" align-items-start">
        <Col md={3}>
          <img
            style={{ borderRadius: 50, width: 100, height: 100 }}
            src="https://picsum.photos/200"
            alt="random image"
          ></img>
        </Col>
        <Col
          style={{ flex: 1 }}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Row
            style={{
              borderBottom: 1,
              display: "flex",
              textAlign: "left",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <h4>Ahmed Sadman Muhib </h4>
              <h4>$100/m</h4>
            </div>
            <p>Software Engineer at Optimizely</p>
            <p>
              Software Engineer | Lead Instructor | Career Mentor | Helped 100+
              learners to achieve their goals
            </p>
          </Row>
          <Row></Row>
          <Col style={{ alignSelf: "flex-start", marginBottom: 20 }}>
            <SkillTag>React</SkillTag>
            <SkillTag>Java</SkillTag>
            <SkillTag>.NET</SkillTag>
          </Col>
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default RecommendItem;
