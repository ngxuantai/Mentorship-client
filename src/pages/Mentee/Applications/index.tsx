import React from 'react'
import Header from '../DashBoard/components/Header'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { Article } from '@mui/icons-material'

function Applications(){
  return (
    <div>
      <Header />
      <div className='w-full py-2 text-center' style={{backgroundColor: '#04b4ba'}}>
        <h5 style={{color: 'white'}}>Want to double the chance of success for your applications? <a href='/settings' style={{color: 'white'}}>Complete your profile</a> </h5>
      </div>
      <div className='px-5 py-5'>
        <h3>Applications</h3>
        <div className='p-2 border rounded d-flex flex-column justify-content-center align-items-center text-center'>
            <Article style={{fontSize: '50px'}} />
            <p>No active applications</p>
            <p className='text-body-tertiary'>Once you have applied to a mentor, they will show up here</p>
            <Button variant='primary'>Find mentors</Button>
        </div>
      </div>
    </div>
  )
    
}

export default Applications