import React, {useState} from 'react';
import {Button} from '@mui/material';
import OneAnsQues from './typeQuestion/OneAnsQues';
import MultipleAnsQues from './typeQuestion/MultiAnsQues';
import TrueFalseQues from './typeQuestion/TrueFalseQues';
import styled from 'styled-components';

export default function AddQuestion({addQuestion, cancelAddQues}) {
  const questionType = [
    {
      type: 'oneAnswer',
      name: 'Một đáp án',
    },
    {
      type: 'multipleAnswer',
      name: 'Nhiều đáp án',
    },
    {
      type: 'trueFalse',
      name: 'Đúng hay sai',
    },
  ];

  const [selectedType, setSelectedType] = useState('oneAnswer');

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  return (
    <Container>
      <label>Loại đề</label>
      <QuestionTypeSelector>
        {questionType.map((item) => (
          <Button
            key={item.type}
            size="small"
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              '&:hover': {
                opacity: 0.5,
              },
            }}
            className={`question-type ${
              selectedType === item.type ? 'selected' : ''
            }`}
            onClick={() => handleTypeClick(item.type)}
          >
            {item.name}
          </Button>
        ))}
      </QuestionTypeSelector>
      {selectedType && (
        <>
          {selectedType === 'oneAnswer' && (
            <OneAnsQues
              addQuestion={addQuestion}
              cancelAddQues={cancelAddQues}
            />
          )}
          {selectedType === 'multipleAnswer' && (
            <MultipleAnsQues
              addQuestion={addQuestion}
              cancelAddQues={cancelAddQues}
            />
          )}
          {selectedType === 'trueFalse' && (
            <TrueFalseQues
              addQuestion={addQuestion}
              cancelAddQues={cancelAddQues}
            />
          )}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 600px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;

const QuestionTypeSelector = styled.div`
  display: flex;
  flex-deirection: row;
  gap: 10px;

  .question-type {
    color: black;
    padding: 4px 8px;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .selected {
    background-color: #4caf50;
    color: #fff;
    &:hover {
      background-color: #4caf50;
    }
  }
`;

const OptionConatainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
