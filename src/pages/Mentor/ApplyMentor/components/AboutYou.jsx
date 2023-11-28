import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import InfoIcon from '@mui/icons-material/Info';
import {
  TextField,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function AboutYou({onButtonClick}) {
  useEffect(() => {
    // Gọi API để lấy danh sách quốc gia
    fetch('https://restcountries.com/v2/all')
      .then((response) => response.json())
      .then((data) => {
        // Xử lý dữ liệu trả về
        const countryList = data.map((country) => ({
          code: country.alpha2Code,
          name: country.name,
        }));
        setCountries(countryList);
        // Chọn quốc gia mặc định (ví dụ: chọn quốc gia đầu tiên)
        setSelectedCountry(countryList.length > 0 ? countryList[0].code : '');
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []); // [] ensures that the effect runs only once when the component mounts

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    jobTitle: '',
    company: '',
    linkedin: '',
    twitter: '',
    location: '',
  });
  const [countries, setCountries] = useState([]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log(`Đã chọn tệp: ${file.name}`);
      // Thực hiện xử lý tệp ở đây (ví dụ: tải lên máy chủ)
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onButtonClick('pagetwo');
  };

  return (
    <Container>
      <ContentContainer>
        <TipsContainer>
          <div>
            <InfoIcon style={{color: '#3f83f8', fontSize: '16px'}} />
          </div>
          <div style={{paddingTop: '2px', color: '#224F9C', fontSize: '16px'}}>
            <span style={{margin: 0, padding: 0, fontWeight: 'bold'}}>
              Lovely to see you!
            </span>
            <p>
              Filling out the form only takes a couple minutes. We'd love to
              learn more about your background and the ins-and-outs of why you'd
              like to become a mentor. Keep things personal and talk directly to
              us and your mentees. We don't need jargon and polished cover
              letters here!
              <br />
              <br />
              You agree to our code of conduct and the mentor agreement by
              sending the form, so be sure to have a look at those.
            </p>
          </div>
        </TipsContainer>
        <AvatarContainer>
          <p>Photo</p>
          <div className="avatar-change">
            <Avatar sx={{width: '100px', height: '100px'}} />
            <input
              type="file"
              ref={fileInputRef}
              style={{display: 'none'}}
              onChange={handleFileChange}
            />
            <button onClick={handleButtonClick}>Chọn tệp</button>
          </div>
        </AvatarContainer>
        <InforContainer onSubmit={handleSubmit}>
          <div className="content">
            <TextField
              name="firstName"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="First Name"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
            />
            <TextField
              name="lastName"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Last name"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
            />
          </div>
          <div className="content">
            <TextField
              name="email"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Email"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
            />
            <TextField
              name="password"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Password"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
              type="password"
            />
          </div>
          <div className="content">
            <TextField
              name="jobTitle"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Job title"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
              required
            />
            <TextField
              name="company"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Company"
              variant="outlined"
              size="small"
              sx={{
                width: '100%',
                fontSize: '1rem',
              }}
            />
          </div>
          <FormControl style={{width: '70%'}}>
            <InputLabel id="demo-simple-select-label" size="small">
              Location
            </InputLabel>
            <Select
              name="location"
              label="Location"
              onChange={(event) => handleChange(event)}
              size="small"
              defaultValue=""
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div
            style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}
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
