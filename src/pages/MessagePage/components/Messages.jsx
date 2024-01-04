import React, { useEffect, useContext, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../index'
import firebaseInstance from '../../../services/firebase'
import { useParams } from 'react-router'
import { useUserStore } from '../../../store/userStore'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data, dispatch} = useContext(ChatContext)
  const {user, setUser} = useUserStore();
  const {id} = useParams();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const doc = await firebaseInstance.getMessages(data.chatId);
        setMessages(doc.messages);
        // Handle the document data here
      } catch (error) {
        console.error("Error:", error.message);
        // Handle the error (e.g., document not found)
      }    
    }

    data.chatId && getMessages();
  }, [data.chatId, messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const doc = await firebaseInstance.getChats(user.id);
        console.log(doc);
        dispatch ({type: 'CHANGE_USER', payload: doc[id].userInfo})
        // Handle the document data here
      } catch (error) {
        console.error("Error:", error.message);
        // Handle the error (e.g., document not found)
      }    
    }

    id && getMessages();
  }, [])

  return (
    <div className='bg-primary-100 p-3 h-[80%] overflow-y-scroll'>
      {messages.map((message) => {
        return (
          <Message key={message.id} message={message} />
        )
      })}
    </div>
  )
}

export default Messages