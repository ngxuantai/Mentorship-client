import React, {useState} from 'react';
import {TextField, Button, Alert} from '@mui/material';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from 'styled-components';

export default function TrueFalseQues({addQuestion, cancelAddQues}) {
  const [question, setQuestion] = useState('');

  const [options, setOptions] = useState([
    {
      option: 'Đúng',
      isCorrect: false,
    },
    {
      option: 'Sai',
      isCorrect: false,
    },
  ]);

  const [explain, setExplain] = useState('');
  const [showExplain, setShowExplain] = useState(false);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const resetOptions = () => {
    options.forEach((item) => {
      item.isCorrect = false;
    });
  };

  const handleSaveQuestion = async () => {
    let hasError = false;
    if (question === '') {
      toast.error('Vui lòng nhập nội dung câu hỏi', toastOptions);
      hasError = true;
    } else if (!options.some((item) => item.isCorrect === true)) {
      toast.error('Vui lòng chọn đáp án đúng', toastOptions);
      hasError = true;
    } else {
      const data = {
        examId: examId,
        type: 2,
        content: question,
        options: options,
        explain: explain,
      };

      const res = await examApi.createQuestion(data);
      addQuestion(res.data);
      resetData();
      toast.success('Lưu câu hỏi thành công', toastOptions);
    }
  };

  const resetData = () => {
    setQuestion('');
    options.map((item) => {
      item.isCorrect = false;
      item.option = '';
    });
    setExplain('');
  };

  return (
    <Container>
      <label>Nội dung câu hỏi:</label>
      <TextField
        hiddenLabel
        type="text"
        value={question}
        size="small"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <label>Chọn đáp án đúng</label>
      {options.map((item, index) => (
        <OptionContainer key={index}>
          <button
            style={{
              backgroundColor: item.isCorrect ? '#4caf50' : 'white',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              resetOptions();
              setOptions([
                ...options.slice(0, index),
                {
                  option: item.option,
                  isCorrect: !item.isCorrect,
                },
                ...options.slice(index + 1),
              ]);
            }}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
          </button>
          <div
            style={{
              width: '40%',
              padding: '8.5px 12px',
              border: '1px solid gray',
              borderRadius: '4px',
            }}
          >
            <label>{item.option}</label>
          </div>
        </OptionContainer>
      ))}
      <div>
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: 'black',
            textTransform: 'none',
            fontSize: '16px',
            border: '1px solid #ccc',
          }}
          onClick={() => setShowExplain(!showExplain)}
        >
          Thêm giải thích
        </Button>
      </div>
      {showExplain && (
        <TextField
          multiline
          label="Giải thích"
          size="small"
          type="text"
          value={explain}
          onChange={(e) => setExplain(e.target.value)}
          sx={{
            width: '100%',
            fontSize: '1rem',
            '& textarea': {
              minHeight: '8rem',
              resize: 'vertical',
            },
          }}
        />
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
          onClick={() => handleSaveQuestion()}
        >
          Lưu câu hỏi
        </Button>
        <Button
          size="small"
          variant="contained"
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
          onClick={() => cancelAddQues()}
        >
          Hủy
        </Button>
      </div>
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const OptionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
