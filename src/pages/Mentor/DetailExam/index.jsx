import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import styled from 'styled-components';
import AddQuestion from './components/AddQuestion';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from 'react-router-dom';
import examApi from '../../../api/exam';

const DetailExam = () => {
  const {id} = useParams();

  const [exam, setExam] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const exam = await examApi.getExamByExamId(id);
      setExam(exam);
      const questions = await examApi.getQuestionByExamId(id);
      setQuestions(questions);
    };
    fetchQuestions();
  }, []);

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  const addQuestion = (data) => {
    setQuestions([...questions, data]);
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = async (itemId, index) => {
    const res = await examApi.deleteQuestion(itemId);
    console.log(res.data);
    if (res.data === 'Delete successfully') {
      toast.success('Xóa câu hỏi thành công', toastOptions);
    } else {
      toast.error('Xóa câu hỏi thất bại', toastOptions);
    }
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const cancelAddQues = () => {
    setShowAddQuestion(false);
  };

  // Render giao diện
  return (
    <Container>
      <QuestionContainer>
        <label style={{fontSize: '28px', fontWeight: 'bold'}}>
          {exam.name}
        </label>
        {/* <label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Danh sách câu hỏi
        </label> */}
        {questions.length > 0 ? (
          <>
            {questions.map((item, index) => (
              <Question key={index}>
                <label style={{fontWeight: 'bold', marginRight: '4px'}}>
                  Câu {index + 1}:
                </label>
                <label>{item.content}</label>
                <br />
                <label style={{fontWeight: 'bold', marginRight: '4px'}}>
                  Đáp án:{' '}
                </label>
                {item.options.map((option, i) => (
                  <div className="answer" key={i}>
                    <label
                      style={{
                        backgroundColor: option.isCorrect ? '#4caf50' : 'white',
                        border: '1px solid gray',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {String.fromCharCode(65 + i)}
                    </label>
                    <div
                      style={{
                        width: '80%',
                        padding: '6.5px 10px',
                        border: '1px solid gray',
                        borderRadius: '4px',
                        backgroundColor: '#e8f0fe',
                      }}
                    >
                      <label>{option.option}</label>
                    </div>
                  </div>
                ))}
                <label style={{fontWeight: 'bold', marginRight: '4px'}}>
                  Giải thích:
                </label>
                <label>{item.explain || 'Không có'}</label>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: 'red',
                      color: 'white',
                      textTransform: 'none',
                      fontSize: '16px',
                      '&:hover': {
                        opacity: 0.8,
                        backgroundColor: 'red',
                      },
                    }}
                    onClick={() => deleteQuestion(item.id, index)}
                  >
                    Xóa
                  </Button>
                </div>
              </Question>
            ))}
          </>
        ) : (
          <Question>
            <div>
              <label>Chưa có câu hỏi nào</label>
            </div>
          </Question>
        )}

        {showAddQuestion ? (
          <AddQuestion
            examId={id}
            addQuestion={addQuestion}
            cancelAddQues={cancelAddQues}
          />
        ) : (
          <div>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: '#4caf50',
                color: 'white',
                textTransform: 'none',
                fontSize: '16px',
                '&:hover': {
                  opacity: 0.8,
                  backgroundColor: '#4caf50',
                },
              }}
              onClick={() => setShowAddQuestion(true)}
            >
              Thêm câu hỏi
            </Button>
          </div>
        )}
      </QuestionContainer>
      <NumberContainer>
        <label
          style={{fontSize: '20px', fontWeight: 'bold', alignContent: 'center'}}
        >
          Danh sách câu hỏi
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
          }}
        >
          {questions.map((item, index) => (
            <NumberBox key={index}>{index + 1}</NumberBox>
          ))}
        </div>
      </NumberContainer>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 100%;
  padding: 2rem;
  margin: 0 auto;
  display: flex;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 80%;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 15px 30px;
`;

const Question = styled.div`
  width: 100%;
  padding: 8.5px 12px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  flex-direction: column;
  .answer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 10px;
  }
`;

const NumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 20%;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 15px 18px;
  margin-left: 20px;
  min-height: 400px;
`;

const NumberBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export default DetailExam;
