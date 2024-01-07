import {Avatar, FormControlLabel, Switch} from '@mui/material';
import {FloatingLabel} from 'flowbite-react';
import React, {useRef} from 'react';
import styled from 'styled-components';
import firebaseInstance from '../../../../services/firebase';
import {useUserStore} from '../../../../store/userStore';

export default function PersonalInfor() {
  const {user, updateUser} = useUserStore();
  console.log('user infor', user);
  const [selectedImage, setSelectedImage] = React.useState(user.avatar);
  const [values, setValues] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    jobTitle: user.jobTitle,
    email: user.email,
    linkedin: user.linkedin,
    isUnavailable: false,
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
      ? await firebaseInstance.storeImage('avatar', values.avatar)
      : user.avatar;
    console.log(`Đã chọn tệp:`, avatarUrl);
    const updatedUser = {...user, ...values, avatar: avatarUrl};
    await updateUser(user.id, updatedUser);
  };
  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log('name', name, value);
    // Xử lý trường dateOfBirth riêng lẻ
    if (name === 'dateOfBirth') {
      const selectedDate = new Date(value);
      setValues({...values, [name]: selectedDate});
    } else {
      setValues({...values, [name]: value});
    }
  };
  return (
    <Container>
      <Tittle>
        <h3>Hồ sơ của bạn</h3>
      </Tittle>
      <ContentContainer>
        <h5 style={{fontWeight: 'bold'}}>Thông tin cá nhân</h5>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <AvatarContainer>
            <div onClick={handleButtonClick} className="avatar-change">
              <Avatar
                //render selected image here
                src={selectedImage}
                sx={{width: '150px', height: '150px'}}
              />
              {/* <button onClick={handleButtonClick}>Chọn tệp</button> */}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{display: 'none'}}
              onChange={handleFileChange}
            />
          </AvatarContainer>
          <InforContainer onSubmit={handleSaveChange}>
            <div className="grid grid-cols-2 space-x-4">
              <FloatingLabel
                label="Họ"
                name="firstName"
                value={values.firstName}
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                variant="outlined"
                required
              />
              <FloatingLabel
                label="Tên"
                value={values.lastName}
                name="lastName"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                variant="outlined"
                required
              />
            </div>
            <div className="grid grid-cols-2 space-x-4">
              <FloatingLabel
                label="Số điện thoại"
                value={values.phoneNumber}
                name="phoneNumber"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                variant="outlined"
                required
              />
              <FloatingLabel
                label="Email"
                value={values.email}
                name="email"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                variant="outlined"
                required
              />
            </div>
            <div className="grid grid-cols-3 space-x-2">
              <FloatingLabel
                label="Nghề nghiệp"
                name="jobTitle"
                value={values.jobTitle}
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                variant="outlined"
                required
              />
              <FloatingLabel
                label="LinkedIn"
                name="linkedin"
                value={values.linkedin}
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                variant="outlined"
                required
              />
              <FloatingLabel
                label="Sinh nhật"
                name="dateOfBirth"
                type="date"
                // value={values.dateOfBirth}
                onChange={(event) => handleChange(event)}
                value={values.dateOfBirth ? values.dateOfBirth : ''}
                variant="outlined"
              />
            </div>
            {/* <Typography variant="body1" color="error">
              Unavailable
            </Typography> */}
            <FormControlLabel
              control={
                <Switch
                  checked={values.isUnavailable}
                  onChange={(event) => {
                    if (
                      window.confirm(
                        'Bạn có chắc chắn muốn thay đổi trạng thái của mình không?'
                      )
                    ) {
                      setValues({
                        ...values,
                        isUnavailable: event.target.checked,
                      });
                    }
                  }}
                  name="isUnavailable"
                  color="primary"
                />
              }
              label={
                values.isUnavailable
                  ? 'Bạn đã tắt chế độ nhận yêu cầu từ mentee mới '
                  : 'Bạn đang mở chế độ nhận yêu cầu từ mentee mới'
              }
            />
            <button>Lưu thay đổi</button>
          </InforContainer>
        </div>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
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
  margin: 0px 20px;
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
