import React from 'react'
import { MessageContainer } from './components/MessageContainer'
import SideBar from './components/SideBar'
import { createContext, useReducer, useState } from 'react';
import mentorApi from '../../api/mentor';
import UserCard from './components/UserCard';
import { ChatBubbleOutline } from '@mui/icons-material';
import menteeApi from '../../api/mentee';

//const currentUserId = '65840127a47c189dd995cdf3';
//const currentUser = await mentorApi.getMentorById(currentUserId)
const currentUserId = '658b162cae49ca742c25fd2a';

var currentUser = await mentorApi.getMentorById(currentUserId);
if (currentUser === '') {
  currentUser = await menteeApi.getMentee(currentUserId);
}

console.log(currentUser);

export const ChatContext = createContext();


const MessagePage = () => {
  const INITIAL_STATE ={
      chatId: 'null',
      user:{}
  }

  const chatReducer = (state, action) => {
      switch(action.type){
          case 'CHANGE_USER':
              return {
                    user: action.payload,
                    chatId:
                        currentUser.id > action.payload.id
                            ? currentUser.id + action.payload.id
                            : action.payload.id + currentUser.id,
                }

          default:
              return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{data: state, dispatch}}>
    <div className='bg-white h-screen flex justify-center items-center'>
        <div className='border border-black w-screen h-screen flex overflow-hidden'>
            <SideBar />
            {Object.entries(state)[0][1] === 'null' &&
                <div className='flex-[3] flex flex-col justify-center items-center'>
                    <ChatBubbleOutline className='scale-[4.0]'/>
                    <p className='text-xl mt-5'>Select a user to start messaging</p>
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