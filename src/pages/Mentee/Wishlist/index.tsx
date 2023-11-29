import React from 'react'
import Header from '../DashBoard/components/Header'
import WishlistItem from './components/WishlistItem'
import { ControlPoint } from '@mui/icons-material'
import {Link, useNavigate} from 'react-router-dom';

function Wishlist(){
    const navigate = useNavigate();
  return (
    <div>
        <Header />
        <div className='w-full py-2 text-center' style={{backgroundColor: '#04b4ba'}}>
          <h5 style={{color: 'white'}}>Want to double the chance of success for your applications? <a href='/settings' style={{color: 'white'}}>Complete your profile</a> </h5>
        </div>
        <div className='px-5 py-5'>
            <h3>Wishlist</h3>
            <div className='d-flex justify-content-start'>
                <WishlistItem />
                <FindMentors/>
            </div>
            
        </div>
        
    </div>
  )
}

const FindMentors = () => {
    const navigate = useNavigate();
    return(
        <div className='border border-2 rounded align-items-center text-center d-flex flex-column justify-content-center'
        style={{width: '400px'}} onClick={(e) => {
            navigate('/search')
        }}>
            <ControlPoint style={{fontSize: '50px'}}/> 
            <p>Find mentors</p>
        </div>
    )
}

export default Wishlist