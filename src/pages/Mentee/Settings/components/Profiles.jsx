import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AccountInfor from "./AccountInfor";
import PersonalInfor from "./PersonalInfor";

export default function Profiles() {
  const [notifications, setNotifications] = useState({
    accountUpdates: true,
    mentorNotifications: true,
    wishlistNotifications: true,
  });

  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      console.log("savedNotifications", savedNotifications);
      setNotifications(() => JSON.parse(savedNotifications));
    }
  }, []);

  const saveChange = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    console.log("setsavedNotifications", notifications);
  };
  const handleCheckboxChange = (event) => {
    setNotifications({
      ...notifications,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Container>
      <PersonalInfor />
      <AccountInfor />
      <EmailContainer>
        <h5 style={{ fontWeight: "bold" }}>Tùy chọn email</h5>
        <p style={{ padding: 0, margin: 0 }}>
          Cấu hình thông báo email của bạn để bạn có thể tập trung vào những
          điều thực sự quan trọng.
        </p>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={notifications.accountUpdates}
                onChange={handleCheckboxChange}
                name="accountUpdates"
              />
            }
            label="Cập nhật quan trọng về tài khoản, hướng dẫn, tin nhắn và thanh toán của bạn"
            disabled={true}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notifications.mentorNotifications}
                onChange={handleCheckboxChange}
                name="mentorNotifications"
              />
            }
            label="Thông báo từ mentor của bạn"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={notifications.wishlistNotifications}
                onChange={handleCheckboxChange}
                name="wishlistNotifications"
              />
            }
            label="Thông báo về mentor trong danh sách mong muốn của bạn"
          />
        </FormGroup>
        <button onClick={saveChange}>Lưu thay đổi</button>
      </EmailContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  gap: 2rem;
  padding: 2rem;
`;

const EmailContainer = styled.div`
  max-width: 900px;
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const DeleteContainer = styled.div`
  max-width: 900px;
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    width: 150px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;
    padding: 8px 14px;
    color: #ffffff;
    background-color: #c81e1e;
    &:hover {
      background-color: #771d1d;
    }
  }
`;
