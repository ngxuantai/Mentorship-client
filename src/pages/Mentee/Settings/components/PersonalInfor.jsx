import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import { Avatar, TextField } from "@mui/material";
import React, { useRef } from "react";
import styled from "styled-components";
import firebaseInstance from "../../../../services/firebase";
import { useUserStore } from "../../../../store/userStore";

export default function PersonalInfor() {
  const { user, updateUser } = useUserStore();
  const [selectedImage, setSelectedImage] = React.useState(user.avatar);
  const [values, setValues] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    jobTitle: user.jobTitle || "",
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
    const updatedUser = { ...user, avatar: avatarUrl };
    await updateUser(user.id, updatedUser);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Container>
      <Tittle>
        <h3>Hồ sơ của bạn</h3>
      </Tittle>
      <ContentContainer>
        <h5 style={{ fontWeight: "bold" }}>Thông tin cá nhân</h5>
        <TipsContainer>
          <p>
            <PrivacyTipIcon style={{ color: "#3f83f8", fontSize: "16px" }} />{" "}
            Mẹo
          </p>
          <ul>
            <li>
              Thêm ảnh và hồ sơ truyền thông xã hội của bạn giúp người hướng dẫn
              cảm thấy tự tin rằng bạn là một người thật (ví dụ: không phải là
              bot).
            </li>
            <li>
              Hồ sơ của bạn chỉ hiển thị với người hướng dẫn mà bạn gửi đơn ứng
              tuyển đến. Nó không được lập chỉ mục trên các công cụ tìm kiếm như
              Google.
            </li>
          </ul>
        </TipsContainer>
        <AvatarContainer>
          <p>Ảnh</p>
          <div className="avatar-change">
            <Avatar
              //render selected image here
              src={selectedImage}
              sx={{ width: "100px", height: "100px" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button onClick={handleButtonClick}>Chọn tệp</button>
          </div>
        </AvatarContainer>
        <InforContainer onSubmit={handleSaveChange}>
          <div className="content">
            <TextField
              name="firstName"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Tên"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
              required
            />
            <TextField
              name="lastName"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Họ"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
              required
            />
          </div>
          <div
            className="content"
            style={{ width: "50%", paddingRight: "0.5rem" }}
          >
            <TextField
              name="email"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Email"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
              required
            />
          </div>
          <TextField
            name="jobTitle"
            onChange={(event) => handleChange(event)}
            autoComplete="off"
            label="Chức danh công việc"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              fontSize: "1rem",
            }}
          />
          <div className="content">
            <TextField
              name="linkedin"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="LinkedIn"
              placeholder="https://www.linkedin.com/"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
            />
            <TextField
              name="twitter"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Twitter"
              placeholder="https://twitter.com/"
              variant="outlined"
              size="small"
              sx={{
                width: "100%",
                fontSize: "1rem",
              }}
            />
          </div>
          <TextField
            name="goal"
            multiline
            onChange={(event) => handleChange(event)}
            autoComplete="off"
            label="Mục tiêu"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              fontSize: "1rem",
              "& textarea": {
                minHeight: "8rem",
                resize: "vertical",
              },
            }}
          />
          <button>Lưu thay đổi</button>
        </InforContainer>
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
