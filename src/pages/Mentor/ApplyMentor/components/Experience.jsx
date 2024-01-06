import InfoIcon from "@mui/icons-material/Info";
import styled from "styled-components";
import { Textarea } from "flowbite-react";

export default function Experience({ values, onInputChange, onButtonClick }) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    onButtonClick();
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
              Sắp xong rồi!
            </span>
            <p>
              Bạn chỉ còn cách 1 bước nữa là có thể trở thành một mentor và kết nối với các mentees từ mọi nơi. Ở bước này, hãy bày tỏ khát vọng của bạn, thành tựu và cách mà bạn có thể giúp người khác.
              <br />
              <br />
              Chúng tôi sẽ xem xét kỹ lưỡng đơn đăng ký của bạn và một khi có kết quả, chúng tôi sẽ thông báo ngay lập tức qua email được đăng ký
            </p>
          </div>
        </TipsContainer>
        <InforContainer onSubmit={handleSubmit}>
          <div>
            <p className="font-bold ml-2">
              Tại sao bạn muốn trở thành mentor?
            </p>
            <Textarea className="w-full bg-white" 
              rows={7}
              name="reason"
              values={values.reason}
              onChange={onInputChange}
              autoComplete="off"
              variant="outlined"
              required
            />
          </div>
          <div>
            <p className="font-bold ml-2">
              Một số thành tựu của bạn
            </p>
          <Textarea className="w-full bg-white"
            rows={7}
            name="achievement"
            values={values.achievement}
            onChange={onInputChange}
            autoComplete="off"
            variant="outlined"
            required
          />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <button
              onClick={() => {
                onButtonClick("pagetwo");
              }}
            >
              Previous step
            </button>
            <button style={{ width: "180px" }}>Submit application</button>
          </div>
        </InforContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 900px;
  width: 90%;
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
