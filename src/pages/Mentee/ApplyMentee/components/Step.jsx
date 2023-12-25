import { Step, StepLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import { styled } from "styled-components";

export default function StepProcess({ process, currentPage, onPageChange }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={currentPage} alternativeLabel>
        {process.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Text>{label}</Text>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const Text = styled.div`
  font-weight: bold;
  font-size: 16px;
`;
