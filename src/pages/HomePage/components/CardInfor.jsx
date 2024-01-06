import {Avatar} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';

export default function CardInfor({id,firstName, lastName, avatar, jobTitle}) {
  const navigate = useNavigate();

  const handleNavigateMentorProflie = () => {
    navigate(`/mentor/profile/${id}`);
  };

  return (
    <CardContainer onClick={() => handleNavigateMentorProflie()}>
      {/* <Avatar alt="Image Avatar" src={imageAvatar} /> */}
      <Avatar sx={{width: '100px', height: '100px'}}
        src={avatar}
      >

      </Avatar>
      <div className="name">
        <h4 className='text-center'>{firstName} {lastName}</h4>
      </div>
      <div className="role">
        <p>{jobTitle}</p>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: 270px;
  min-height: 270px;
  max-height: 270px;
  max-width: 220px;
  background-color: #fff;
  border-radius: 10px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .name {
    margin-top: 2rem;
    h4 {
      font-size: 1.2rem;
      font-weight: 700;
      margin: 0;
    }
  }
  .role {
    p {
      max-width: 145px;
      text-align: center;
      word-wrap: break-word;
      font-size: 1rem;
    }
  }
`;
