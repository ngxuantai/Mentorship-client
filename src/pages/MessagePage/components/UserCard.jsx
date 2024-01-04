import React, {useState, useEffect} from 'react';
import {useContext} from 'react';
import {ChatContext} from '../index';
import {AccountBox, Assignment} from '@mui/icons-material';
import {Button} from 'flowbite-react';
import {useUserStore} from '../../../store/userStore';
import ViewDetailMentee from '../../Mentor/ListMentee/components/ViewDetailMentee';
import AddExam from '../../Mentor/ListMentee/components/AddExam';
import menteeApplicationApi from '../../../api/menteeApplication';
import {UserRole} from '../../../constants/index';
import {useNavigate} from 'react-router-dom';

const UserCard = () => {
  const {data} = useContext(ChatContext);
  const {user, setUser} = useUserStore();
  const navigate = useNavigate();
  const [application, setApplication] = useState();
  const [buttonText, setButtonText] = useState(
    user.role === 'mentor' ? 'Gửi bài tập' : 'Bài tập'
  );

  useEffect(() => {
    const fetchApplication = async () => {
      if (user.role === UserRole.MENTOR) {
        const res =
          await menteeApplicationApi.getMenteeApplicationByMenteeIdAndMentorId(
            data.user.id,
            user.id
          );
        setApplication(res);
      } else {
        const res =
          await menteeApplicationApi.getMenteeApplicationByMenteeIdAndMentorId(
            user.id,
            data.user.id
          );
        setApplication(res);
      }
    };

    fetchApplication();
  }, []);

  const handleNavigateProfile = () => {
    navigate(`/mentor/profile/${data.user.id}`);
  };

  return (
    <div className="flex-[1] flex flex-col items-center text-center p-5 bg-primary-100">
      <img
        className="w-[200px] h-[200px] object-cover rounded-full"
        src={data.user?.avatar}
      ></img>
      <h3 className="text-black mt-3">
        {data.user?.firstName} {data.user?.lastName}
      </h3>
      <div className="flex">
        {application ? (
          <>
            {user.role === UserRole.MENTOR ? (
              <div className=" mt-4  px-3 py-2 flex flex-col items-center justify-center  cursor-pointer">
                <ViewDetailMentee application={application} />
              </div>
            ) : (
              <div className=" mt-4  px-3 py-2 flex flex-col items-center justify-center  cursor-pointer">
                <Button
                  color="blue"
                  size="sm"
                  onClick={() => handleNavigateProfile()}
                >
                  <div className="flex items-center gap-x-2">
                    <AccountBox className="text-white" />
                    Trang cá nhân
                  </div>
                </Button>
              </div>
            )}
          </>
        ) : null}
        {application ? (
          <>
            {user.role === UserRole.MENTOR ? (
              <div className=" mt-4 py-2 flex flex-col items-center justify-center  cursor-pointer">
                <AddExam application={application} />
              </div>
            ) : (
              <div className=" mt-4 py-2 flex flex-col items-center justify-center  cursor-pointer">
                <Button color="blue" size="sm">
                  <div className="flex items-center gap-x-2">
                    <Assignment className="text-white" />
                    Bài tập
                  </div>
                </Button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default UserCard;
