import React, { useEffect } from 'react'
import { useContext} from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../index';
import { useUserStore } from '../../../store/userStore';
import { useParams } from 'react-router';
import { VideoChat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const MessageContainer = () => {
  const {user, setUser} = useUserStore();
  const {data} = useContext(ChatContext)
  const navigate = useNavigate();

  const combinedId = user.id > data.user?.id ? user.id + data.user?.id : data.user?.id + user.id;

    return (
    <div className='flex-[2]'>
        <div className='h-[10%] flex p-2 bg-primary-600 items-center justify-between'>
          <div className='flex items-center'> 
            <img className='w-[40px] h-[40px] object-cover rounded-full mx-2'
                src={data.user?.avatar}
            ></img>
            <span className='text-white'>{data.user?.firstName} {data.user?.lastName}</span>
          </div>
          <VideoChat className='ml-auto text-white cursor-pointer scale-[1.5] mx-3'
          onClick={() => navigate(`/videochat/${combinedId}`)}/>
        </div>
        <Messages/>
        <Input />
    </div>
  )
}
