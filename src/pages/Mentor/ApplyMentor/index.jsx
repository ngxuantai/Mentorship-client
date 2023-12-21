import { useState } from "react";
import "react-step-progress-bar/styles.css";
import styled from "styled-components";
import applicationApi from "../../../api/application";
import firebaseInstance from "../../../services/firebase";
import AboutYou from "./components/AboutYou";
import Experience from "./components/Experience";
import Profile from "./components/Profile";
import ProgressBar from "./components/ProgressBar";
import Success from "./components/Success";

export default function ApplyPage() {
  const [page, setPage] = useState("pageone");
  const [isSuccess, setIsSuccess] = useState(false);
  const [otherInfor, setOtherInfor] = useState({
    reason: "",
    achievement: "",
  });
  const [mentorProfile, setMentorProfile] = useState({
    jobTitle: "",
    avatar: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: null,
    bio: "",
    linkedin: "",
    skillIds: ["657eeb8c6d4e50c8c5649cbf", "657eeb8d6d4e50c8c5649cc0"],
    imageUrls: [],
    createdAt: new Date(),
  });
  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      case "3":
        setPage("pagethree");
        break;
      default:
        setPage("pageone");
    }
  };
  const handleMentorInforChange = (event) => {
    const { name, value } = event.target;
    setMentorProfile({
      ...mentorProfile,
      [name]: value,
    });
  };
  const handleOtherInforChange = (event) => {
    const { name, value } = event.target;
    setOtherInfor({
      ...otherInfor,
      [name]: value,
    });
  };

  const submitForm = async () => {
    let avatar = "";
    if (mentorProfile.avatar) {
      avatar = await firebaseInstance.storeImage(
        "avatar",
        mentorProfile.avatar
      );
    }
    try {
      const applicationData = {
        ...otherInfor,
        mentorProfile: { ...mentorProfile, avatar },
      };
      await applicationApi.createApplication(applicationData);
      setIsSuccess(true);
    } catch (er) {
      console.log("error", er);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container>
        {isSuccess ? (
          <Success></Success>
        ) : (
          <>
            <ProgressBar page={page} onPageNumberClick={nextPageNumber} />
            {
              {
                pageone: (
                  <AboutYou
                    values={mentorProfile}
                    onInputChange={handleMentorInforChange}
                    onButtonClick={nextPage}
                  />
                ),
                pagetwo: (
                  <Profile
                    values={mentorProfile}
                    onInputChange={handleMentorInforChange}
                    onButtonClick={nextPage}
                  />
                ),
                pagethree: (
                  <Experience
                    values={otherInfor}
                    onInputChange={handleOtherInforChange}
                    onButtonClick={submitForm}
                  />
                ),
              }[page]
            }
          </>
        )}
      </Container>
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
