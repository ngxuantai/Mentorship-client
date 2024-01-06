import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react';
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { ChatContext } from '../index';
import { useUserStore } from '../../../store/userStore';

const Message = ({message}) => {
  const {data} = useContext(ChatContext)
  const ref = useRef(null);
  const {user, setUser} = useUserStore();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  

  return (
    <div className={`flex gap-[10px] mb-2 ${message.sender === user.id ? 'flex-row-reverse' : ''}`} 
        ref={ref}>
        <div className='flex flex-col'>
            <img className='w-[40px] h-[40px] object-cover rounded-full'
                src={message.sender === user.id ? user.avatar : data.user.avatar}
            ></img>
            {/* <span className='text-sm'>just now</span> */}
        </div>
        <div className='max-w-[80%] flex flex-col gap-[5px] '>
            <p className={`border px-3 py-2 break-words
                          ${message.sender === user.id 
                          ? 'bg-primary-600 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg'
                          : 'bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg'}`}>
              {message.text}
            </p>
        </div>
    </div>
  )
}

export default Message
