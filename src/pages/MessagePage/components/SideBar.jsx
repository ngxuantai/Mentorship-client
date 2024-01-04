import React from 'react'
import NavBar from './NavBar'
import Chats from './Chats'
import Search from './Search'

const SideBar = () => {
  return (
    <div className='flex-[1] max-w-sm bg-primary-600'>
        <NavBar />
        <Search />
        <Chats />
    </div>
  )
}

export default SideBar