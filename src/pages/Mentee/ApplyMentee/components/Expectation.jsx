import InfoIcon from "@mui/icons-material/Info";
import { MenuItem, Select } from "@mui/material";
import { Textarea } from "flowbite-react";
import styled from "styled-components";

const contactTimes = [
  "Tôi không có bất kỳ mong đợi nào",
  "Tôi muốn nhận được ngay lập tức",
  "Tôi muốn nhận được phản hồi trong vòng một ngày",
  "Tôi ổn với việc nhận phản hồi trong vòng 3 ngày",
];
export default function Expectation({ values, handleInputChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    handleInputChange(name, value);
  };

  return (
    <Container>
      <ContentContainer>
        <TipsContainer>
          <div>
            <InfoIcon style={{ color: "#3f83f8", fontSize: "16px" }} />
          </div>
          <div
            style={{ paddingTop: "2px", color: "#224F9C", fontSize: "16px" }}
          >
            <span style={{ margin: 0, padding: 0, fontWeight: "bold" }}>
              Thông tin cá nhân của bạn sẽ được đính kèm với đơn xin này
            </span>
          </div>
        </TipsContainer>
        <label className="font-semibold">Bạn kỳ vọng mentor phản hồi bạn trong bao lâu?</label>
        <Select
          name="contactTimes"
          onChange={(event) => handleChange(event)}
        >
          {contactTimes.map((contactTime) => (
            <MenuItem key={contactTime} value={contactTime}>
              {contactTime}
            </MenuItem>
          ))}
        </Select>
        <Textarea className="w-full bg-white"
          name="expectation"
          onChange={(event) => handleChange(event)}
          autoComplete="off"
          rows={5}
          placeholder="Bạn mong đợi gì từ mentor này?"
          helperText='Xác định kỳ vọng của bạn với mentor giúp 2 bên hiểu nhau tốt hơn'
          required
        />
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
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;

const TipsContainer = styled.div`
  background-color: #e0edfe;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
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
  gap: 2rem;
  .content {
    display: flex;
    flex-direction: row;
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
