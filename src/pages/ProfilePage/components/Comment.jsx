import React from 'react'
import styled from 'styled-components';
import { Row, Col, Button, Container } from "react-bootstrap";

const StyledContainer = styled(Container)`
  .mentee-avatar{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
    }
  };
`;


function Comment(){
  return (
    <StyledContainer>
        <div className='comment'>
            <Row>
              <Col>
                <div className='mentee-avatar'>
                    <img src="https://i.pravatar.cc/150?img=3" alt="avatar" />
                </div>
              </Col>
              <Col>
                <Row>
                  <p>Christy</p>
                  
                </Row>
              </Col>
            </Row>
        </div>
    </StyledContainer>
  )
}

export default Comment