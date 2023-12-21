import React, {useState} from 'react';
import {TextField, Button, Alert} from '@mui/material';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from 'styled-components';

export default function MultiAnsQues({addQuestion, cancelAddQues}) {
  const [question, setQuestion] = useState('');

  const [options, setOptions] = useState([
    {
      option: '',
      isCorrect: false,
    },
    {
      option: '',
      isCorrect: false,
    },
    {
      option: '',
      isCorrect: false,
    },
    {
      option: '',
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

  const checkCorrectAnswer = () => {
    let totalCorrect = 0;
    options.forEach((item) => {
      if (item.isCorrect) {
        totalCorrect++;
      }
    });
    return totalCorrect;
  };

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        option: '',
        isCorrect: false,
      },
    ]);
  };

  const handleDeleteOption = (index) => {
    setOptions([...options.slice(0, index), ...options.slice(index + 1)]);
  };

  const handleSaveQuestion = async () => {
    console.log(question);
    console.log(options);
    let hasError = false;

    if (question === '') {
      toast.error('Vui lòng nhập nội dung câu hỏi', toastOptions);
      hasError = true;
    }
    if (options.length < 2) {
      toast.error('Vui lòng nhập ít nhất 2 đáp án', toastOptions);
      hasError = true;
    } else {
      const totalCorrect = checkCorrectAnswer();
      if (totalCorrect === 0) {
        toast.error('Vui lòng chọn ít nhất 1 đáp án đúng', toastOptions);
        hasError = true;
      }
      if (totalCorrect === options.length) {
        toast.error(
          'Số lượng đáp án đúng không được bằng số lượng đáp án',
          toastOptions
        );
        hasError = true;
      }
    }

    if (!hasError) {
      const data = {
        examId: examId,
        type: 1,
        content: question,
        options: options,
        explain: explain || '',
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
      <label>Đáp án: </label>
      {options.map((item, index) => (
        <OptionConatainer key={index}>
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
          <TextField
            hiddenLabel
            size="small"
            type="text"
            sx={{width: '100%'}}
            value={item.option}
            onChange={(e) =>
              setOptions([
                ...options.slice(0, index),
                {
                  option: e.target.value,
                  isCorrect: item.isCorrect,
                },
                ...options.slice(index + 1),
              ])
            }
          />
          <button
            type="button"
            style={{
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              padding: '0',
            }}
            onClick={() => handleDeleteOption(index)}
          >
            <RemoveCircleIcon style={{color: 'red'}} />
          </button>
        </OptionConatainer>
      ))}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <Button
          size="small"
          variant="outlined"
          sx={{
            color: 'black',
            textTransform: 'none',
            fontSize: '16px',
            border: '1px solid #ccc',
          }}
          onClick={() => handleAddOption()}
        >
          Thêm đáp án
        </Button>
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
      {/* {alert && <Alert severity={alert.type}>{alert.message}</Alert>} */}
      <ToastContainer />
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

const QuestionTypeSelector = styled.div`
  display: flex;
  flex-deirection: row;

  .question-type {
    padding: 4px 8px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .selected {
    background-color: #4caf50;
    color: #fff;
  }
`;

const OptionConatainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
