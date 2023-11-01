import React from 'react'
import styled from 'styled-components'
import {Row, Col, Button} from 'react-bootstrap'
import {colors} from './../../constants/colors'
import MentorList from './components/MentorList'
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions'

function Mentor() {
  return (
    <Container>
        <Row className = 'intro-wallpaper d-flex justify-content-center'>
            <div className='intro-title px-5'>
                <h1>
                    <span>Share your expertise, grow,</span>
                    <br/>
                    <span style={{color: `${colors.text.secondary}`}}>make a difference</span>
                </h1>
                <p>Mentoring is a two-way street. Let us take care of the boring parts so you can concentrate on personal and professional growth for both you and your mentees.</p>
                <Row xs='auto' className='d-flex justify-content-center'>
                    <Col className='d-flex justify-content-center'>
                        <StyledButton style={{backgroundColor: `${colors.button.secondary}`}}>Become a mentor</StyledButton>
                    </Col>
                    <Col className='d-flex justify-content-center'>
                        <StyledButton style={{backgroundColor: `${colors.ui.primary}`, color: `${colors.text.secondary}`}} 
                        onClick={() => {
                            document.getElementById('faq').scrollIntoView({behavior: 'smooth'});                        
                        }}
                        >Frequently asked questions
                        
                        </StyledButton>
                    </Col>
                </Row>
            </div>
            <div className='intro-pic'>
                <div style={{position: 'absolute', height: '80%', width: '100%'}}>
                    <div style={{height: '50%', width: '100%'}}></div>
                    <div style={{height: '50%', width: '100%', backgroundColor: 'black'}}></div>
                </div>
                
                <div className='px-5' style={{zIndex: '2'}}>
                    <img src="https://cdn.mentorcruise.com/img/screenshots/sample-profile.png"/>
                </div>
            </div>
            
        </Row>
        <Row className='mentor-list d-flex justify-content-center'>
            <div className=' mt-5 p-5 text-center justify-content-center'>
                <div className='text-center py-5' style={{paddingLeft: '20%', paddingRight: '20%'}}>
                    <h2 style={{color: 'white'}}>The amazing things that mentoring can do for you</h2>
                    <span style={{color: 'white'}}>Managers, executives and leaders agree that mentoring is one of the most impactful ways to spend your time. In return, you're building crucial leadership qualities.</span>
                </div> 
            </div>
            <div className='' style={{paddingLeft: '20%', paddingRight: '20%'}}>
                <MentorList />
            </div>
        </Row>
        <Row>
            <div className='text-center' style={{paddingLeft: '20%', paddingRight: '20%', paddingTop: '10%', paddingBottom: '10%'}}>
                <h4>“I had several calls with mentees this week, and every single one of them has been insightful, cheerful, uplifting, and full of ideas being exchanged.”</h4>
                <Row className='d-flex justify-content-center'>
                    <Col sm={1}>
                        <div style={{height: '50px', width: '50px', borderRadius: '50%', overflow: 'hidden'}}>
                            <img src='https://www.artsource.ie/wp-content/uploads/2023/08/Jin-Yong-Art-copy.jpg' 
                            style={{display: 'block', height: '100%', width: '100%'}}></img>
                        </div> 
                    </Col>
                    <Col xs='auto' className='d-flex align-items-center'>
                        <span style={{fontWeight : 'bold'}}>Arvid Kahl <b style={{opacity: '0.5'}}>Serial Entrepreneur, Author</b></span>
                    </Col>            
                                                                                
               </Row>
            </div>
            
        </Row>
        <Row id='faq' style={{paddingLeft: '10%', paddingRight: '10%'}}>
            <FrequentlyAskedQuestions />
        </Row>
    </Container>
  )
};

const Container = styled.div`
    .intro-wallpaper {
        position: relative;
        background-image: linear-gradient(144.88deg, rgba(255, 255, 255, 0.3) -3.98%, rgba(75, 173, 239, 0.2) 21.27%, rgba(0, 183, 155, 0.6) 71.28%);
        .intro-title {    
            position: relative;
            max-width: 50%;
            color: ${colors.text.primary};
            padding: 50px;
            text-align: center;
        }
        .intro-pic {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                height: 100%;
                width: 100%;
            }
        }    
    }
    .mentor-list {
        background: linear-gradient(
            to bottom,
            black 0%,
            black 65%,
            white 65%,
            white 100%
        );

    }
    
`;

const StyledButton = styled(Button)`
    border: 1px solid black;
    border-radius: 12px;
    border-color: gray;
    padding: 12px; 
    margin: 12px;
`;


export default Mentor