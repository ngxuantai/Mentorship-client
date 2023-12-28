import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import moment from "moment";

import { useEffect, useRef, useState } from "react";
import learningProgressApi from "../../../../api/learningProgress";
import menteeApi from "../../../../api/mentee";
import menteeApplicationApi from "../../../../api/menteeApplication";
import { mappingPlanName } from "../../../../utils/dataHelper";

export function CardEvent({ event, onClick }) {
  const theme = useTheme();
  const cardRef = useRef(null);
  const [application, setApplication] = useState();
  const [learningProgress, setLearingProgress] = useState();

  const fetchApplication = async () => {
    return await menteeApplicationApi.getMenteeApplicationById(
      event.applicationId
    );
  };
  const fetchMentee = async (menteeId) => {
    return await menteeApi.getMentee(menteeId);
  };
  const fetchLearningProgress = async (applicationId) => {
    return await learningProgressApi.getLearningProgressByApplicationId(
      applicationId
    );
  };
  const getEndDate = () => {
    if (!application) return "";
    const applicationDate = new Date(application.applicationDate);
    return applicationDate.setDate(
      applicationDate.getDate() + application.plan.weeks * 7
    );
  };
  useEffect(() => {
    (async () => {
      if (!event) return;

      const applicationData = await fetchApplication();
      console.log("applicationData", applicationData);

      const mentee = await fetchMentee(applicationData.menteeProfile.id);
      console.log("applicationData mentee", mentee);

      const applicationWithMentee = { ...applicationData, mentee };
      setApplication(applicationWithMentee);
      const progress = await fetchLearningProgress(applicationData.id);
      setLearingProgress(progress);
    })();
  }, [event]);
  return (
    <Card
      onClick={() => onClick(event)}
      sx={{
        margin: "20px",
        display: "flex",
        width: "40%",
        height: 180,
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        backgroundColor: `${event.color}`,
        borderLeft: "5px solid #123b2a",
        "&:hover": {
          boxShadow: "0 4px 25px -6.125px rgba(0,0,0,0.3)",
          transform: "translateY(-1px) translateX(-1px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flex: "0.5 5 auto",
        }}
      >
        <CardContent>
          <Avatar
            style={{ width: 120, height: 120 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Typography component="div" variant="h6">
            <strong>
              Name {application?.mentee.lastName}{" "}
              {application?.mentee.firstName}
            </strong>
          </Typography>
        </CardContent>
      </Box>

      <Divider
        // flexItem
        orientation="vertical"
        sx={{
          bgcolor: "grey.500",
          width: 3,
          borderRadius: 25,
          height: 100,
          m: 1.5,
        }}
      ></Divider>
      <Box sx={{ display: "flex", flexDirection: "column", flex: "3 5 auto" }}>
        <Typography component="div" sx={{ marginLeft: 2 }} variant="h6">
          Gói học: <strong>{mappingPlanName(application?.plan.name)}</strong>
        </Typography>

        <CardContent>
          <Typography component="div" variant="h6">
            Ngày kết thúc:{" "}
            {learningProgress
              ? //learningProgress.endDate is counted when user pay the learning plan
                // not when application approved by mentor
                moment(learningProgress?.endDate).format("DD-MM-yyyy")
              : moment(getEndDate()).format("DD-MM-yyyy")}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography component="div" variant="h6">
            Số lượt gọi còn lại:{" "}
            {`${
              learningProgress?.callTimesLeft || application?.plan.callTimes
            }`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
