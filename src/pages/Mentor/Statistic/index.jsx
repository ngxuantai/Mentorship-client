import {useEffect, useState} from 'react';
import styled from 'styled-components';
import MenteeChart from './components/MenteeChart';
import SalesChart from './components/SaleChart';

export default function Statistic() {
  const [notifications, setNotifications] = useState({
    accountUpdates: true,
    mentorNotifications: true,
    wishlistNotifications: true,
  });

  useEffect(() => {}, []);

  return (
    <Container>
      <SalesChart />
      <MenteeChart />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  gap: 2rem;
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  width: 90%;
`;

const EmailContainer = styled.div`
  max-width: 900px;
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const DeleteContainer = styled.div`
  max-width: 900px;
  width: 90%;
  border-radius: 0.5rem;
  border: 1px solid #000000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  button {
    width: 150px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.25rem;
    border: none;
    padding: 8px 14px;
    color: #ffffff;
    background-color: #c81e1e;
    &:hover {
      background-color: #771d1d;
    }
  }
`;
