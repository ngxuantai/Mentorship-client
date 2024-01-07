import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import menteeExamApi from '../../../api/menteeExam';
import menteeFileApi from '../../../api/menteeFile';
import examApi from '../../../api/exam';
import {Label} from 'flowbite-react';
import CardExam from './components/CardExam';
import ListFile from './components/ListFile';
import ReactLoading from 'react-loading';
import {useUserStore} from '../../../store/userStore';

const Exam = () => {
  const [menteeExams, setMenteeExams] = useState([]);
  const [menteeFiles, setMenteeFiles] = useState([]);
  const {user} = useUserStore();
  console.log(user);

  useEffect(() => {
    const fetchExams = async () => {
      const res = await menteeExamApi.getMenteeExamByMenteeId(user.id);
      console.log(res);
      setMenteeExams(res);
    };

    const fetchFiles = async () => {
      const res = await menteeFileApi.getMenteeFileByMenteeId(user.id);
      console.log(res);
      setMenteeFiles(res);
    };

    fetchExams();
    fetchFiles();
  }, [user]);

  const getInforExam = async (examId) => {
    const res = await examApi.getExamByExamId(examId);
    console.log(res);
    return res;
  };

  return (
    <Container>
      <ButtonContainer>
        <Label
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Danh sách đề thi
        </Label>
      </ButtonContainer>

      {menteeExams.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            width: '95%',
            gap: '1rem',
            padding: '2rem',
            border: '1px solid black',
          }}
        >
          {menteeExams.map((item, index) => (
            <CardExam
              key={index}
              menteeExamId={item.id}
              examId={item.examId}
              numberAns={item.numberAns}
            />
          ))}
        </div>
      ) : (
        <div>
          <ReactLoading type="spin" color="blue" />
        </div>
      )}

      <ButtonContainer>
        <Label
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Danh sách tài liệu
        </Label>
      </ButtonContainer>
      <div style={{width: '95%'}}>
        {menteeFiles.length > 0 && <ListFile menteeFiles={menteeFiles} />}
      </div>
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
  width: 95%;
  padding: 0 1rem;
`;

export default Exam;
