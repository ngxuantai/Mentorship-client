import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";
import styled from "styled-components";
import RecommendItem from "./RecommendItem";
const Container = styled.div`
  background-color: tomato;
  padding: 0px 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 500px;
  width: 100%;
  height: 500;
`;
function RecommendList() {
  return (
    <Container>
      <h3>Recommended for you</h3>
      <Carousel
        style={{
          width: "100%",
          height: "auto",
          paddingBottom: 24,
          backgroundColor: "tomato",
        }}
      >
        <Carousel.Item>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <RecommendItem></RecommendItem>
            <RecommendItem></RecommendItem>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <RecommendItem></RecommendItem>
            <RecommendItem></RecommendItem>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <RecommendItem></RecommendItem>
            <RecommendItem></RecommendItem>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default RecommendList;
