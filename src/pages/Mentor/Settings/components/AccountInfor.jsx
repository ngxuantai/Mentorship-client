import { TextField } from "@mui/material";
import { FloatingLabel } from "flowbite-react";
import React from "react";
import styled from "styled-components";
import firebaseInstance from "../../../../services/firebase";
import { useUserStore } from "../../../../store/userStore";

export default function AccountInfor() {
  const { user, updateUser } = useUserStore();
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const handleSaveChange = async (event) => {
    event.preventDefault();
    try {
      await firebaseInstance.changePassword(
        values.password,
        values.confirmPassword
      );
      resetForm();
      alert("Thay đổi mật khẩu thành công");
    } catch (er) {
      alert("Thay đổi mật khẩu thất bại");
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  const resetForm = () => {
    setValues({
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <Container>
      <Tittle>
        <h3>Tài khoản & Bảo mật</h3>
      </Tittle>
      <ContentContainer>
        <InforContainer onSubmit={handleSaveChange}>
          <FloatingLabel className="w-full"
            name="password"
            value={values.password}
            onChange={handleChange}
            autoComplete="off"
            label="Mật khẩu cũ"
            type="password"
            variant="outlined"
            required
          />

            <FloatingLabel className="w-full"
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              autoComplete="off"
              label="Mật khẩu mới"
              variant="outlined"
              required
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
const TipsContainer = styled.div`
  background-color: #e0edfe;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
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
