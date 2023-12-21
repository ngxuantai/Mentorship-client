import InfoIcon from "@mui/icons-material/Info";
import { TextField } from "@mui/material";
import styled from "styled-components";

export default function AboutYou({ values, handleInputChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  return (
    <Container>
      <ContentContainer>
        <TipsContainer>
          <div>
            <InfoIcon style={{ color: "#3f83f8", fontSize: "16px" }} />
          </div>
          <div
            style={{ paddingTop: "2px", color: "#224F9C", fontSize: "16px" }}
          >
            <span style={{ margin: 0, padding: 0, fontWeight: "bold" }}>
              Lovely to see you!
            </span>
            <p>
              Filling out the form only takes a couple minutes. We'd love to
              learn more about your background and the ins-and-outs of why you'd
              like to become a mentor. Keep things personal and talk directly to
              us and your mentees. We don't need jargon and polished cover
              letters here!
              <br />
              <br />
              You agree to our code of conduct and the mentor agreement by
              sending the form, so be sure to have a look at those.
            </p>
          </div>
        </TipsContainer>
        <TextField
          multiline
          name="personalDescription"
          onChange={(event) => handleChange(event)}
          autoComplete="off"
          minRows={5}
          label="Tell your mentor about yourself"
          size="small"
          sx={{
            minHeight: 200,
            width: "100%",
            fontSize: "1rem",
          }}
          required
        />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  width: 90%;
`;

const Tittle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    width: 100%;
    font-weight: bold;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

const TipsContainer = styled.div`
  background-color: #e0edfe;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-size: 16px;
    padding-left: 1rem;
  }
  .avatar-change {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    button {
      border-radius: 0.25rem;
      border: 1px solid #000000;
      padding: 0.25rem 1rem;
      margin-left: 1rem;
    }
  }
`;

const InforContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .content {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  button {
    width: 140px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;
    padding: 8px 14px;
    color: #ffffff;
    background-color: #1c3d7a;
    &:hover {
      background-color: #172e59;
    }
  }
`;
