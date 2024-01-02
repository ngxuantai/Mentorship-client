import ChatIcon from '@mui/icons-material/Chat';
import {Divider} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Tooltip from '@mui/material/Tooltip';
import {Button, Progress} from 'flowbite-react';
import {List} from 'flowbite-react';
import moment from 'moment';

import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import learningProgressApi from '../../../../api/learningProgress';
import menteeApplicationApi from '../../../../api/menteeApplication';
import mentorApi from '../../../../api/mentor';
import {useUserStore} from '../../../../store/userStore';
import {mappingPlanName} from '../../../../utils/dataHelper';
import {convertTimestampRange} from '../../../../utils/dateConverter';

const ListAppliedMentor = () => {
  const navigate = useNavigate();
  const {user, setUser} = useUserStore();
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchProgress = async () => {
        const data = await learningProgressApi.getLearningProgressByMenteeId(
          user.id
        );
        if (data) {
          const list = data.sort((a, b) => {
            const dateA = new Date(a.endDate).getTime();
            const dateB = new Date(b.endDate).getTime();
            return dateB - dateA;
          });
          console.log('getLearningProgressByMenteeId', List);
          setProgressList(list);
        }
      };
      fetchProgress();
    }
  }, [user]);

  const handleOnClick = (mentorId) => {
    navigate(`/profile/${mentorId}`);
  };

  const renderMentorItems = () => {
    return progressList.map((progress) => (
      <ProgressItem
        key={progress.id}
        onClick={() => handleOnClick(progress)}
        progress={progress}
      />
    ));
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
      }}
    >
      {renderMentorItems()}
    </div>
  );
};

export default ListAppliedMentor;

function ProgressItem({progress, onClick}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const cardRef = useRef(null);
  const [mentor, setMentor] = useState(null);
  const [remainingPercent, setRemainingPercent] = useState(100);
  const [application, setApplication] = useState(null);
  const {user, setUser} = useUserStore();
  const fetchApplication = async () => {
    const data = await menteeApplicationApi.getMenteeApplicationById(
      progress.applicationId
    );
    console.log('applicationapplication', data);

    setApplication(data);
  };
  const fetchMentor = async () => {
    const data = await mentorApi.getMentorById(progress.mentorId);
    setMentor(data);
  };

  function handleCallClick() {}

  function handleChatClick() {
    const combinedId = user.id > mentor.id ? user.id + mentor.id : mentor.id + user.id;
    navigate(`/message/${combinedId}`);
  }
  function computeRemainPercent() {
    const startDate = new Date(progress.startDate).getTime();
    const endDate = new Date(progress.endDate).getTime();
    const current = new Date().getTime();
    if (progress.end < current) {
      setRemainingPercent(0);
    } else {
      const percent = (
        ((current - startDate) / (endDate - startDate)) *
        100
      ).toFixed(2);
      setRemainingPercent(percent);
    }
  }
  useEffect(() => {
    fetchMentor();
    fetchApplication();
    computeRemainPercent();
  }, []);
  console.log('remaingnPercent', remainingPercent);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(-${remainingPercent}%)`;
    }
  }, [remainingPercent]);
  return (
    <Card
      sx={{
        margin: '20px 0px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        borderBottom: `${remainingPercent}% solid #123b2a`,
        '&:hover': {
          boxShadow: '0 4px 25px -6.125px rgba(0,0,0,0.3)',
          transform: 'translateY(-1px) translateX(-1px)',
        },
      }}
    >
      <Box sx={{width: '100%'}}>
        <CardHeader
          avatar={
            <Avatar sx={{width: '70px', height: '70px'}} aria-label="recipe">
              R
            </Avatar>
          }
          title={mentor?.firstName + ' ' + mentor?.lastName}
          subheader={mentor?.jobTitle}
          sx={{
            width: '100%',
            backgroundColor: '#2d966b',
            '.MuiCardHeader-title': {
              fontSize: '22px',
              fontWeight: 'bold',
            },
          }}
        />
        <Box sx={{display: 'flex', flexDirection: 'column', flex: '3 5 auto'}}>
          <CardContent>
            {application?.learningTime.map((time) => {
              return (
                <Chip
                  style={{margin: '3px 0px'}}
                  label={convertTimestampRange(time.start, time.end)}
                />
              );
            })}
            <Typography component="div" sx={{paddingBottom: '6px'}}>
              Số lượt gọi còn lại: {`${progress?.callTimesLeft}`}
            </Typography>
            <Typography component="div">
              Ngày kết thúc: {moment(progress?.endDate).format('DD/MM/yyyy')}
            </Typography>
            <Progress progress={remainingPercent} style={{paddingTop: '8px'}} />
          </CardContent>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '6px',
            flexDirection: 'row',
            gap: '6px',
          }}
        >
          <Button size="sm" onClick={handleChatClick}>
            Nhắn tin{' '}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
