import React from 'react'
import { useState, useContext, useEffect } from 'react';
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { ChatContext } from '../index';
import firebaseInstance from '../../../services/firebase';
import { Timestamp } from 'firebase/firestore';
import {v4 as uuid} from 'uuid';
import { Send } from '@mui/icons-material';

//const currentUserId = '65840127a47c189dd995cdf3';
//const currentUser = await mentorApi.getMentorById(currentUserId)

const currentUserId = '658b162cae49ca742c25fd2a';
// const currentUser = await menteeApi.getMentee(currentUserId)

var currentUser = await mentorApi.getMentorById(currentUserId);
if (currentUser === '') {
  currentUser = await menteeApi.getMentee(currentUserId);
}

const Input = () => {
    const [text, setText] = useState('')
    const {data} = useContext(ChatContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text === '') return;

        try{
            firebaseInstance.sendMessage(data.chatId, {
                id: uuid(),
                text,
                sender: currentUser.id,
                receiver: data.user.id,
                date: Timestamp.now(),
            })

            firebaseInstance.updateLastMessage(currentUser.id, data.chatId, {
                text,
            })

            firebaseInstance.updateLastMessage(data.user.id, data.chatId, {
                text,
            })
            setText('')
        }
        catch(err){
            console.log(err)
        }

    };

  return (
    <div>
        <form onSubmit={handleSubmit} 
            className='flex items-center justify-between p-3 h-[10%] bg-primary-800'>
            <input className='border-none rounded-lg outline-none p-2 mr-3 w-full'
                type="text" 
                placeholder="Type a message" 
                value={text}
                onChange={(e) => setText(e.target.value)}/>
            <button type='submit'>
                <Send className='text-white'/>
            </button>
        </form>
    </div>
  )
}

export default Input
