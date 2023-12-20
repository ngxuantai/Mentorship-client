import React, {useEffect, useState} from 'react';
import {Button} from '@mui/material';
import styled from 'styled-components';
import AddQuestion from './components/AddQuestion';

const QuizCreator = () => {
  // State để lưu trữ thông tin bài tập
  const [questions, setQuestions] = useState([
    {
      question: 'Câu hỏi 1',
      options: [
        {option: '1', isCorrect: true},
        {option: '2', isCorrect: false},
        {option: '3', isCorrect: false},
        {option: '4', isCorrect: false},
      ],
    },
    {
      question: 'Câu hỏi 2',
      options: [
        {option: '1', isCorrect: true},
        {option: '2', isCorrect: false},
        {option: '3', isCorrect: false},
        {option: '4', isCorrect: false},
      ],
    },
    {
      question: 'Câu hỏi 3',
      options: [
        {option: '1', isCorrect: true},
        {option: '2', isCorrect: false},
        {option: '3', isCorrect: false},
        {option: '4', isCorrect: false},
      ],
    },
    {
      question: 'Câu hỏi 1',
      options: [
        {option: '1', isCorrect: true},
        {option: '2', isCorrect: false},
        {option: '3', isCorrect: false},
        {option: '4', isCorrect: false},
      ],
    },
    {
      question: 'Câu hỏi 2',
      options: [
        {option: '1', isCorrect: true},
        {option: '2', isCorrect: false},
        {option: '3', isCorrect: false},
        {option: '4', isCorrect: false},
      ],
    },
    {
      question: 'Câu hỏi 3',
      options: [
        {option: '1', isCorrect: true},
        {option: '2', isCorrect: false},
        {option: '3', isCorrect: false},
        {option: '4', isCorrect: false},
      ],
    },
  ]);

  const [showAddQuestion, setShowAddQuestion] = useState(false);

  // Hàm để thêm câu hỏi mới
  const addQuestion = (data) => {
    setQuestions([...questions, data]);
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  // Hàm để cập nhật thông tin của câu hỏi
  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Hàm để xóa câu hỏi
  const deleteQuestion = (index) => {
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
      <div style={{flex: '85%', border: '1px solid gray', margin: '10px'}}>
        <h2>Quiz Creator</h2>
        {questions.map((item, index) => (
          <QuestionContainer key={index}>
            <label>
              Câu {index + 1}: {item.question}
            </label>
            <br />
            <label>Đáp án: </label>
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
                    width: '60%',
                    padding: '6.5px 10px',
                    border: '1px solid gray',
                    borderRadius: '4px',
                  }}
                >
                  <label>{option.option}</label>
                </div>
              </div>
            ))}
          </QuestionContainer>
        ))}

        {showAddQuestion ? (
          <AddQuestion
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
      </div>
      <div style={{flex: '15%', border: '1px solid gray'}}>
        <h4>Danh sách câu hỏi</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px',
            // maxWidth: '600px',
            // margin: '0 auto',
            padding: '10px',
          }}
        >
          {questions.map((item, index) => (
            <NumberBox key={index}>{index + 1}</NumberBox>
          ))}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding-left: 5rem;
  display: flex;
`;

const QuestionContainer = styled.div`
  // display: flex;
  // flex: 70%;
  width: 60%;
  padding: 8.5px 12px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 4px;
  // background-color: lightblue;
  flex-direction: column;
  .answer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    margin: 10px;
  }
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

export default QuizCreator;
