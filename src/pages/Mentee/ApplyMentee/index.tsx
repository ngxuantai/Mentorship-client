import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "react-step-progress-bar/styles.css";
import styled from "styled-components";
import menteeApplicationApi from "../../../api/menteeApplication";
import mentorApi from "../../../api/mentor";
import { useUserStore } from "../../../store/userStore";
import AboutYou from "./components/AboutYou";
import Expectation from "./components/Expectation";
import Goal from "./components/Goal";
import ApplyStep from "./components/Step";
import Success from "./components/Success";

const steps = ["About you", "Your goal", "Expectations"];

export default function ApplyMentee() {
  const [page, setPage] = useState(0);
  const [mentor, setMentor] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();
  const { user } = useUserStore();
  const queryParams = new URLSearchParams(location.search);
  const mentorId = queryParams.get("mentorId");

  const [values, setValues] = useState({
    personalDescription: "",
    goal: "",
    expectation: "",
    contactTimes: "",
  });
  const handleInputChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleFinish = async () => {
    try {
      const application = {
        ...values,
        fee: mentor.price,
        mentorId,
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
    0: <AboutYou values={values} handleInputChange={handleInputChange} />,
    1: <Goal values={values} handleInputChange={handleInputChange} />,
    2: <Expectation values={values} handleInputChange={handleInputChange} />,
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
                  <Text>Back</Text>
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{}}>
                  <Text> Next</Text>
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
