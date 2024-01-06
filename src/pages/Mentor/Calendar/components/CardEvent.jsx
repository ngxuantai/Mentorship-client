import {Divider} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import moment from 'moment';

import {useEffect, useRef, useState} from 'react';
import learningProgressApi from '../../../../api/learningProgress';
import menteeApi from '../../../../api/mentee';
import menteeApplicationApi from '../../../../api/menteeApplication';
import {mappingPlanName} from '../../../../utils/dataHelper';

export function CardEvent({event, onClick}) {
  const theme = useTheme();
  const cardRef = useRef(null);
  const [application, setApplication] = useState();
  const [learningProgress, setLearingProgress] = useState();

  const fetchApplication = async () => {
    return await menteeApplicationApi.getMenteeApplicationById(
      event.applicationId
    );
  };
  const fetchMentee = async (menteeId) => {
    return await menteeApi.getMentee(menteeId);
  };
  const fetchLearningProgress = async (applicationId) => {
    return await learningProgressApi.getLearningProgressByApplicationId(
      applicationId
    );
  };
  const getEndDate = () => {
    if (!application) return '';
    const applicationDate = new Date(application.applicationDate);
    return applicationDate.setDate(
      applicationDate.getDate() + application.plan.weeks * 7
    );
  };
  useEffect(() => {
    (async () => {
      if (!event) return;

      const applicationData = await fetchApplication();
      console.log('applicationData', applicationData);

      const mentee = await fetchMentee(applicationData.menteeProfile.id);
      console.log('applicationData mentee', mentee);

      const applicationWithMentee = {...applicationData, mentee};
      setApplication(applicationWithMentee);
      const progress = await fetchLearningProgress(applicationData.id);
      setLearingProgress(progress);
    })();
  }, [event]);
  return (
    <Card
      onClick={() => onClick(event)}
      sx={{
        display: 'flex',
        // height: 180,
        width: '40%',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        // backgroundColor: `${event.color}`,
        // '&:hover': {
        //   boxShadow: '0 4px 25px -6.125px rgba(0,0,0,0.3)',
        //   transform: 'translateY(-1px) translateX(-1px)',
        // },
      }}
    >
      {application && (
        <Box sx={{width: '100%'}}>
          <CardHeader
            avatar={
              <Avatar
                sx={{width: '70px', height: '70px'}}
                aria-label="recipe"
                src={application?.menteeProfile.avatar}
              />
            }
            title={
              application?.menteeProfile.firstName +
              ' ' +
              application?.menteeProfile.lastName
            }
            sx={{
              width: '100%',
              backgroundColor: `${event.color}`,
              '.MuiCardHeader-title': {
                fontSize: '22px',
                fontWeight: 'bold',
              },
            }}
          />
          <Box
            sx={{display: 'flex', flexDirection: 'column', flex: '3 5 auto'}}
          >
            <CardContent>
              <Typography component="div" sx={{paddingBottom: '6px'}}>
                Gói học: {mappingPlanName(application?.plan.name)}
              </Typography>
              <Typography component="div" sx={{paddingBottom: '6px'}}>
                Số lượt gọi còn lại:{' '}
                {`${
                  learningProgress?.callTimesLeft || application?.plan.callTimes
                }`}{' '}
              </Typography>
              <Typography component="div">
                Ngày kết thúc:{' '}
                {learningProgress
                  ? //learningProgress.endDate is counted when user pay the learning plan
                    // not when application approved by mentor
                    moment(learningProgress?.endDate).format('DD-MM-yyyy')
                  : moment(getEndDate()).format('DD-MM-yyyy')}{' '}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      )}
    </Card>
  );
}
