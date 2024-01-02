import {Button} from '@mui/material';
import {Label} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import CardExam from './components/CardExam';
import ListFile from './components/ListFile';
import ListFolder from './components/ListFolder';
import AddFile from './components/AddFile';
import firebaseInstance from '../../../services/firebase';
import examApi from '../../../api/exam';
import {fileApi, folderApi} from '../../../api/file';
import {useUserStore} from '../../../store/userStore';
import ReactLoading from 'react-loading';
// const nodemailer = require('nodemailer');

const Examination = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const {user} = useUserStore();

  useEffect(() => {
    const fetchExams = async () => {
      const res = await examApi.getExamByMentorId(user.id);
      console.log(res);
      setExams(res);
    };

    const fetchFiles = async () => {
      const res = await fileApi.getFilesByMentorId(user.id);
      console.log(res);
      setFiles(res);
    };

    const fecthFolders = async () => {
      const res = await folderApi.getFoldersByMentorId(user.id);
      console.log(res);
      setFolders(res);
    };

    fetchExams();
    fecthFolders();
    setLoading(false);
    // fetchFiles();
  }, []);

  const handleAddExam = () => {
    console.log('Thêm đề thi');
    navigate(`/mentor/examination/${exams[0].id}`);
  };

  return (
    <>
      {loading ? (
        <ReactLoading type="spin" color="#fff" />
      ) : (
        <Container>
          <ButtonContainer>
            <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
              Danh sách đề thi
            </Label>
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
          {folders.length > 0 ? (
            <ListFolder folders={folders} />
          ) : (
            <>
              <ButtonContainer>
                <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
                  Danh sách tài liệu
                </Label>
                <AddFile />
              </ButtonContainer>
              <Label>Chưa có tài liệu</Label>
            </>
          )}
        </Container>
      )}
    </>
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
  padding: 1rem;
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
