import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import firebaseInstance from '../../../services/firebase';
import menteeApi from '../../../api/mentee';
import mentorApi from '../../../api/mentor';
import { ChatContext } from '../index';
import { useUserStore } from '../../../store/userStore';

const Search = () => {
    const {data, dispatch} = useContext(ChatContext);
    const [username, setUsername] = useState('')
    const {user, SetUser} = useUserStore();

    const [userSearchResult, setUserSearchResult] = useState(
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
            setUserSearchResult({...userSearchResult,
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
        const combinedId = user.id > userSearchResult.id ? user.id + userSearchResult.id : userSearchResult.id + user.id;
        console.log(combinedId);

        try {
            const currentUserChats = await firebaseInstance.getUserChats(user.id);
            const userChats = await firebaseInstance.getUserChats(userSearchResult.id);

            if (currentUserChats === false) {
                await firebaseInstance.createUserChats(user.id);

                firebaseInstance.updateUserChats(user.id, combinedId, {
                    id: userSearchResult.id,
                    firstName: userSearchResult.FirstName,
                    lastName : userSearchResult.LastName,
                    avatar: userSearchResult.Avatar                
                });

            }else {
                //update user chats
                firebaseInstance.updateUserChats(user.id, combinedId, {
                    id: userSearchResult.id,
                    firstName: userSearchResult.FirstName,
                    lastName : userSearchResult.LastName,
                    avatar: userSearchResult.Avatar                
                });               
            }

            if (userChats === false) {
                await firebaseInstance.createUserChats(userSearchResult.id)

                firebaseInstance.updateUserChats(userSearchResult.id, combinedId, {
                    id: user.id,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    avatar: user.avatar                
                });
            } else {
                //update user chats
                firebaseInstance.updateUserChats(userSearchResult.id, combinedId, {
                    id: user.id,
                    firstName: user.firstName,
                    lastName : user.lastName,
                    avatar: user.avatar                
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
        setUserSearchResult({
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
        {userSearchResult.id !== '' && (
            <div className='p-2 flex items-center bg-primary-800 hover:bg-primary-900'
            onClick={handleClick}>
                <img className='bg-white h-[50px] w-[50px] rounded-full object-cover mx-2'
                    src={userSearchResult.Avatar}>
                </img>
                <span className='text-white'>{userSearchResult.FirstName}</span>
            </div>       
        )}


    </div>
  )
}

export default Search