import InfoIcon from "@mui/icons-material/Info";
import { TextField } from "@mui/material";
import styled from "styled-components";

export default function Experience({ values, onInputChange, onButtonClick }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    onButtonClick();
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
              Almost there!
            </span>
            <p>
              You're just one last step away from being a mentor and connecting
              with mentees all over the world! In this step, shows off your
              accomplishments and how you can help others.
              <br />
              <br />
              Many of these fields are optional, but will help us get better
              insights into your work – and therefore exponentially increases
              your chances. They also give you a jumpstart once you're a mentor.
            </p>
          </div>
        </TipsContainer>
        <InforContainer onSubmit={handleSubmit}>
          <TextField
            name="reason"
            multiline
            values={values.reason}
            onChange={onInputChange}
            autoComplete="off"
            label="Why do you want to become a mentor? (Not publicly visible)"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              fontSize: "1rem",
              "& textarea": {
                minHeight: "8rem",
                resize: "vertical",
              },
            }}
            required
          />
          <TextField
            name="achievement"
            values={values.achievement}
            multiline
            onChange={onInputChange}
            autoComplete="off"
            label="What, in your opinion, has been your greatest achievement so far? (Not publicly visible)"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              fontSize: "1rem",
              "& textarea": {
                minHeight: "8rem",
                resize: "vertical",
              },
            }}
            required
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <button
              onClick={() => {
                onButtonClick("pagetwo");
              }}
            >
              Previous step
            </button>
            <button style={{ width: "180px" }}>Submit application</button>
          </div>
        </InforContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  width: 90%;
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
