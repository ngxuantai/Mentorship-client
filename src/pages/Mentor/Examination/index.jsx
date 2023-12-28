import {Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import examApi from '../../../api/exam';
import CardExam from './components/CardExam';
import ListFolder from './components/ListFolder';
import AddFile from './components/AddFile';
import {Label} from 'flowbite-react';
import firebaseInstance from '../../../services/firebase';
import {fileApi, folderApi} from '../../../api/file';
// const nodemailer = require('nodemailer');

const Examination = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      const res = await examApi.getExamByMentorId('65840127a47c189dd995cdf3');
      console.log(res);
      setExams(res);
    };

    const fetchFiles = async () => {
      const res = await fileApi.getFilesByMentorId('65840127a47c189dd995cdf3');
      console.log(res);
      setFiles(res);
    };

    const fecthFolders = async () => {
      const res = await folderApi.getFoldersByMentorId(
        '65840127a47c189dd995cdf3'
      );
      console.log(res);
      setFolders(res);
    };

    fetchExams();
    fecthFolders();
    fetchFiles();
  }, []);

  const handleAddExam = () => {
    console.log('Thêm đề thi');
    navigate(`/mentor/examination/${exams[0].id}`);
  };

  const editName = (mnetorId, fileName) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    let name = '',
      extension = '';

    // Nếu có dấu chấm, cắt chuỗi để chỉ giữ phần đầu đến trước dấu chấm
    if (lastDotIndex !== -1) {
      name = fileName.substring(0, lastDotIndex);
      extension = fileName.substring(lastDotIndex + 1);
    } else {
      // Nếu không có dấu chấm, trả về tên file không thay đổi
      name = fileName;
    }

    return name + '-' + mnetorId + '.' + extension;
  };

  const handleAddFile = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf, .docx, .doc, .xlsx, .xls, .ppt, .pptx, .txt';
    input.multiple = true;
    // storeFile();

    input.addEventListener('change', (event) => {
      const filesInput = event.target.files;

      filesInput.forEach((file) => {
        console.log(file);
        let fileData = {
          mentorId: '65840127a47c189dd995cdf3',
          name: file.name,
          link: '',
          size: file.size,
          type: file.type,
          createdDate: new Date().toISOString(),
        };
        firebaseInstance
          .storeFile('files', file, fileData.mentorId)
          .then(async (url) => {
            fileData.link = url;
            await fileApi.createFile(fileData);
            setFiles([...files, fileData]);
          });
      });
    });

    // Kích hoạt sự kiện click trên input
    input.click();
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
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddExam()}
            >
              Thêm tài liệu
            </Button> */}
            <AddFile />
          </ButtonContainer>
          <Label>Chưa có tài liệu</Label>
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
  border-radius: 4px;
`;

export default Examination;
