import { Avatar, TextField } from "@mui/material";
import React, { useRef } from "react";
import styled from "styled-components";
import firebaseInstance from "../../../../services/firebase";
import { useUserStore } from "../../../../store/userStore";

export default function PersonalInfor() {
  const { user, updateUser } = useUserStore();
  console.log("user infor", user);
  const [selectedImage, setSelectedImage] = React.useState(user.avatar);
  const [values, setValues] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    jobTitle: user.jobTitle,
    email: user.email,
    linkedin: user.linkedin,
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      values.avatar = file;
      console.log(`Đã chọn tệp:`, file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      // Thực hiện xử lý tệp ở đây (ví dụ: tải lên máy chủ)
    }
  };
  const handleSaveChange = async (event) => {
    event.preventDefault();
    const avatarUrl = values.avatar
      ? await firebaseInstance.storeImage("avatar", values.avatar)
      : user.avatar;
    console.log(`Đã chọn tệp:`, avatarUrl);
    const updatedUser = { ...user, ...values, avatar: avatarUrl };
    await updateUser(user.id, updatedUser);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Xử lý trường dateOfBirth riêng lẻ
    if (name === "dateOfBirth") {
      const selectedDate = new Date(value);
      setValues({ ...values, [name]: selectedDate });
    } else {
      setValues({ ...values, [name]: value });
    }
  };
  return (
    <Container>
      <Tittle>
        <h3>Hồ sơ của bạn</h3>
      </Tittle>
      <ContentContainer>
        <h5 style={{ fontWeight: "bold" }}>Thông tin cá nhân</h5>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <AvatarContainer>
            <div onClick={handleButtonClick} className="avatar-change">
              <Avatar
                //render selected image here
                src={selectedImage}
                sx={{ width: "100px", height: "100px" }}
              />
              {/* <button onClick={handleButtonClick}>Chọn tệp</button> */}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </AvatarContainer>
          <InforContainer onSubmit={handleSaveChange}>
            <div className="content">
              <TextField
                name="firstName"
                value={values.firstName}
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                placeholder="Tên"
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                  fontSize: "1rem",
                }}
                required
              />
              <TextField
                value={values.lastName}
                name="lastName"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                placeholder="Họ"
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                  fontSize: "1rem",
                }}
                required
              />
            </div>
            <div className="content">
              <TextField
                value={values.phoneNumber}
                name="phoneNumber"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                placeholder="Số điện thoại"
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                  fontSize: "1rem",
                }}
                required
              />
              <TextField
                value={values.email}
                name="email"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                placeholder="Email"
                variant="outlined"
                size="small"
                sx={{
                  width: "100%",
                  fontSize: "1rem",
                }}
                required
              />
            </div>
            <div className="content">
              <TextField
                name="jobTitle"
                value={values.jobTitle}
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                placeholder="Nghề nghiệp"
                variant="outlined"
                size="small"
                sx={{
                  width: "50%",
                  fontSize: "1rem",
                }}
                required
              />
              <div
                className="content"
                style={{ width: "50%", paddingRight: "0.5rem" }}
              >
                <TextField
                  name="linkedin"
                  value={values.linkedin}
                  onChange={(event) => handleChange(event)}
                  autoComplete="off"
                  placeholder="Linked url"
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "100%",
                    fontSize: "1rem",
                  }}
                  required
                />
                <TextField
                  name="dateOfBirth"
                  type="date"
                  value={values.dateOfBirth}
                  onChange={(event) => handleChange(event)}
                  value={
                    values.dateOfBirth
                      ? values.dateOfBirth.toISOString().substring(0, 10)
                      : ""
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    width: "100%",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>

            <button>Lưu thay đổi</button>
          </InforContainer>
        </div>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  width: 90%;
`;

const Tittle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  h3 {
    width: 100%;
    font-weight: bold;
  }
`;

const ContentContainer = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

const TipsContainer = styled.div`
  background-color: #e0edfe;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  margin: 0px 20px;
  flex-direction: column;
  p {
    font-size: 16px;
    padding-left: 1rem;
  }
  .avatar-change {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    button {
      border-radius: 0.25rem;
      border: 1px solid #000000;
      padding: 0.25rem 1rem;
      margin-left: 1rem;
    }
  }
`;

const InforContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  gap: 1rem;
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
  }
  button {
    width: 140px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;
    padding: 8px 14px;
    color: #ffffff;
    background-color: #1c3d7a;
    &:hover {
      background-color: #172e59;
    }
  }
`;
