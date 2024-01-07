import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import examApi from '../../../../api/exam';
import {Button} from '@mui/material';
import {Label} from 'flowbite-react';
import {useNavigate} from 'react-router-dom';
import mentorApi from '../../../../api/mentor';
import {isEmptyObject} from '../../../../utils/dataHelper';

export default function CardExam({menteeExamId, examId, numberAns}) {
  const navigate = useNavigate();

  const [exam, setExam] = useState({});
  const [mentor, setMentor] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      const res = await examApi.getExamByExamId(examId);
      console.log(res);
      setExam(res);
    };

    fetchExam();
  }, []);

  useEffect(() => {
    const fetchMentor = async () => {
      const res = await mentorApi.getMentorById(exam.mentorId);
      setMentor(res);
    };

    if (!isEmptyObject(exam)) {
      fetchMentor();
    }
  }, [exam]);

  const hanldeNavigateDoExam = (menteeExamId) => {
    navigate(`/mentee/exam/${menteeExamId}`);
  };

  return (
    <>
      {!isEmptyObject(mentor) && (
        <Container>
          <Label style={{fontWeight: 'bold'}}>{exam.name}</Label>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Label>Giáo viên: {mentor.firstName + ' ' + mentor.lastName}</Label>
            <Label>Câu hỏi: {exam.numberQues}</Label>
            <Label>Tiến độ: {(numberAns / exam.numberQues) * 100}%</Label>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '10px',
              // marginTop: '20px',
            }}
          >
            <Button
              size="small"
              variant="contained"
              onClick={() => hanldeNavigateDoExam(menteeExamId)}
              disabled={!(numberAns === exam.numberQues)}
            >
              Xem
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => hanldeNavigateDoExam(menteeExamId)}
              disabled={numberAns === exam.numberQues}
            >
              Làm bài
            </Button>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  max-width: 250px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;
