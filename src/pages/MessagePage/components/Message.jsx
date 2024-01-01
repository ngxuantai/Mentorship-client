import React from 'react'
import { useState, useEffect, useContext, useRef } from 'react';
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { ChatContext } from '../index';

//const currentUserId = '65840127a47c189dd995cdf3';
//const currentUser = await mentorApi.getMentorById(currentUserId)

 const currentUserId = '658b162cae49ca742c25fd2a';
// const currentUser = await menteeApi.getMentee(currentUserId)

var currentUser = await mentorApi.getMentorById(currentUserId);
if (currentUser === '') {
  currentUser = await menteeApi.getMentee(currentUserId);
}

const Message = ({message}) => {
  const {data} = useContext(ChatContext)
  const ref = useRef(null);



  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message])

  return (
    <div className={`flex gap-[10px] mb-2 ${message.sender === currentUser.id ? 'flex-row-reverse' : ''}`} 
        ref={ref}>
        <div className='flex flex-col'>
            <img className='w-[40px] h-[40px] object-cover rounded-full'
                src={message.sender === currentUser.id ? currentUser.avatar : data.user.avatar}
            ></img>
            {/* <span className='text-sm'>just now</span> */}
        </div>
        <div className='max-h-[80%] flex flex-col gap-[5px]'>
            <p className={`border px-3 py-2 
                          ${message.sender === currentUser.id 
                          ? 'bg-primary-600 text-white rounded-tl-lg rounded-br-lg rounded-bl-lg'
                          : 'bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg'}`}>
              {message.text}
            </p>
        </div>
    </div>
  )
}

export default Message
