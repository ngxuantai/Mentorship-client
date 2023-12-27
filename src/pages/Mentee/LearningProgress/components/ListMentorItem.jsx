import ChatIcon from "@mui/icons-material/Chat";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { List } from "flowbite-react";
import moment from "moment";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import learningProgressApi from "../../../../api/learningProgress";
import menteeApplicationApi from "../../../../api/menteeApplication";
import mentorApi from "../../../../api/mentor";
import { useUserStore } from "../../../../store/userStore";
import { mappingPlanName } from "../../../../utils/dataHelper";
import { convertTimestampRange } from "../../../../utils/dateConverter";

const ListAppliedMentor = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        const data = await learningProgressApi.getLearningProgressByMenteeId(
          user.id
        );
        if (data) {
          const list = data.sort((a, b) => {
            const dateA = new Date(a.endDate).getTime();
            const dateB = new Date(b.endDate).getTime();
            return dateB - dateA;
          });
          console.log("getLearningProgressByMenteeId", List);
          setProgressList(list);
        }
      };
      fetchProgress();
    }
  }, [user]);

  const handleOnClick = (mentorId) => {
    navigate(`/profile/${mentorId}`);
  };

  const renderMentorItems = () => {
    return progressList.map((progress) => (
      <ProgressItem
        key={progress.id}
        onClick={() => handleOnClick(progress)}
        progress={progress}
      />
    ));
  };

  return <div>{renderMentorItems()}</div>;
};

export default ListAppliedMentor;

function ProgressItem({ progress, onClick }) {
  const theme = useTheme();
  const cardRef = useRef(null);
  const [mentor, setMentor] = useState(null);
  const [remainingPercent, setRemainingPercent] = useState(100);
  const [application, setApplication] = useState(null);
  const fetchApplication = async () => {
    const data = await menteeApplicationApi.getMenteeApplicationById(
      progress.applicationId
    );
    console.log("applicationapplication", data);

    setApplication(data);
  };
  const fetchMentor = async () => {
    const data = await mentorApi.getMentorById(progress.mentorId);
    setMentor(data);
  };

  function handleCallClick() {}

  function handleChatClick() {
    if (chatDisabled) {
      return;
    }
  }
  function computeRemainPercent() {
    const startDate = new Date(progress.startDate).getTime();
    const endDate = new Date(progress.endDate).getTime();
    const current = new Date().getTime();
    if (progress.end < current) {
      setRemainingPercent(0);
    } else {
      const percent = (
        ((current - startDate) / (endDate - startDate)) *
        100
      ).toFixed(2);
      setRemainingPercent(percent);
    }
  }
  useEffect(() => {
    fetchMentor();
    fetchApplication();
    computeRemainPercent();
  }, []);
  console.log("remaingnPercent", remainingPercent);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(-${remainingPercent}%)`;
    }
  }, [remainingPercent]);
  return (
    <Card
      sx={{
        margin: "20px 0px",
        display: "flex",
        width: "50%",
        height: 200,
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        backgroundColor: "transparent",
        borderLeft: "5px solid #123b2a",
        borderBottom: `${remainingPercent}% solid #123b2a`,
        "&:hover": {
          boxShadow: "0 4px 25px -6.125px rgba(0,0,0,0.3)",
          transform: "translateY(-1px) translateX(-1px)",
        },
      }}
    >
      <Box
        ref={cardRef}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          right: 0,
          zIndex: -1,
          backgroundColor: "#2d966b",
          transition: "transform 0.3s ease-in-out",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {`${remainingPercent}%`}
        </Typography>
        <ChatIcon onClick={handleChatClick} sx={{ color: "black" }} />
      </Box>

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
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "0.5",
        }}
      >
        <CardContent>
          <Typography component="div" variant="h5">
            <strong>
              {mentor?.lastName} {mentor?.firstName}
            </strong>
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {mentor?.jobTitle}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {mappingPlanName(application?.plan.name)}
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
        <CardContent>
          <Typography component="div" variant="h6">
            Ngày kết thúc {moment(progress?.endDate).format("DD-MM-yyyy")}
          </Typography>
          {application?.learningTime.map((time) => {
            return (
              <Chip
                style={{ margin: "3px 0px" }}
                label={convertTimestampRange(time.start, time.end)}
              />
            );
          })}
        </CardContent>
        <CardContent>
          <Typography component="div" variant="h6">
            Số lượt gọi còn lại: {`${progress?.callTimesLeft}`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
