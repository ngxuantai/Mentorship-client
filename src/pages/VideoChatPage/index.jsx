
import VideoRoom  from "./components/VideoRoom"
import React, { useState } from 'react' 
import {Link, useNavigate, useParams} from 'react-router-dom';

function VideoChat(){
  const {id} = useParams();
  const [joined, setJoined] = useState(false);
  //const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  return (
      <VideoRoom roomName={id}/>
  )
}



export default VideoChat;
