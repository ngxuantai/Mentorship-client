import { ControlPoint } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mentorApi from "../../../api/mentor";
import firebaseInstance from "../../../services/firebase";
import { useUserStore } from "../../../store/userStore";

import WishlistItem from "./components/WishlistItem";

function Wishlist() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [mentors, setMentors] = useState([]);
  const fetchMentors = async (wishlist = []) => {
    const data = await Promise.all(
      wishlist.map(async (id) => {
        return await mentorApi.getMentorById(id);
      })
    );

    setMentors(data || []);
  };
  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeWishlistChanges(
        user.id,
        (wishlist) => {
          fetchMentors(wishlist);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);
  return (
    <div>
      <div className="px-5 py-5">
        <h3>Wishlist</h3>
        <div className="d-flex justify-content-start">
          {mentors.map((m, index) => (
            <WishlistItem mentor={m} key={`mentor_skill-${index}`} />
          ))}
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
