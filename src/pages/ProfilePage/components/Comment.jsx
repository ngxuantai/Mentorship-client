import React from 'react'
import styled from 'styled-components';
import { Row, Col, Button, Container } from "react-bootstrap";
import { Star} from '@mui/icons-material';


const StyledContainer = styled(Container)`
  .mentee-avatar{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    img{
      display: block;
      margin-left: auto;
      margin-right: auto;
      height: 100%;
      width: 100%;
    }
  };
`;


function Comment(){
  return (
    <StyledContainer>
        <div className='comment py-4'>
            <Row>
              <Col sm={1} className='px-0 py-0 d-flex justify-content-center'>
                <div className='mentee-avatar'>
                  <img src='https://www.artsource.ie/wp-content/uploads/2023/08/Jin-Yong-Art-copy.jpg'></img>
                </div>                
              </Col>
              <Col xs="auto">
                <span style={{fontWeight : 'bold'}}>Christy <b style={{opacity: '0.5'}}>on October 5, 2023</b></span>
                <br/>
                <Star/><Star/><Star/><Star/><Star/>                   
              </Col>
            </Row>
            <Row>
              <span>Kristi has been an exceptional mentor. Not only am I updating my resume and cover letter under her expert guidance, but I'm also planning to work with her for another month to refine my portfolio. Her feedback is both insightful and actionable, demonstrating her deep expertise in the field. What stands out the most is Kristi's genuine commitment to my success. She consistently goes the extra mile to ensure that every aspect of my resume and cover letter is coherent and impactful. Her passion for mentoring is evident in every interaction, and I feel fortunate to have her by my side as I navigate the challenges and opportunities of my career. Anyone looking to elevate their professional materials would greatly benefit from Kristi's mentorship.</span>
            </Row>
        </div>
        <div className='comment py-4'>
            <Row>
              <Col sm={1} className='px-0 py-0 d-flex justify-content-center'>
                <div className='mentee-avatar'>
                  <img src='https://resources.stuff.co.nz/content/dam/images/1/u/u/u/f/c/image.related.StuffLandscapeThreeByTwo.1464x976.1uz6y4.png/1558037341511.jpg'></img>
                </div>                
              </Col>
              <Col xs="auto">
                <span style={{fontWeight : 'bold'}}>Gabrielle <b style={{opacity: '0.5'}}>on August 23, 2023</b></span>
                <br/>
                <Star/><Star/><Star/><Star/><Star/>                   
              </Col>
            </Row>
            <Row>
              <span>Kristi was an incredible mentor, she went above and beyond supplying me with well-organized and easy-to-digest information on LinkedIn updates, job hunting, resume review, and clear concise portfolio design review and feedback. I would HIGHLY recommend her to anyone she is warm, intelligent, passionate, and an outstanding teacher. She has made me more confidence in my search and believe in myself.</span>
            </Row>
        </div>
    </StyledContainer>
  )
}

export default Comment