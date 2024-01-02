import React, { useState, useRef, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import { useUserStore } from '../../../store/userStore';

export const VideoPlayer = ({ userJoined }) => {
    const ref = useRef(null);

    useEffect(() => {
      userJoined.videoTrack.play(ref.current);
    }, []);

  return (      
    <div className='relative'>
        <div className='h-full rounded-lg overflow-hidden' 
          ref={ref} 
          style={{height: '530px', width: '100%'}}>           
        </div>
        <div className="absolute right-2 bottom-2 bg-[rgba(0,0,0,0.5)] px-3 py-2 rounded text-base text-white font-semibold">{userJoined.firstName} {userJoined.lastName}</div>
    </div>
  )
}