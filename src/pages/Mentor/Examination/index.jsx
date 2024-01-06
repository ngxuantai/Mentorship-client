import {Button} from '@mui/material';
import {Label, TextInput} from 'flowbite-react';
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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReactLoading from 'react-loading';
// const nodemailer = require('nodemailer');

const Examination = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [folders, setFolders] = useState([]);
  const [addExam, setAddExam] = useState(false);

  const [isNoFolder, setIsNoFolder] = useState(false);
  const [nameExam, setNameExam] = useState('');

  const {user} = useUserStore();

  useEffect(() => {
    const fetchExams = async () => {
      const res = await examApi.getExamByMentorId(user.id);
      setExams(res);
    };

    const fetchFolders = async () => {
      const res = await folderApi.getFoldersByMentorId(user.id);
      setFolders(res);
      if (res.length === 0) {
        setIsNoFolder(true);
      }
    };

    fetchExams();
    fetchFolders();
  }, [user]);

  const handleOpenAddExam = () => {
    setAddExam(true);
    const timestamp = 1704250800000 / 1000; // Chia cho 1000 để chuyển đổi từ miligiây sang giây
    const dateObject = new Date(timestamp * 1000); // Nhân cho 1000 để chuyển đổi từ giây sang miligiây

    console.log(dateObject.toUTCString());
  };

  const handleAddExam = async () => {
    const newExam = {
      mentorId: user.id,
      name: nameExam,
      createdAt: new Date().toISOString(),
      numberQues: 0,
    };
    console.log(newExam);
    const res = await examApi.createExam(newExam);
    console.log(res);
    setExams([...exams, res.data]);
    setAddExam(false);
    setNameExam('');
  };

  return (
    <Container>
      <ButtonContainer>
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Danh sách đề thi
        </Label>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenAddExam()}
        >
          Thêm đề thi
        </Button>
      </ButtonContainer>
      {exams.length > 0 ? (
        <ExamContainer>
          {exams.map((exam) => (
            <CardExam key={exam.id} exam={exam} />
          ))}
          {addExam && (
            <AddExamContainer>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email1"
                    value="Tên đề thi"
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                    }}
                  />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tên đề thi"
                  autoComplete="off"
                  value={nameExam}
                  onChange={(e) => setNameExam(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                  gap: '10px',
                }}
              >
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => handleAddExam()}
                  size="small"
                >
                  <CheckIcon fontSize="small" />
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setAddExam(false);
                  }}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </Button>
              </div>
            </AddExamContainer>
          )}
        </ExamContainer>
      ) : (
        <ReactLoading type="spin" color="blue"></ReactLoading>
      )}
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
          {isNoFolder ? (
            <Label>Chưa có tài liệu</Label>
          ) : (
            <ReactLoading type="spin" color="blue" />
          )}
        </>
      )}
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
  // border-radius: 4px;
`;

const AddExamContainer = styled.div`
  max-width: 190px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

export default Examination;
