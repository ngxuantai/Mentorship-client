import React, {useState, useEffect, useRef} from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import AgoraRTM from 'agora-rtm-sdk'
import {Link, useNavigate} from 'react-router-dom';
import { VideoPlayer } from './VideoPlayer'
import { ScreenShare, StopScreenShare, CallEnd, Mic, MicOff, Videocam, VideocamOff, Send } from '@mui/icons-material';


const APP_ID = '5ad93fd0de6d4b74b2b1e150004c3ebe';
// const TOKEN = '007eJxTYLiS8LPjXZuu7OwShRd3zIJuZKoqKe04IyDOcS3ompgP23UFhlQTC6NUA4O0pLQUYxPDFINEC5MUM2NTMzOLRAvLZKNEqTfNqQ2BjAx3ZzszMEIhiM/JEJaZkprvnJFYwsAAALMxIFs=';
const TOKEN = null;

//const CHANNEL = 'VideoChat';
const UID = Math.floor(Math.random() * 2032);
const RTMUID = String(UID);

const clientRTC = AgoraRTC.createClient({ 
  mode: 'rtc', 
  codec: 'vp8' 
})
const clientRTM = AgoraRTM.createInstance(APP_ID);


function VideoRoom(props){
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);

  const [channel, setChannel] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [screenTrack, setScreenTrack] = useState(null);
  
  const {roomName} = props;
  const [isSharingEnabled, setIsSharingEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const messageRef = useRef();

  const navigate = useNavigate();

  const appendMessage = (message) => {
    setMessages((messages) => [...messages, message]);
  };

  // let audioTracks = {
  //   localAudioTrack : null,
  //   remoteAudioTrack: {
  //   }
  // };

  // let videoTracks = {
  //   localVideoTrack : null,
  //   remoteVideoTrack: {
  //   }
  // };

  const handleUserJoined = async (user, mediaType) => {
    await clientRTC.subscribe(user, mediaType);
      if (mediaType === 'video') {
        // Subscribe to the new video track
        clientRTC.subscribe(user, 'video').then(() => {
          // Update the state to include the new user
          setUsers((prevUsers) => [...prevUsers, user]);
        });
      }
      if (mediaType === 'audio') {
        user.audioTrack.play();
      }
  };

  const handleUserLeft = (user) => {
    setUsers((prevUsers) => 
        prevUsers.filter((u) => u.uid !== user.uid)
    );
  };

  const handleUserPublished = async (user, mediaType) => {
    await clientRTC.subscribe(user, mediaType);
    if (mediaType === 'video') {
      videoTracks.remoteVideoTrack[user.uid] = [user.videoTrack];
      setUsers((prevUsers) => [...prevUsers, user]);
    }
    if (mediaType === 'audio') {
      audioTracks.remoteAudioTrack[user.uid] = [user.audioTrack];
      user.audioTrack.play();
    }
  };

  useEffect(() => {   
    const connect = async () => {
      await clientRTM.login({'uid': RTMUID, 'token': TOKEN});
      const channel = await clientRTM.createChannel(roomName);
      await channel.join();
      channel.on('ChannelMessage', (message, peerId) => {
        appendMessage({
          text: message.text,
          uid: peerId,
        });
      });
      //console.log(uid, channel);
      setChannel(channel);
      return channel;
    };
    const connection = connect();

    clientRTC.on('user-published', handleUserJoined);
    clientRTC.on('user-unpublished', handleUserLeft);
         
    clientRTC.join(APP_ID, roomName, TOKEN, UID)
        .then((uid) => 
          Promise.all([
            AgoraRTC.createMicrophoneAndCameraTracks(), 
            uid,
          ])
        ).then(([tracks,uid]) => {
          const [audioTrack, videoTrack] = tracks;
          setLocalAudioTrack(audioTrack);
          setLocalVideoTrack(videoTrack);
          setLocalTracks(tracks);
          setUsers((prevUsers) => [
              ...prevUsers, 
              {
                  uid,  
                  videoTrack,
                  audioTrack,
              },
          ]);
          clientRTC.publish(tracks);
          
      });
      return () => {
        for (let localTracks of localTracks){
            localTracks.stop();
            localTracks.close();
        }
        for (let track of [localAudioTrack, localVideoTrack]) {
          if (track) {
            track.stop();
            track.close();
          }
        }
        clientRTC.off('user-published', handleUserJoined);
        clientRTC.off('user-left', handleUserLeft);

        const logout = async () => {
          const channel = await connection;
          await channel.leave();
          await clientRTM.logout();
        };
        logout();


        client.unpublish(tracks)
        .then (() => clientRTC.leave()); 

    };
  }, []);
  

  // useEffect(() => {
  //   messageRef.current.scrollTop = messageRef.current.scrollHeight;
  // }, [messages]);

  const handleScreenSharing = async (e) => {
    e.preventDefault();
    if (!isSharingEnabled) {
      try {
        // Tạo một track màn hình cho chia sẻ màn hình.
        const newScreenTrack = await AgoraRTC.createScreenVideoTrack();
  
        // Lấy danh sách track hiện tại của local và thay thế video track bằng screen track.
        const audioAndVideoTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        const [audioTrack, existingVideoTracks] = audioAndVideoTracks;
  
        // Unpublish the existing video track before publishing the screen track.
        await clientRTC.unpublish(localTracks);
  
        // Replace the video track with the screen track.
        await clientRTC.publish([audioTrack, newScreenTrack]);
  
        // Cập nhật state và set screen track.
        setLocalTracks([audioTrack, newScreenTrack]);
        setIsSharingEnabled(true);
        setScreenTrack(newScreenTrack);
      } catch (error) {
        console.error('Lỗi khi bắt đầu chia sẻ màn hình:', error);
      }
    } else {
      try {
        // Unpublish the screen track before publishing the audio track only.
        await clientRTC.unpublish(localTracks);
  
        // Re-publish the existing audio and video tracks.
        const oldScreenTrack = await AgoraRTC.createCameraVideoTrack();
        const audioAndVideoTracks = await AgoraRTC.createMicrophoneAndCameraTracks();
        const [audioTrack, existingVideoTracks] = audioAndVideoTracks;
        await clientRTC.publish([audioTrack, oldScreenTrack]);
  
        // Cập nhật state và set screen track về null.
        setLocalTracks([audioTrack, oldScreenTrack]);
        setIsSharingEnabled(false);
        setScreenTrack(null);
      } catch (error) {
        console.error('Lỗi khi dừng chia sẻ màn hình:', error);
      }
    }
  };

  const handleMute = (e, users) => {
    e.preventDefault();

    if (isMuted) {      
      setIsMuted(false);
      localAudioTrack.setEnabled(true);
      localVideoTrack.setEnabled(true);
    } else {      
      setIsMuted(true);
      localAudioTrack.setEnabled(false);
      localVideoTrack.setEnabled(false);
    }
  };

  const sendMessage = () => {
    if (text === '') return;
    console.log(text);
    channel.sendMessage({
      text,
      type: 'text',
    });
    appendMessage({
      text: text,
      uid: UID,
    });
    setText('');
    
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleUserClick = (userId) => {
    if (selectedUser === userId) {
      // Nếu user đã được chọn và click lần nữa, quay trở lại trạng thái ban đầu
      setSelectedUser(null);
    } else {
      // Nếu user chưa được chọn hoặc click vào một user khác, đưa user đó lên trên cùng
      setSelectedUser(userId);
    }
  };

  // Sắp xếp mảng users để đưa user được chọn lên trên cùng
  const sortedUsers = users.sort((a, b) => (a.uid === selectedUser ? -1 : 1));
  
  return (
    <div className='video-room-container bg-black w-screen p-2 h-screen overflow-auto' >      
      <h1 className='font-bold text-center text-white'>Room: {roomName}</h1>
      <div className='flex justify-between'>
        <div container className='w-2/3 grid grid-cols-2 gap-2'>        
            {sortedUsers.map((user) => (
              <div key={user.uid} className={`w-full mt-4 ${selectedUser === user.uid ? 'col-span-2' : ''}`}
                    onClick={() => handleUserClick(user.uid)}>
                <h6 className='text-white text-lg font-bold'>UID: {user.uid}</h6>
                <VideoPlayer key={user.uid} user={user} />                                 
              </div>
            ))}
        </div>
        <div className='w-1/3' >
          <div className='bg-white p-3 h-[530px] mt-14 mx-2 w-[100%] rounded-lg '>
            <div className='panel h-3/4 p-2'>
              <div className='messages'>
                {messages.map((message, idx) => (
                  <div key={idx} className="message flex">
                    {`${message.uid}` === RTMUID && (
                      <div className="user-self font-bold text-primary-700">
                        You: &nbsp;
                      </div>
                    )}
                    {`${message.uid}` !== RTMUID && (
                      <div className="user-them font-bold text-black">
                        {message.uid}: &nbsp;
                      </div>
                    )}
                  <div className="text">{message.text}</div>
                </div>
                ))}
              </div>               
            </div>
            <form className='flex items-center h-1/8 w-full'
              onSubmit={sendMessage}>
              <input className='py-2 border border-purple-900 rounded-lg w-5/6 px-4 '
                value={text}
                placeholder='Enter your message...'
                onChange={(e) => setText(e.target.value)}
              />
              <button className='bg-primary-400 text-white font-bold  rounded-lg py-2 px-4 ml-3 hover:bg-primary-500'
                  onClick={handleSendMessage}>
                  <Send />
              </button>
            </form>
            <div className='flex justify-center items-center h-1/8 p-3'>
              <button id="inItScreen" onClick={handleScreenSharing} className='bg-primary-400 text-white rounded-full py-2 px-4 transition duration-150 ease-in-out hover:transition-all hover:scale-110 hover:bg-primary-500 mx-4'>
                  {isSharingEnabled ? <StopScreenShare /> : <ScreenShare />} 
              </button>
              <button id="leave" onClick={() => navigate(`/videochat`)} className=' bg-red-600 text-white rounded-full py-2 px-4 transition duration-150 ease-in-out hover:transition-all hover:scale-110 hover:bg-red-700 mx-4'>
                  <CallEnd />
              </button>
              <button id="muteVideo" onClick={handleMute} className='bg-primary-400 text-white rounded-full py-2 px-4 transition duration-150 ease-in-out hover:transition-all hover:scale-110 hover:bg-primary-500 mx-4'>
                  {isMuted ? <VideocamOff /> : <Videocam />}
              </button>
            </div>
          </div>              
        </div>
      </div>
                   
    </div>


  )
}

export default VideoRoom;