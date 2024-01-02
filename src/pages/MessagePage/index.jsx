import React, { useEffect } from 'react'
import { MessageContainer } from './components/MessageContainer'
import SideBar from './components/SideBar'
import { createContext, useReducer, useState } from 'react';
import { useParams } from 'react-router';
import mentorApi from '../../api/mentor';
import UserCard from './components/UserCard';
import { ChatBubbleOutline } from '@mui/icons-material';
import menteeApi from '../../api/mentee';
import { useUserStore } from '../../store/userStore';
import firebaseInstance from '../../services/firebase';

export const ChatContext = createContext();


const MessagePage = () => {
  const INITIAL_STATE ={
      chatId: 'null',
      user:{}
  }
  const {user, setUser} = useUserStore();
  const {id} = useParams();

  const chatReducer = (state, action) => {
      switch(action.type){
          case 'CHANGE_USER':
              return {
                    user: action.payload,
                    chatId:
                        user.id > action.payload.id
                            ? user.id + action.payload.id
                            : action.payload.id + user.id,
                }
          default:
              return state
        }
    }

    useEffect(() => {
        const loadMessage = async () => {
          try {
            const combinedId = user.id > id ? user.id + id : id + user.id;
            const doc = await firebaseInstance.getChats(user.id);
            console.log(doc[combinedId].userInfo);
            dispatch ({type: 'CHANGE_USER', payload: doc[combinedId].userInfo})
            
          } catch (error) {
            console.error("Error:", error.message);
            // Handle the error (e.g., document not found)
          }    
        }
        loadMessage();
    }, [])

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{data: state, dispatch}}>
    <div className='bg-white h-screen flex justify-center items-center'>
        <div className='border border-black w-screen h-screen flex overflow-hidden'>
            <SideBar />
            {Object.entries(state)[0][1] === 'null' &&
                <div className='flex-[3] flex flex-col justify-center items-center'>
                    <ChatBubbleOutline className='scale-[4.0]'/>
                    <p className='text-xl mt-5'>Chọn người dùng để chat</p>
                </div>
            }
            {Object.entries(state)[0][1] !== 'null' &&
              <div className=' flex-[3] flex'>
                  <MessageContainer />
                  <UserCard />
              </div>
              
            
            }


        </div>
    </div>
    </ChatContext.Provider>
    
  )
}

export default MessagePage
