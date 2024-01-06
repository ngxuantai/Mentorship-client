import InfoIcon from "@mui/icons-material/Info";
import { Avatar} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextInput, Spinner, FloatingLabel } from "flowbite-react";
import { PermIdentity, MailOutline, LocalPhone, Work } from "@mui/icons-material";

export default function AboutYou({ values, onInputChange, onButtonClick }) {
  const [selectedImage, setSelectedImage] = useState();
  // useEffect(() => {
  //   // Gọi API để lấy danh sách quốc gia
  //   fetch("https://restcountries.com/v2/all")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Xử lý dữ liệu trả về
  //       const countryList = data.map((country) => ({
  //         code: country.alpha2Code,
  //         name: country.name,
  //       }));
  //       setCountries(countryList);
  //       // Chọn quốc gia mặc định (ví dụ: chọn quốc gia đầu tiên)
  //       setSelectedCountry(countryList.length > 0 ? countryList[0].code : "");
  //     })
  //     .catch((error) => console.error("Error fetching countries:", error));
  // }, []); // [] ensures that the effect runs only once when the component mounts

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      onInputChange({ target: { name: "avatar", value: file } });
      //read image file
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(`Đã chọn tệp: ${file.name}`);
      // await firebaseInstance.storeImage("avatar", file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onButtonClick("pagetwo");
  };
  useEffect(() => {
    if (values.avatar) {
      const imageUrl = URL.createObjectURL(values.avatar);
      setSelectedImage(imageUrl);
    }
  }, []);
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
              Xin chào! Rất vui được gặp bạn.
            </span>
            <p>
              Việc điền form dưới đây chỉ mất một vài phút của bạn. Chúng tôi muốn biết thêm một vài thông tin cá nhân của bạn cũng như lý do vì sao bạn muốn trở thành một mentor. Hãy trả lời một cách tự nhiên nhất nhé!
              <br />
              <br />
              Qua việc gửi đi form này, bạn đã đồng ý với chúng tôi về quy tắc ứng xử và điều khoản sử dụng của Mentorship. Vì vậy hãy chắc chắn rằng mình đã xem qua những biểu mẫu đó nhé!
            </p>
          </div>
        </TipsContainer>
        <AvatarContainer>
          <p>Photo</p>
          <div className="avatar-change">
            <Avatar
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
        <InforContainer onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 space-x-4">
            <FloatingLabel 
              label="Họ"
              variant="outlined"
              name="firstName"
              value={values.firstName}
              onChange={onInputChange}
              autoComplete="off"
              required

            />
            <FloatingLabel 
              label="Tên"
              variant="outlined"
              value={values.lastName}
              name="lastName"
              onChange={onInputChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="content grid grid-cols-2 space-x-4">
            <FloatingLabel 
              label="Email"
              variant="outlined"
              value={values.email}
              name="email"
              onChange={onInputChange}
              autoComplete="off"
              required
            />
            <FloatingLabel 
              label="Số điện thoại"
              variant="outlined"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={onInputChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="content grid grid-cols-2 space-x-4">
            <FloatingLabel 
              variant="outlined"
              label="Nghề nghiệp"
              name="jobTitle"
              value={values.jobTitle}
              onChange={onInputChange}
              autoComplete="off"
              required
            />
            <FloatingLabel 
              variant="outlined"
              name="dateOfBirth"
              type="date"
              placeholder="Ngày sinh"
              onChange={onInputChange}
              value={values.dateOfBirth || new Date()}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button>Next step</button>
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
