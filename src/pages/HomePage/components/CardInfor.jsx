import {Avatar} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export default function CardInfor({name, role}) {
  return (
    <CardContainer>
      {/* <Avatar alt="Image Avatar" src={imageAvatar} /> */}
      <Avatar sx={{width: '60px', height: '60px'}}>N</Avatar>
      <div className="name">
        <h4>{name}</h4>
      </div>
      <div className="role">
        <p>{role}</p>
      </div>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: 100%;
  max-width: 180px;
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
