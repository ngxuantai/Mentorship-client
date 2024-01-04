import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col, Container, Button } from "react-bootstrap";
import { SkillTag } from "../../../../components/Tags";
import moneyConverter from '../../../../utils/moneyConverter'
import { useNavigate } from "react-router-dom";
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
  height: 250px;
  min-height: 250px;
  max-height: 250px;
  cursor: pointer;
`;

function RecommendItem({mentor}) {
  const [lowestPrice, setLowestPrice] = useState('');
  const [intro, setIntro] = useState('');
  const navigate = useNavigate();
  const maxLength = 100;

  useEffect(() => {
    const getValue = async () => {
      setLowestPrice(moneyConverter(mentor.price));
      
      const truncatedContent = await mentor.introduction.length > maxLength
      ? `${mentor.introduction.slice(0, maxLength)}...`
      : mentor.introduction;

      setIntro(truncatedContent);

    };
    getValue();
  }, [mentor]);

  const displaySkills = mentor.skills.slice(0, 3); // Display up to 3 skills
  const remainingSkillsCount = mentor.skills.length - 3;

  return (
    <StyledContainer fluid onClick={() => navigate(`/mentor/profile/${mentor.id}`)}>
      <Row className=" align-items-start">
        <Col md={3}>
          <img
            style={{ borderRadius: 50, width: 100, height: 100 }}
            src={mentor.avatar}
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
              <h4 className="text-primary-900 font-extrabold">{mentor.firstName} {mentor.lastName}</h4>
              <h4>{lowestPrice}</h4>
            </div>
            <p className=" font-bold">{mentor.jobTitle}</p>
            <hr className="opacity-20"></hr>
            <div className="overflow-hidden max-h-[50px] mb-3">
              <p className="">{intro}</p>
            </div>
          </Row>
          <Row></Row>
          <Col style={{ alignSelf: "flex-start", marginBottom: 20 }}>
            {displaySkills.map((skill) => (
              <SkillTag key={skill.id} className="mr-2">
                {skill.name}
              </SkillTag>
            ))}
            {remainingSkillsCount > 0 && (
              <SkillTag className="mr-2">
                +{remainingSkillsCount}
              </SkillTag>
            )}
          </Col>
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default RecommendItem;
