import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { SkillTag } from "../../../components/Tags";
import firebaseInstance from "../../../services/firebase";
import { useUserStore } from "../../../store/userStore";
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled(Container)`
  border: 1px solid black;
  border-radius: 24px;
  border-color: gray;
  padding: 24px;
  width: 80%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  border-bottom: 1px solid gray;
`;

function MentorItem({ mentor }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();
  const { user } = useUserStore();
  // const { wishlist } = useWishlistStore();

  const handleNavigateToProfile = () => {
    navigate(`/mentor/profile/${mentor.id}`);
  };

  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeWishlistChanges(
        user.id,
        (wishlist) => {
          if (wishlist) {
            setIsFavourite(wishlist.includes(mentor.id));
          } else {
            setIsFavourite(false);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [user]);
  const handleAddToWishList = async () => {
    try {
      await firebaseInstance.toggleWishlist(user.id, mentor.id);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  return (
    <StyledContainer fluid>
      <Row className="justify-content-between align-items-start">
        <Col>
          <img
            style={{ borderRadius: 12 }}
            src={mentor.avatar || "https://picsum.photos/200/300"}
            alt="random image"
          ></img>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <Row style={{ borderBottom: 1 }}>
            <h2>
              {mentor.firstName} {mentor.lastName}
            </h2>
            <p>{mentor.jobTitle}</p>
            <p>{mentor.introduction || ""}</p>
            <p>* * * * * {mentor.rating} (38 reviews)</p>
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
            {mentor.skills.map((skill) => (
              <SkillTag key={skill.id}>{skill.name}</SkillTag>
            ))}
          </Col>
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <Button
              onClick={handleNavigateToProfile}
              variant="secondary"
              style={{
                fontWeight: "bold",
                borderRadius: "4px",
                textAlign: "center",
                marginRight: 12,
              }}
            >
              Xem hồ sơ
            </Button>
            <Button
              onClick={handleAddToWishList}
              variant="secondary"
              style={{
                fontWeight: "bold",
                borderRadius: "4px",
                textAlign: "center",
                marginRight: 12,
              }}
            >
              <div
                style={{
                  display: "flex",

                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FaHeart
                  style={{
                    marginRight: 8,
                    color: isFavourite ? "tomato" : null,
                  }}
                ></FaHeart>{" "}
                {isFavourite ? "Đã thích" : "Yêu thích"}
              </div>
            </Button>
          </div>
        </Col>
        <Col className="d-flex justify-content-end align-items-center flex-column">
          <SkillTag style={{ alignSelf: "flex-end" }}>
            7 ngày học thử miễn phí
          </SkillTag>
          <Text> What can I expect from this mentor?</Text>
          <Text>
            Unlimited chat, e-mail or text with mentor, within boundaries.
          </Text>
          <Text>Weekly calls, per agreement with mentor</Text>
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default MentorItem;
