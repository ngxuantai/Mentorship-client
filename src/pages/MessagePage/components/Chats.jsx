import React from 'react'
import { useState, useEffect, useContext } from 'react';
import firebaseInstance from '../../../services/firebase';
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { ChatContext } from '../index';

//const currentUserId = '65840127a47c189dd995cdf3';
//const currentUser = await mentorApi.getMentorById(currentUserId);

const currentUserId = '658b162cae49ca742c25fd2a';
// const currentUser = await menteeApi.getMentee(currentUserId)

var currentUser = await mentorApi.getMentorById(currentUserId);
if (currentUser === '') {
  currentUser = await menteeApi.getMentee(currentUserId);
}

const Chats = () => {
  const [chats, setChats] = useState([])
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await firebaseInstance.getChats(currentUser.id);
        setChats(data);
        // Handle the document data here
      } catch (error) {
        console.error("Error:", error.message);
        // Handle the error (e.g., document not found)
      }    
    }

    currentUser.id && getChats();
  }, [chats])

  //console.log(Object.entries(chats));

  const handleSelect = (u) => {
    dispatch({type: 'CHANGE_USER', payload: u})
  };

  return (
    <div className='flex flex-col items-center gap-2 text-white cursor-pointer'>
      {Object.entries(chats).sort((a,b) => b[1].date - a[1].date).map((chat) => {
        return (
          <div key={chat[0]} className='flex w-full py-2 px-3 rounded-md hover:bg-cyan-700'
              onClick={() => handleSelect(chat[1].userInfo)}>
            <img className='bg-white h-[60px] w-[60px] rounded-full object-cover'
              src={chat[1].userInfo.avatar}></img>
            <div className='px-2'>
              <span className='text-lg '>{chat[1].userInfo.firstName} {chat[1].userInfo.lastName}</span>
              <p className='text-primary-300'>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        )
      })}


    </div>
  )
}

export default Chats