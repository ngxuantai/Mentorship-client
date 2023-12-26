import {
  Call,
  Check,
  Message,
  WatchLater,
  Whatshot,
  Work,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import styled from "styled-components";
import menteeApplicationApi from "../../../api/menteeApplication";
import planApi from "../../../api/plan";
import { PlanType } from "../../../constants";
import { colors } from "../../../constants/colors";
import { useUserStore } from "../../../store/userStore";
import currencyFormatter from "../../../utils/moneyConverter";
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
  font-weight: bold;
  width: 100%;
  background-color: ${colors.ui.primary};
  color: ${colors.text.primary};
`;
function PlanList({ mentor }) {
  const [plans, setPlans] = useState([]);
  const [value, setValue] = useState(0);
  const selectedPlan = plans[value];

  const fetchPlans = async () => {
    const res = await planApi.getPlanByMentorId(mentor.id);
    console.log("fetchPlans", res);
    setPlans(res);
  };
  const getPlanName = (planName) => {
    switch (planName) {
      case PlanType.LITE:
        return "Lite";
      case PlanType.STANDARD:
        return "Standard";
      case PlanType.PRO:
        return "Pro";
      default:
        return "";
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (mentor) {
      fetchPlans();
    }
  }, [mentor]);
  return (
    <StyledContainer>
      <Tabs value={value} onChange={handleChange}>
        {plans.map((plan, index) => (
          <Tab
            disableRipple
            sx={{ fontWeight: "bold" }}
            label={getPlanName(plan.name)}
            key={index}
          />
        ))}
      </Tabs>
      <PlanItem plan={selectedPlan} mentor={mentor} />
    </StyledContainer>
  );
}

export default PlanList;
function PlanItem({ plan, mentor }) {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [isApplied, setIsApplied] = useState(false);
  const handleNavigateToApply = () => {
    if (!isApplied) {
      navigate(`/mentee/apply/${mentor.id}`, { state: { plan } });
    }
  };
  useEffect(() => {
    if (user) {
      console.log("checkIsApplied x", user, mentor);

      const checkIsApplied = async () => {
        const data = await menteeApplicationApi.checkMenteeRegistration(
          user.id,
          mentor.id
        );
        console.log("checkIsApplied", data, user, mentor);
        if (data) {
          const { HasRegistered, HasTimeLeft } = data;
          if (HasRegistered && HasTimeLeft) {
            setIsApplied(true);
          } else {
            setIsApplied(false);
          }
        }
      };
      checkIsApplied();
    }
  }, [user, mentor]);
  if (!plan) {
    return <></>;
  }
  return (
    <>
      <Container>
        <Row>
          <h3>{currencyFormatter(plan.price)} / tháng</h3>
          <p>{plan.description}</p>
          <List>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Call />
              </ListItemIcon>
              <ListItemText
                primary={`${plan.callTimes} lần gọi mỗi tuần (60p/lần)`}
              />
            </ListItem>
            <ListItem className="py-0 px-0">
              <ListItemIcon>
                <Message />
              </ListItemIcon>
              <ListItemText primary="Nhắn tin không giới hạn" />
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
            style={{
              fontWeight: "bold",
            }}
            onClick={handleNavigateToApply}
            className="my-2"
            variant="secondary"
          >
            {isApplied ? "Bạn đã nộp đơn " : "Nộp đơn"}
          </Button>

          <div></div>
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
        <StyledButton>Send Message</StyledButton>
      </Container>
    </>
  );
}
