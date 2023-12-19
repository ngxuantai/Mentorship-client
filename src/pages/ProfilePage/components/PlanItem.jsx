import {
  Call,
  Check,
  Message,
  WatchLater,
  Whatshot,
  Work,
} from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { colors } from "./../../../constants/colors";

const StyledContainer = styled(Container)`
  border: 1px solid black;
  border-radius: 24px;
  border-color: gray;
  padding: 30px;
  width: 25%;
  min-width: 420px;
  background-color: ${colors.ui.primary};
  margin: 12px;
`;

const StyledButton = styled(Button)`
  border: 1px solid black;
  border-radius: 24px;
  border-color: gray;
  padding: 20px;
  width: 25%;
  min-width: 420px;
  background-color: ${colors.ui.primary};
  color: ${colors.text.primary};
  margin: 12px;
`;

function PlanItem({ mentor }) {
  const navigate = useNavigate();
  const handleNavigateToApply = () => {
    navigate(`/mentee/apply?mentorId=${mentor.id}`);
  };
  return (
    <Container>
      <StyledContainer>
        <Row>
          <h3>140$/ month</h3>
          <p>
            Offering portfolio and case study reviews, interview prepping, white
            board challenges and more!
          </p>
          <List>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Call />
              </ListItemIcon>
              <ListItemText primary="3 calls per month (30min/call)" />
            </ListItem>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary="Unlimited Q&A via chat" />
            </ListItem>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <WatchLater />
              </ListItemIcon>
              <ListItemText primary="Expect responses in 2 days" />
            </ListItem>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary="Hands-on support" />
            </ListItem>
          </List>
        </Row>
        <Row>
          <Button
            onClick={handleNavigateToApply}
            className="my-2"
            variant="secondary"
          >
            Apply now
          </Button>
          <List>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText primary="Flat fee, no hidden costs" />
            </ListItem>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText primary="7 day free trial! Cancel anytime." />
            </ListItem>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Whatshot />
              </ListItemIcon>
              <ListItemText primary="Only 5 spots left" />
            </ListItem>
          </List>
        </Row>
      </StyledContainer>
      <StyledButton>Send Message</StyledButton>
    </Container>
  );
}

export default PlanItem;
