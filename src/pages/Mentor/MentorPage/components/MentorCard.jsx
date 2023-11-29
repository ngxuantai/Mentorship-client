import React from 'react'
import styled from 'styled-components';
import {Card} from 'react-bootstrap';

function MentorCard({src, quote, people}) {
  return (
    <Container>
        <Card className='card' style={{backgroundColor: 'darkBlue'}}>
            <Card.Img variant='top' src={src} style={{height: '2/3', width: '100%'}}/>
            <Card.Body className='px-2'>
                <Card.Title style={{color: 'white'}}>{quote}</Card.Title>
                <Card.Text style={{color: 'yellow'}}>{people}</Card.Text>
            </Card.Body>
        </Card>
    </Container>
  )
}

const Container = styled.div`
    height: 500px;
    width: 400px;
    padding: 12px;
    .card{
      height: 480px;
      width: 380px;
    }

`;
export default MentorCard