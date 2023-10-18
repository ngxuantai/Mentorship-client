import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SkillTag } from "../../../components/Tags";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled(Container)`
  border: 1px solid black;
  border-radius: 24px;
  border-color: gray;
  padding: 24px;
  margin: 12px;
  width: 80%;
`;

const Text = styled.p`
  border-bottom: 1px solid gray;
`;

function MentorItem() {
  return (
    <StyledContainer fluid>
      <Row className="justify-content-between align-items-start">
        <Col>
          <img
            style={{ borderRadius: 12 }}
            src="https://picsum.photos/200"
            alt="random image"
          ></img>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Row style={{ borderBottom: 1 }}>
            <h2>Ahmed Sadman Muhib</h2>
            <p>Software Engineer at Optimizely</p>
            <p>
              Software Engineer | Lead Instructor | Career Mentor | Helped 100+
              learners to achieve their goals
            </p>
            <p>* * * * * 5.0 (38 reviews)</p>
          </Row>
          <Row>
            <p>
              Hello there! I'm Muhib, a seasoned Software Engineer and former
              Lead Instructor at a top coding boot camp. Over the years, I've
              personally helped over 40 students achieve their goals and build
              successful careers in tech. I specialize in Full-Stack JavaScript
              and Python development. With my expertise, I'm prepared to …
            </p>
          </Row>
          <Col style={{ alignSelf: "flex-start", marginBottom: 20 }}>
            <SkillTag>React</SkillTag>
            <SkillTag>Java</SkillTag>
            <SkillTag>.NET</SkillTag>
          </Col>
          <Button
            variant="secondary" // Chọn biến thể màu xám
            style={{
              fontWeight: "bold", // Độ đậm của chữ
              borderRadius: "4px", // Độ cong của góc
              textAlign: "center", // Căn giữa theo chiều ngang
              alignSelf: "flex-start",
            }}
          >
            View Profile
          </Button>
        </Col>
        <Col className="d-flex justify-content-end align-items-center flex-column">
          <SkillTag style={{ alignSelf: "flex-end" }}>React</SkillTag>
          <Text> What can I expect from this mentor?</Text>
          <Text>
            {" "}
            Unlimited chat, e-mail or text with mentor, within boundaries.
          </Text>
          <Text>Weekly calls, per agreement with mentor</Text>
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default MentorItem;
