import { ControlPoint } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import WishlistItem from "./components/WishlistItem";

function Wishlist() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="px-5 py-5">
        <h3>Wishlist</h3>
        <div className="d-flex justify-content-start">
          <WishlistItem />
          <FindMentors />
        </div>
      </div>
    </div>
  );
}

const FindMentors = () => {
  const navigate = useNavigate();
  return (
    <div
      className="border border-2 rounded align-items-center text-center d-flex flex-column justify-content-center"
      style={{ width: "400px" }}
      onClick={(e) => {
        navigate("/mentor/search");
      }}
    >
      <ControlPoint style={{ fontSize: "50px" }} />
      <p>Find mentors</p>
    </div>
  );
};

export default Wishlist;
