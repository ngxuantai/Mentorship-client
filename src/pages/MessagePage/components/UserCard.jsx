import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../index'
import { AccountBox, Assignment } from '@mui/icons-material'

const UserCard = () => {
    const {data} = useContext(ChatContext)

  return (
    <div className='flex-[1] flex flex-col items-center text-center p-5 bg-primary-100'>
         <img className='w-[200px] h-[200px] object-cover rounded-full'
            src={data.user?.avatar}
        ></img>
        <h3 className='text-black mt-3'>{data.user?.firstName} {data.user?.lastName}</h3>
        <div className='flex'>
          <div className='bg-white  mt-4 mx-2 px-3 py-2 flex flex-col items-center justify-center border-none rounded-full cursor-pointer'>
            <AccountBox className='text-black'/>
            <span className='text-black'>Trang cá nhân</span>
          </div>
          <div className='bg-white mt-4 mx-2 px-3 py-2 flex flex-col items-center justify-center border-none  rounded-full cursor-pointer'>
            <Assignment className='text-black'/>
            <span className='text-black'>Assignment</span>
          </div>
        </div>

    </div>
  )
}

export default UserCard