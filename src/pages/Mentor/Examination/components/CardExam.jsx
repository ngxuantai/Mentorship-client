import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {Button} from 'flowbite-react';

export default function CardExam({exam}) {
  const navigate = useNavigate();

  const formatDateString = (date) => {
    var originalDate = new Date(date);

    var day = originalDate.getUTCDate();
    var month = originalDate.getUTCMonth() + 1;
    var year = originalDate.getUTCFullYear();

    var formattedDateString = day + '/' + month + '/' + year;

    return formattedDateString;
  };

  const handleDetailExam = () => {
    console.log(navigate);
    navigate(`/mentor/examination/${exam.id}`);
  };

  return (
    <Container>
      <label style={{fontWeight: 'bold'}}>{exam.name}</label>
      <label>Ngày tạo: {formatDateString(exam.createdAt)}</label>
      <label>Số câu hỏi: {exam.numberQues}</label>
      <div
        style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}
      >
        <Button
          color="gray"
          pill
          style={{width: '70%', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'}}
          onClick={() => handleDetailExam()}
        >
          Chi tiết
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 190px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
