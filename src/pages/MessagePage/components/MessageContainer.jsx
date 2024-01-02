import React, { useEffect } from 'react'
import { useContext} from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../index';
import { useUserStore } from '../../../store/userStore';
import { useParams } from 'react-router';

export const MessageContainer = () => {
  const {user, setUser} = useUserStore();
  const {data} = useContext(ChatContext)

 
    return (
    <div className='flex-[2]'>
        <div className='h-[10%] flex p-2 bg-primary-600 items-center'>
            <img className='w-[40px] h-[40px] object-cover rounded-full mx-2'
                src={data.user?.avatar}
            ></img>
            <span className='text-white'>{data.user?.firstName} {data.user?.lastName}</span>
        </div>
        <Messages/>
        <Input />
    </div>
  )
}
