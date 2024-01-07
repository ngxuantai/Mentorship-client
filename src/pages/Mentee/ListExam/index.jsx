import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import menteeExamApi from '../../../api/menteeExam';
import examApi from '../../../api/exam';
import CardExam from './components/CardExam';
import {useUserStore} from '../../../store/userStore';

const Exam = () => {
  const [menteeExams, setMenteeExams] = useState([]);
  const {user} = useUserStore();
  console.log(user);

  useEffect(() => {
    const fetchExams = async () => {
      const res = await menteeExamApi.getMenteeExamByMenteeId(user.id);
      console.log(res);
      setMenteeExams(res);
    };
    fetchExams();
  }, [user]);

  const getInforExam = async (examId) => {
    const res = await examApi.getExamByExamId(examId);
    console.log(res);
    return res;
  };

  return (
    <Container>
      <label>Danh sách đề thi</label>
      {menteeExams.map((item, index) => (
        <CardExam
          key={index}
          menteeExamId={item.id}
          examId={item.examId}
          numberAns={item.numberAns}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default Exam;
