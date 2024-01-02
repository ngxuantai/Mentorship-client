import React from 'react'
import { useState, useContext, useEffect } from 'react';
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { ChatContext } from '../index';
import firebaseInstance from '../../../services/firebase';
import { Timestamp } from 'firebase/firestore';
import {v4 as uuid} from 'uuid';
import { Send } from '@mui/icons-material';
import { useUserStore } from '../../../store/userStore';


const Input = () => {
    const [text, setText] = useState('')
    const {data} = useContext(ChatContext)
    const {user, setUser} = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (text === '') return;

        try{
            firebaseInstance.sendMessage(data.chatId, {
                id: uuid(),
                text,
                sender: user.id,
                receiver: data.user.id,
                date: Timestamp.now(),
            })

            firebaseInstance.updateLastMessage(user.id, data.chatId, {
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
