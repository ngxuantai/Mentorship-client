import ListAppliedMentor from './components/ListMentorItem';
import ListApplicationTest from './components/ListApplicationTest';
import {Label} from 'flowbite-react';

function LearningProgress() {
  return (
    <div>
      <div className="px-5 py-5">
        <Label style={{fontSize: '24px', fontWeight: 'bold'}}>
          Danh sách học thử
        </Label>
        <ListApplicationTest />
        <Label style={{fontSize: '24px', fontWeight: 'bold'}}>
          Tiến trình học của bạn
        </Label>
        <ListAppliedMentor></ListAppliedMentor>
      </div>
    </div>
  );
}

export default LearningProgress;
