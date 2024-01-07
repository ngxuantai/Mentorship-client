import React, {useEffect, useState} from 'react';
import {List} from 'flowbite-react';
import TestProgressItem from './TestProgressItem';
import {ToastContainer, toast} from 'react-toastify';
import ReactLoading from 'react-loading';
import learningTestProgressApi from '../../../../api/learningTestProgress';
import menteeApplicationApi from '../../../../api/menteeApplication';
import mentorApi from '../../../../api/mentor';
import {useUserStore} from '../../../../store/userStore';
import {mappingPlanName} from '../../../../utils/dataHelper';
import {convertTimestampRange} from '../../../../utils/dateConverter';

export default function ListApplicationTest() {
  const {user, setUser} = useUserStore();
  const [testProgressList, setTestProgressList] = useState([]);

  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        const data = await learningTestProgressApi.getByMenteeId(user.id);
        if (data) {
          const list = data.sort((a, b) => {
            const dateA = new Date(a.endDate).getTime();
            const dateB = new Date(b.endDate).getTime();
            return dateB - dateA;
          });
          console.log('getLearningTestProgressByMenteeId', List);
          setTestProgressList(list);
        }
      };
      fetchProgress();
    }
  }, [user]);

  const cancelProgress = async (progress) => {
    const progressIdToDelete = progress.id;
    const updatedTestProgressList = testProgressList.filter(
      (item) => item.id !== progressIdToDelete
    );
    setTestProgressList(updatedTestProgressList);
  };

  return (
    <>
      {testProgressList.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}
        >
          {testProgressList.map((progress) => (
            <TestProgressItem
              key={progress.id}
              progress={progress}
              cancelProgress={() => cancelProgress(progress)}
            />
          ))}

          <ToastContainer />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100px',
            margin: '0 auto',
          }}
        >
          <ReactLoading type="spin" color="blue" />
        </div>
      )}
    </>
  );
}
