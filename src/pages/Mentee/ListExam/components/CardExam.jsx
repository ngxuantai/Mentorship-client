import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import examApi from '../../../../api/exam';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export default function CardExam({menteeExamId, examId, numberAns}) {
  const navigate = useNavigate();

  const [exam, setExam] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      const res = await examApi.getExamByExamId(examId);
      console.log(res);
      setExam(res);
    };
    fetchExam();
  }, []);

  const hanldeNavigateDoExam = (menteeExamId) => {
    navigate(`/mentee/exam/${menteeExamId}`);
  };

  return (
    <Container>
      <label style={{fontWeight: 'bold'}}>{exam.name}</label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '20px',
          marginBottom: '10px',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <label>Câu hỏi: {exam.numberQues}</label>
          <label>Tiến độ: {(numberAns / exam.numberQues) * 100}%</label>
        </div>
        <Button
          size="small"
          variant="contained"
          onClick={() => hanldeNavigateDoExam(menteeExamId)}
        >
          Làm bài
        </Button>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 2px solid #ccc;
  //   .label {
  //     padding: 0;
  //     margin: 0;
  //   }
`;
