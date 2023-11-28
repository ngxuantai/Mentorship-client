import React, {useState} from 'react';
import styled from 'styled-components';
import StepProgressBar from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import ProgressBar from './components/ProgressBar';
import AboutYou from './components/AboutYou';
import Profile from './components/Profile';
import Experience from './components/Experience';

export default function ApplyPage() {
  const [page, setPage] = useState('pageone');

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case '1':
        setPage('pageone');
        break;
      case '2':
        setPage('pagetwo');
        break;
      case '3':
        setPage('pagethree');
        break;
      default:
        setPage('pageone');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container>
        <ProgressBar page={page} onPageNumberClick={nextPageNumber} />
        {
          {
            pageone: <AboutYou onButtonClick={nextPage} />,
            pagetwo: <Profile onButtonClick={nextPage} />,
            pagethree: <Experience onButtonClick={nextPage} />,
          }[page]
        }
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  gap: 2rem;
  padding: 2rem;
  max-width: 900px;
  width: 90%;
`;
