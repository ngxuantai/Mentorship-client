import ListAppliedMentor from './components/ListMentorItem';
import ListApplicationTest from './components/ListApplicationTest';
import {Label} from 'flowbite-react';
import styled from 'styled-components';

function LearningProgress() {
  return (
    <Container>
      <TitleContainer>
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Danh sách học thử
        </Label>
      </TitleContainer>
      <div style={{width: '95%'}}>
        <ListApplicationTest />
      </div>
      <TitleContainer>
        <Label style={{fontSize: '20px', fontWeight: 'bold'}}>
          Tiến trình học của bạn
        </Label>
      </TitleContainer>
      <div style={{width: '95%'}}>
        <ListAppliedMentor />
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding: 0 1rem;
`;

export default LearningProgress;
