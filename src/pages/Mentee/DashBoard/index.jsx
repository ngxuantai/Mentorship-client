import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecommendList from "./components/RecommendList";
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled.div`
  padding: 0;
  background-color: gray;
  align-items: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  border-bottom: 1px solid gray;
`;
const Content = styled.div`
  background-color: #f4f4f4;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  height: 500;
`;
function DashBoard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleNavigateToSearchScreen = () => {
    navigate("/mentor/search");
  };
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/");
    // }
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <StyledContainer fluid>
          <Content>
            <h2>Welcome, Khánh! Browse</h2>
            <p>
              Start connecting with mentors and get ready to take your career to
              the next level!
            </p>
            <Button
              onClick={handleNavigateToSearchScreen}
              variant="secondary"
              style={{
                fontWeight: "bold",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Find Mentor
            </Button>
          </Content>

          <RecommendList></RecommendList>
        </StyledContainer>
      )}
    </>
    //   {isLoading ? (<div></div>) :(
    //     <>
    //     <StyledContainer fluid>
    //     <Header></Header>

    //     <Content>
    //       <h2>Welcome, Khánh! Browse</h2>
    //       <p>
    //         Start connecting with mentors and get ready to take your career to the
    //         next level!
    //       </p>
    //       <Button
    //         variant="secondary"
    //         style={{
    //           fontWeight: 'bold',
    //           borderRadius: '4px',
    //           textAlign: 'center',
    //         }}
    //       >
    //         Find Mentor
    //       </Button>
    //     </Content>

    //     <RecommendList></RecommendList>
    //   </StyledContainer></>
    //   )
    // }
  );
}

export default DashBoard;
