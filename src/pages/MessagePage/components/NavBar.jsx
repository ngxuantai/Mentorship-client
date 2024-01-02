import React from 'react'
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { useState } from 'react';
import { useUserStore } from '../../../store/userStore';



const NavBar = () => {
  const {user, setUser} = useUserStore();

  return (
    <div className='flex items-center h-[10%] p-2 justify-between text-white bg-primary-800'>
      <div className='flex items-center'>
        <img className='w-[40px] h-[40px] object-cover rounded-full mx-2'
            src={user.avatar}
        ></img>
        <span className='text-white'>{user.firstName} {user.lastName}</span>
      </div>
      <span className='text-white text-xl font-bold font-sans'>Tin nhắn</span>
    </div>
  )
}

export default NavBar
