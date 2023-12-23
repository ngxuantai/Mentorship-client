import React, { useState, useRef, useEffect } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'

export const VideoPlayer = ({ user }) => {
    const ref = useRef(null);
    

    useEffect(() => {
        user.videoTrack.play(ref.current);
    }, []);

  return (      
        <div className='h-full rounded-lg overflow-hidden' 
          ref={ref} 
          style={{height: '530px', width: '100%'}}>

        </div>

  )
}
