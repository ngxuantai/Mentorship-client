import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import { Avatar } from "@mui/material";
import { FloatingLabel } from "flowbite-react";
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
    const updatedUser = { ...user, avatar: avatarUrl };
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
        <div className="flex space-x-10">
        <AvatarContainer>
          <div className="avatar-change flex">
            <Avatar
              //render selected image here
              src={selectedImage}
              sx={{ width: "150px", height: "150px" }}
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
          <div className="grid grid-cols-2 space-x-4">
            <FloatingLabel
              name="firstName"
              value={values.firstName}
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Họ"
              variant="outlined"
              required
            />
            <FloatingLabel
              name="lastName"
              value={values.lastName}
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Tên"
              variant="outlined"
              required
            />
          </div>
          <div
            className="grid grid-cols-2 space-x-4"
          >
            <FloatingLabel
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Số điện thoại"
              variant="outlined"
              required
            />
            <FloatingLabel
              label="Sinh nhật"
              name="dateOfBirth"
              type="date"
              onChange={(event) => handleChange(event)}
              value={
                values.dateOfBirth
                  ? values.dateOfBirth.toISOString().substring(0, 10)
                  : ""
              }
              variant="outlined"
            />
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
  flex-direction: column;
  p {
    font-size: 16px;
    padding-left: 1rem;
  }
  .avatar-change {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      border-radius: 0.25rem;
      border: 1px solid #000000;
      padding: 0.25rem 1rem;
      margin-top: 0.5rem;
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
