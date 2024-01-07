import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import { Textarea } from "flowbite-react";
import React from "react";
import styled from "styled-components";
import { useUserStore } from "../../../../store/userStore";

export default function OtherInfor() {
  const { user, updateUser } = useUserStore();
  console.log("user infor", user);
  const [values, setValues] = React.useState({
    bio: user.bio,
    introduction: user.introduction,
  });

  const handleSaveChange = async (event) => {
    event.preventDefault();
    const updatedUser = { ...user, ...values };
    await updateUser(user.id, updatedUser);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  return (
    <Container>
      <Tittle>
        <h3>Thông tin khác</h3>
      </Tittle>
      <ContentContainer>
        <TipsContainer>
          <p>
            <PrivacyTipIcon style={{ color: "#3f83f8", fontSize: "16px" }} />{" "}
            Mẹo
          </p>
          <ul>
            <li>
              Hãy thêm ảnh cá nhân và liên kết đến các trang mạng xã hội để tạo
              ấn tượng tích cực về bạn là người hướng dẫn đích thực.
            </li>
            <li>
              Ghi rõ về kinh nghiệm của bạn để mentee có cái nhìn tổng quan về
              bạn.
            </li>
          </ul>
        </TipsContainer>
        <InforContainer onSubmit={handleSaveChange}>
          <label className="font-semibold ml-3">Thông tin ngắn về bạn</label>
          <Textarea className="bg-white"
            rows={7}
            name="bio"
            value={values.bio}
            onChange={(event) => handleChange(event)}
            autoComplete="off"
            placeholder="Hãy chia sẻ thông tin ngắn về bản thân, kinh nghiệm hoặc sở thích của bạn. Điều này giúp mentee hiểu rõ hơn về bạn."
            required
          />
          <label className="font-semibold ml-3">Lời giới thiệu</label>
          <Textarea className="bg-white"
            rows={7}
            name="introduction"
            value={values.introduction}
            onChange={(event) => handleChange(event)}
            autoComplete="off"
            placeholder="Viết một lời giới thiệu chi tiết về bản thân, bao gồm kinh nghiệm, kỹ năng, hoặc bất cứ điều gì bạn muốn chia sẻ với mentee"
            required
          />

          <button>Lưu thay đổi</button>
        </InforContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
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
