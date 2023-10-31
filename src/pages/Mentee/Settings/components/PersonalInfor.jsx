import React, {useRef} from 'react';
import styled from 'styled-components';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import {TextField, Avatar} from '@mui/material';
import {colors} from '../../../../constants/colors';

export default function PersonalInfor() {
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    linkedin: '',
    twitter: '',
    goal: '',
  });

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
  return (
    <Container>
      <Tittle>
        <h3>Your profile</h3>
      </Tittle>
      <ContentContainer>
        <h5 style={{fontWeight: 'bold'}}>Personal Information</h5>
        <TipsContainer>
          <p>
            <PrivacyTipIcon style={{color: '#3f83f8', fontSize: '16px'}} /> Tips
          </p>
          <ul>
            <li>
              Adding your photo and social media profiles helps mentors feel
              confident that you’re a real person (e.g. not a bot).
            </li>
            <li>
              Your profile is only visible to mentors that you send applications
              to. It is not indexed on search engines like Google.
            </li>
          </ul>
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
        <InforContainer>
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
          <div
            className="content"
            style={{width: '50%', paddingRight: '0.5rem'}}
          >
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
          </div>
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
                width: '100%',
                fontSize: '1rem',
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
                width: '100%',
                fontSize: '1rem',
              }}
            />
          </div>
          <TextField
            name="goal"
            multiline
            onChange={(event) => handleChange(event)}
            autoComplete="off"
            label="Goal"
            variant="outlined"
            size="small"
            sx={{
              width: '100%',
              fontSize: '1rem',
              '& textarea': {
                minHeight: '8rem',
                resize: 'vertical',
              },
            }}
          />
          <button>Save changes</button>
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
