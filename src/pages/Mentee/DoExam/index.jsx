import React, {useEffect, useState} from 'react';
import {RadioGroup, FormControlLabel, Radio, Button} from '@mui/material';
import styled from 'styled-components';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useParams} from 'react-router-dom';
import examApi from '../../../api/exam';
import menteeExamApi from '../../../api/menteeExam';
import {useNavigate} from 'react-router-dom';

const DoExam = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [newAnswers, setNewAnswers] = useState([]);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    const fetchAnswers = async () => {
      const menteeExam = await menteeExamApi.getMenteeExamByMenteeExamId(id);
      const questionData = await examApi.getQuestionByExamId(menteeExam.examId);
      console.log('questionData', questionData);
      setQuestions(questionData);
      const answerData = await menteeExamApi.getAnswerByMenteeExamId(id);
      console.log('answerData', answerData);
      setAnswers(answerData);
    };
    fetchAnswers();
  }, []);

  const getAnswerByQuestionId = (questionId) => {
    return answers.find((answer) => answer.questionId === questionId);
  };

  const isOptionSelected = (questionId, optionIndex) => {
    const answer = getAnswerByQuestionId(questionId);
    return answer && answer.answeredOption === optionIndex;
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    const existingAnswer = getAnswerByQuestionId(questionId);
    const question = questions.find((q) => q.id === questionId);

    if (existingAnswer) {
      const updatedAnswers = answers.map((answer) =>
        answer.questionId === questionId
          ? {
              ...answer,
              answeredOption: optionIndex,
              isCorrect: question.options[optionIndex].isCorrect,
            }
          : answer
      );
      setAnswers(updatedAnswers);
    } else {
      // Create new answer
      const checkAnswer = newAnswers.find(
        (answer) => answer.questionId === questionId
      );
      if (checkAnswer) {
        const updatedAnswers = newAnswers.map((answer) =>
          answer.questionId === questionId
            ? {
                ...answer,
                answeredOption: optionIndex,
                isCorrect: question.options[optionIndex].isCorrect,
              }
            : answer
        );
        setNewAnswers(updatedAnswers);
      } else {
        const newAnswer = {
          menteeExamId: id,
          questionId: questionId,
          isCorrect: question.options[optionIndex].isCorrect,
          answeredOption: optionIndex,
          createdAt: new Date(),
        };

        setNewAnswers((prev) => [...prev, newAnswer]);
      }
    }
  };

  useEffect(() => {
    console.log('newAnswers', newAnswers);
  }, [newAnswers]);

  const handleSubmitExam = async () => {
    answers.map(async (answer) => {
      const res = await menteeExamApi.updateAnswer(answer.id, answer);
      console.log(res);
    });
    newAnswers.map(async (answer) => {
      const res = await menteeExamApi.createAnswer(answer);
      console.log(res);
    });
    if (newAnswers.length > 0) {
      const res = await menteeExamApi.updateNumberAnswer(id, newAnswers.length);
      console.log(res);
    }
    // toast.success('Nộp bài thành công', toastOptions);
    navigate('/mentee/exam-finish');
  };

  return (
    <Container>
      <QuestionContainer>
        <label style={{fontSize: '28px', fontWeight: 'bold'}}>Bài tập 1</label>
        {questions.map((item, index) => (
          <Question key={index}>
            <label style={{fontWeight: 'bold', marginRight: '4px'}}>
              Câu {index + 1}:
            </label>
            <label>{item.content}</label>
            <br />
            <label style={{fontWeight: 'bold', marginRight: '4px'}}>
              Đáp án:
            </label>
            <RadioGroup sx={{marginLeft: '10px'}}>
              {item.options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={i}
                  control={
                    <Radio
                      checked={isOptionSelected(item.id, i)}
                      onChange={() => handleAnswerChange(item.id, i)}
                    />
                  }
                  label={String.fromCharCode(65 + i) + '. ' + option.option}
                />
              ))}
            </RadioGroup>
          </Question>
        ))}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
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
            onClick={() => handleSubmitExam()}
          >
            Nộp bài
          </Button>
        </div>
      </QuestionContainer>
      <NumberContainer>
        <label
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            alignContent: 'center',
          }}
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

export default DoExam;
