import React from 'react'
import mentorApi from '../../../api/mentor';
import menteeApi from '../../../api/mentee';
import { useState } from 'react';


//const currentUserId = '65840127a47c189dd995cdf3';
//const currentUser = await mentorApi.getMentorById(currentUserId)
const currentUserId = '658b162cae49ca742c25fd2a';

var currentUser = await mentorApi.getMentorById(currentUserId);
if (currentUser === '') {
  currentUser = await menteeApi.getMentee(currentUserId);
}

const NavBar = () => {

  return (
    <div className='flex items-center h-[10%] p-2 justify-between text-white bg-primary-800'>
      <div className='flex items-center'>
        <img className='w-[40px] h-[40px] object-cover rounded-full mx-2'
            src={currentUser.avatar}
        ></img>
        <span className='text-white'>{currentUser.firstName} {currentUser.lastName}</span>
      </div>
      <span className='text-white text-xl font-bold font-sans'>Message</span>
    </div>
  )
}

export default NavBar
