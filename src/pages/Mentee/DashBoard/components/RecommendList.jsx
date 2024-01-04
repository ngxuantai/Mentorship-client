import Carousel from "react-bootstrap/Carousel";
import {useEffect, useState} from 'react';
// import ExampleCarouselImage from "components/ExampleCarouselImage";
import styled from "styled-components";
import RecommendItem from "./RecommendItem";
import skillApi from "../../../../api/skill";
import mentorApi from "../../../../api/mentor";

const Container = styled.div`
  background-color: #1a91da;
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
  const [skills, setSkills] = useState([]);
  const [randomMentors, setRandomMentors] = useState([6]);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };


  useEffect(() => {
    const fetchSkills = async () => {
      const allSkills = await skillApi.getAllSkills();
      const allMentors = await mentorApi.getAllMentors(); 
      const shuffledMentors = shuffleArray(allMentors);
      setRandomMentors(shuffledMentors.slice(0, 6)); 
      setSkills(allSkills);
    };

    const fetchAllMentors = async () => {
      try {
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    //fetchAllMentors();
    fetchSkills();
  }, []);

  return (
    <Container>
      <h3 className=" text-white font-bold">Đề xuất cho bạn</h3>
      <Carousel
        style={{
          width: "100%",
          height: "auto",
          paddingBottom: 24,
          backgroundColor: "#1a91da",
        }}
      >
        {randomMentors.reduce((pairs, mentor, index) => {
          if (index % 2 === 0) {
            pairs.push(randomMentors.slice(index, index + 2));
          }
          return pairs;
        }, []).map((pair, pairIndex) => (
          <Carousel.Item key={pairIndex}>
            <div style={{ flexDirection: "row", display: "flex" }}>
              {pair.map((mentor, index) => {
                const mentorSkills = skills.filter((skill) =>
                  mentor.skillIds.includes(skill.id)
                );
                return (
                  <RecommendItem key={index}
                    mentor={{ ...mentor, skills: mentorSkills }}
                  ></RecommendItem>
                );
              })}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default RecommendList;
