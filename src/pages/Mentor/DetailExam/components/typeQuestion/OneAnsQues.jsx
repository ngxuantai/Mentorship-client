import React, {useState} from 'react';
import {TextField, Button, Alert} from '@mui/material';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import examApi from '../../../../../api/exam';
import styled from 'styled-components';
import {TextInput} from 'flowbite-react';

export default function OneAnsQues({examId, addQuestion, cancelAddQues}) {
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
  };

  const checkCorrectAnswer = () => {
    options.forEach((item) => {
      if (item.isCorrect) {
        return true;
      }
    });
    return false;
  };

  const resetOptions = () => {
    options.forEach((item) => {
      item.isCorrect = false;
    });
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
    let hasError = false;

    if (question === '') {
      toast.error('Vui lòng nhập nội dung câu hỏi', toastOptions);
      hasError = true;
    } else if (options.length < 2) {
      toast.error('Vui lòng nhập ít nhất 2 đáp án', toastOptions);
      hasError = true;
    } else {
      if (options.some((item) => item.option === '')) {
        toast.error('Vui lòng nhập đáp án', toastOptions);
        hasError = true;
      } else {
        if (!options.some((item) => item.isCorrect === true)) {
          toast.error('Vui lòng chọn đáp án đúng', toastOptions);
          hasError = true;
        }
      }
    }

    if (!hasError) {
      const data = {
        examId: examId,
        type: 0,
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
      <TextInput
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <label>Đáp án: </label>
      {options.map((item, index) => (
        <OptionConatainer key={index} sx>
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
          <div style={{width: '100%'}}>
            <TextInput
              type="text"
              style={{width: '100%'}}
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
          </div>
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
          // variant="outlined"
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
          type="text"
          value={explain}
          onChange={(e) => setExplain(e.target.value)}
          variant="outlined"
          size="small"
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

// const QuestionTypeSelector = styled.div`
//   display: flex;
//   flex-deirection: row;

//   .question-type {
//     padding: 4px 8px;
//     border: 1px solid #ccc;
//     cursor: pointer;
//   }

//   .selected {
//     background-color: #4caf50;
//     color: #fff;
//   }
// `;

const OptionConatainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  //   .option-letter {
  //     font-weight: bold;
  //     // width: 20px;
  //   }
`;
