import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import firebaseInstance from '../../../services/firebase';
import menteeApi from '../../../api/mentee';
import mentorApi from '../../../api/mentor';
import { ChatContext } from '../index';

//const currentUserId = '65840127a47c189dd995cdf3';
//const currentUser = await mentorApi.getMentorById(currentUserId);

 const currentUserId = '658b162cae49ca742c25fd2a';
// const currentUser = await menteeApi.getMentee(currentUserId)

var currentUser = await mentorApi.getMentorById(currentUserId);
if (currentUser === '') {
  currentUser = await menteeApi.getMentee(currentUserId);
}

const Search = () => {
    const {data, dispatch} = useContext(ChatContext);
    const [username, setUsername] = useState('')

    const [user, setUser] = useState(
        {
            id: '',
            FirstName: '',
            LastName: '',
            Avatar: ''
        }   
    )
    const [error, setError] = useState(false)


    const handleSearch = async () => {
        try {
            let searchUser = await mentorApi.getMentorById(username);
            if (searchUser === '') {
                searchUser = await menteeApi.getMentee(username);           
            }
            setUser({...user,
                id: searchUser.id,
                FirstName: searchUser.firstName,
                LastName: searchUser.lastName,
                Avatar: searchUser.avatar        
            });
            
        } catch (error) {
            console.log(error);
            setError(true);
        }
    
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleSearch();

    };

    const handleClick = async () => {
        // check if the chat already exists, if not create
        const combinedId = currentUser.id > user.id ? currentUser.id + user.id : user.id + currentUser.id;
        console.log(combinedId);

        try {
            const currentUserChats = await firebaseInstance.getUserChats(currentUser.id);
            const userChats = await firebaseInstance.getUserChats(user.id);

            if (currentUserChats === false) {
                await firebaseInstance.createUserChats(currentUser.id);

                firebaseInstance.updateUserChats(currentUser.id, combinedId, {
                    id: user.id,
                    firstName: user.FirstName,
                    lastName : user.LastName,
                    avatar: user.Avatar                
                });

            }else {
                //update user chats
                firebaseInstance.updateUserChats(currentUser.id, combinedId, {
                    id: user.id,
                    firstName: user.FirstName,
                    lastName : user.LastName,
                    avatar: user.Avatar                
                });               
            }

            if (userChats === false) {
                await firebaseInstance.createUserChats(user.id)

                firebaseInstance.updateUserChats(user.id, combinedId, {
                    id: currentUser.id,
                    firstName: currentUser.firstName,
                    lastName : currentUser.lastName,
                    avatar: currentUser.avatar                
                });
            } else {
                //update user chats
                firebaseInstance.updateUserChats(user.id, combinedId, {
                    id: currentUser.id,
                    firstName: currentUser.firstName,
                    lastName : currentUser.lastName,
                    avatar: currentUser.avatar                
                });
            }            
        } catch (error) {
            console.log(error);
        }



        try {
            const res = await firebaseInstance.getChat(combinedId);
            console.log(res);
            if (res === false) {
                //create a chat 
                firebaseInstance.createChat(combinedId, {
                    messages: [],
                });
                console.log('chat created');                                           
            }
            else {
                dispatch({type: 'CHANGE_USER', payload: data.user})
            }
        } catch (error) {
            console.log(error);
        };
        
        setUsername('');
        setUser({
            id: '',
            FirstName: '',
            LastName: '',
            Avatar: ''
        });

    }

  return (
    <div className='p-2 bg-primary-600'>
        <div>
            <input type="text" placeholder="Find a user" 
                className='border-none rounded-md outline-none p-2 w-full'
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKey}/>
        </div>
        {error && (<span className='text-white'>User not found</span>)}
        {user.id !== '' && (
            <div className='p-2 flex items-center bg-primary-800 hover:bg-primary-900'
            onClick={handleClick}>
                <img className='bg-white h-[50px] w-[50px] rounded-full object-cover mx-2'
                    src={user.Avatar}>
                </img>
                <span className='text-white'>{user.FirstName}</span>
            </div>       
        )}


    </div>
  )
}

export default Search