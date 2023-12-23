
import VideoRoom  from "./components/VideoRoom"
import React, { useState } from 'react' 
import {Link, useNavigate} from 'react-router-dom';

function VideoChat(){
  const [joined, setJoined] = useState(false);
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videochat/${roomName}`);
  };


  return (
    <form className='flex justify-center items-center h-screen w-full bg-primary-200'
            >
      {!joined && 
      <div className='flex flex-col  justify-center items-center w-80 h-80 border border-primary-500 rounded-lg bg-primary-600'>
        <h1 className='text-white font-bold'>Video Chat</h1>    
        <input className='border border-primary-500 rounded-lg px-4 py-2 mt-4 w-64' 
                required
                type='text'
                placeholder='Enter Room Name' 
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}/> 
        <button className=' bg-primary-400 text-white font-bold  rounded-lg px-4 py-2 mt-4 hover:bg-primary-500'
          type="submit" 
          {...(roomName.length < 1 && {disabled: true})}
          onClick={() => setJoined(true)}>
              Join
        </button>
      </div>
      }
      {joined && 
        <VideoRoom roomName={roomName}/>
      }           
      </form>
  )
}



export default VideoChat;
