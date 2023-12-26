import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function WishlistItem({ mentor }) {
  const navigate = useNavigate();
  const handleNavigateProfile = () => {
    navigate(`/mentor/profile/${mentor.id}`);
  };

  return (
    <div>
      <Container onClick={handleNavigateProfile}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="mentee-avatar">
            <img src="https://static.wixstatic.com/media/e6b07b_e53a78fec61344aa8ea18d85b00dabe9~mv2.png/v1/crop/x_23,y_23,w_570,h_607/fill/w_588,h_624,al_c,lg_1,q_90,enc_auto/%E9%A6%96%E6%AC%A1%E7%B7%9A%E4%B8%8A%E9%96%8B%E5%B1%95.png"></img>
          </div>
          <h3>
            {mentor.lastName} {mentor.firstName}
          </h3>
        </div>
        <p> {mentor.jobTitle}</p>
        <div className="d-flex justìy-content-center">
          <p>{mentor.introduction}</p>
        </div>
        <div className="d-flex justify-content-start align-items-center">
          <button className="mx-2">Apply</button>
          <button className="mx-2">Book Call</button>
          <button
            className="mx-2"
            style={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid #000",
            }}
          >
            Unsave
          </button>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 400px;
  padding: 10px;
  margin-right: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  .mentee-avatar {
    height: 30px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      height: 100%;
      width: 100%;
    }
  }
  button {
    border-radius: 10px;
    background-color: #1c3d7a;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.8rem;
    padding-left: 0.8rem;
    border: none;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
`;

export default WishlistItem;
