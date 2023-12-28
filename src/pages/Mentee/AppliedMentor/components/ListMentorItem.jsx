import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import axios from "axios"; // Sử dụng axios hoặc thư viện HTTP client khác để gọi API
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MentorItem from "./MentorItem"; // Đảm bảo rằng bạn đã import MentorItem

const ListAppliedMentor = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("api-url")
      .then((response) => {
        setMentors(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleOnClick = (mentorId) => {
    navigate(`/profile/${mentorId}`);
  };

  const renderMentorItems = () => {
    return mentors.map((mentor) => (
      <div key={mentor.id} onClick={() => handleOnClick(mentor.id)}>
        <MentorItem mentor={mentor} />
      </div>
    ));
  };

  return <div>{renderMentorItems()}</div>;
};

export default ListAppliedMentor;

function MentorItem() {
  const theme = useTheme();

  const remainingTime = 80;

  return (
    <Card
      sx={{
        display: "flex",
        borderLeft: "5px solid #123456",
        borderBottom: `${remainingTime}% solid #123456`,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: "2 5 auto" }}>
        <CardContent>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Typography component="div" variant="h5">
            Tên
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Nghề nghiệp
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Tên khoá học
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", flex: "3 5 auto" }}>
        <CardContent>
          <Typography component="div" variant="h5">
            Số buổi đã học: 10
          </Typography>
          <Chip label="18:00 - 20:00 Thứ 7" />
        </CardContent>
        <CardContent>
          <Typography component="div" variant="h5">
            Số lượt gọi bù: 2
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
