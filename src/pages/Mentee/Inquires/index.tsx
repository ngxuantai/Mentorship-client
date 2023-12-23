import { ChatBubbleOutline } from "@mui/icons-material";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Inquires() {
  const navigate = useNavigate();
  const handleNavigateToSearchScreen = () => {
    navigate("/mentor/search");
  };
  return (
    <div>
      <div
        className="w-full py-2 text-center"
        style={{ backgroundColor: "#04b4ba" }}
      >
        <h5 style={{ color: "white" }}>
          Want to double the chance of success for your applications?{" "}
          <a href="mentee/settings" style={{ color: "white" }}>
            Complete your profile
          </a>{" "}
        </h5>
      </div>
      <div className="px-5 py-5">
        <h3>Inquires</h3>
        <div className="p-2 border rounded d-flex flex-column justify-content-center align-items-center text-center">
          <ChatBubbleOutline style={{ fontSize: "50px" }} />
          <p>No inquires</p>
          <p className="text-body-tertiary">
            Once you have messaged a mentor, they will show up here
          </p>
          <Button onClick={handleNavigateToSearchScreen} variant="primary">
            Find mentors
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Inquires;
