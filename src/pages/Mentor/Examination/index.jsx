import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import styled from 'styled-components';
import CardExam from './components/CardExam';
import examApi from '../../../api/exam';

const Examination = () => {
  const navigate = useNavigate();
  // State để lưu trữ thông tin bài tập
  // const [exams, setExams] = useState([
  //   {
  //     id: 1,
  //     name: 'Bài tập 1',
  //     createAt: '2021-10-10',
  //     questions: 10,
  //   },
  //   {
  //     id: 2,
  //     name: 'Bài tập 2',
  //     createAt: '2021-10-10',
  //     questions: 10,
  //   },
  //   {
  //     id: 3,
  //     name: 'Bài tập 3',
  //     createAt: '2021-10-10',
  //     questions: 10,
  //   },
  //   {
  //     id: 4,
  //     name: 'Bài tập 4',
  //     createAt: '2021-10-10',
  //     questions: 10,
  //   },
  //   {
  //     id: 5,
  //     name: 'Bài tập 5',
  //     createAt: '2021-10-10',
  //     questions: 10,
  //   },
  // ]);

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const res = await examApi.getExamByMentorId('657f048f3819a4512c8ff9cb');
      console.log(res);
      setExams(res);
    };
    fetchExams();
  }, []);

  const handleAddExam = () => {
    console.log('Thêm đề thi');
    navigate(`/mentor/examination/${exams[0].id}`);
  };

  return (
    <Container>
      <ButtonContainer>
        <label>Danh sách đề thi</label>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddExam()}
        >
          Thêm đề thi
        </Button>
      </ButtonContainer>
      {exams.length > 0 ? (
        <ExamContainer>
          {exams.map((exam) => (
            <CardExam key={exam.id} exam={exam} />
          ))}
        </ExamContainer>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

const ExamContainer = styled.div`
  margin: 0 auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding: 2rem 2rem;
  border: 1px solid black;
  border-radius: 4px;
`;

export default Examination;
