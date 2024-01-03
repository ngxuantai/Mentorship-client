import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  CardActions,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Button, Progress} from 'flowbite-react';
import CancelTestProgress from './CancelTestProgress';
import moment from 'moment';
import {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import menteeApplicationApi from '../../../../api/menteeApplication';
import mentorApi from '../../../../api/mentor';
import {mappingPlanName} from '../../../../utils/dataHelper';
import {convertTimestampRange} from '../../../../utils/dateConverter';
import {useUserStore} from '../../../../store/userStore';

export default function TestProgressItem({progress, cancelProgress}) {
  const cardRef = useRef(null);
  const [mentor, setMentor] = useState(null);
  const [application, setApplication] = useState(null);
  const [endTry, setEndTry] = useState(false);
  const [remainingPercent, setRemainingPercent] = useState(0);
  const {user, setUser} = useUserStore();
  const navigate = useNavigate();

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

  const checkEndDate = () => {
    const endDate = new Date(progress.endDate).getTime();
    const current = new Date().getTime();
    if (endDate >= current) {
      setEndTry(true);
    }
  };

  const handleCallClick = () => {};

  const handleChatClick = () => {
    if (chatDisabled) {
      return;
    }
  };

  const handleButton = () => {
    if (endTry) {
      // xử lý thanh toán
    } else {
      // xử lý nhắn tin
      const combinedId = user.id > mentor.id ? user.id + mentor.id : mentor.id + user.id;
      navigate(`/message/${combinedId}`)
      console.log(combinedId);
    }
  }

  const computeRemainPercent = () => {
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
      setRemainingPercent(0);
    }
  };

  useEffect(() => {
    fetchMentor();
    fetchApplication();
    computeRemainPercent();
  }, []);

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
          <CancelTestProgress
            progress={progress}
            cancelProgress={cancelProgress}
          />
          <Tooltip title={endTry ? 'Thanh toán và tiếp tục học' : 'Nhắn tin'}>
            <Button size="sm" onClick={() => handleButton()}>
              {endTry ? 'Thanh toán' : 'Nhắn tin'}
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
}
