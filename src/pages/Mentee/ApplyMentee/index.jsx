import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import "react-step-progress-bar/styles.css";
import styled from "styled-components";
import menteeApplicationApi from "../../../api/menteeApplication";
import mentorApi from "../../../api/mentor";
import { PlanType } from "../../../constants";
import { useUserStore } from "../../../store/userStore";
import { getRandomColor } from "../../../utils/randomColor";
import AboutYou from "./components/AboutYou";
import Expectation from "./components/Expectation";
import Goal from "./components/Goal";
import MentorAvailabilityCalendar from "./components/MentorAvaiabilityCalendar";
import ApplyStep from "./components/Step";
import Success from "./components/Success";

const steps = [
  "Chọn thời gian học",
  "Về bản thân bạn",
  "Mục tiêu",
  "Kỳ vọng của bạn",
];

export default function ApplyMentee() {
  const [page, setPage] = useState(0);
  const [mentor, setMentor] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const { user } = useUserStore();
  const { mentorId } = useParams();
  const plan = location.state?.plan;

  console.log("selectedPlan user", plan, user);

  const [values, setValues] = useState({
    plan: plan,
    personalDescription: "",
    goal: "",
    expectation: "",
    contactTimes: "",
    learningTime: [],
  });
  const handleInputChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFinish = async () => {
    const color = getRandomColor();
    try {
      const learningTimeInTimestamp = values.learningTime.map((e) => ({
        ...e,
        id: null,
        title: `Lịch dạy ${user.lastName} ${user.firstName}`,
        start: e.start.getTime(),
        end: e.end.getTime(),
        color,
      }));

      const application = {
        ...values,
        fee: plan.price,
        mentorId,
        learningTime: learningTimeInTimestamp,
        menteeProfile: { ...user },
      };
      console.log("handleFinish", application);
      await menteeApplicationApi.createMenteeApplication(application);
      setIsSuccess(true);
    } catch (er) {
      console.error(er);
    }
  };

  const stepComponents = {
    0: (
      <MentorAvailabilityCalendar
        mentorId={mentorId}
        plan={plan}
        values={values}
        onInputChange={handleInputChange}
      />
    ),
    1: <AboutYou values={values} handleInputChange={handleInputChange} />,
    2: <Goal values={values} handleInputChange={handleInputChange} />,
    3: <Expectation values={values} handleInputChange={handleInputChange} />,
  };

  const handleNext = () => {
    if (page === steps.length - 1) {
      handleFinish();

      return;
    }
    setPage(page + 1);
  };

  const handleBack = () => {
    setPage(page - 1);
  };
  const getMentorInfor = async (id) => {
    const mentor = await mentorApi.getMentorById(id);

    setMentor(mentor);
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
  useEffect(() => {
    if (mentorId) {
      getMentorInfor(mentorId);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          width: "100%",
          color: "gray",
          marginTop: 12,
        }}
      >
        Ứng tuyển mentor {mentor?.firstName} {mentor?.lastName}
      </h1>
      <h4
        style={{
          textAlign: "center",
          width: "100%",
          color: "gray",
          marginTop: 12,
        }}
      >
        Gói {getPlanName(plan.name)}
      </h4>
      {isSuccess ? (
        <Success></Success>
      ) : (
        <Container>
          <ApplyStep
            process={steps}
            onPageChange={(index) => setPage(index)}
            currentPage={page}
          ></ApplyStep>
          {stepComponents[page]}
          <div style={{ width: "100%" }}>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Button
                  color="inherit"
                  disabled={page === 0}
                  onClick={handleBack}
                  sx={{}}
                >
                  <Text>Trước</Text>
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{}}>
                  <Text> Tiếp</Text>
                </Button>
              </Box>
            </React.Fragment>
          </div>
        </Container>
      )}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  gap: 2rem;
  padding: 2rem;
  max-width: 900px;
  width: 90%;
`;
const Text = styled.div`
  font-weight: bold;
  font-size: 16px;
`;
