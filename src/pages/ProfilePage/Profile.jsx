import React from 'react'
import styled from 'styled-components'
import PlanItem from './components/PlanItem'
import Comment from './components/Comment';
import {colors} from './../../constants/colors';
import { Row, Col, Button, Badge } from "react-bootstrap";
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Place, Star, WatchLater,Task, PlayArrow, Favorite, Bolt } from '@mui/icons-material';
import { SkillTag } from '../../components/Tags';

function Profile() {
  return (
    <Container>
        <div className='wallpaper'>
          <div className='avatar'>
            <img src='https://static.wixstatic.com/media/e6b07b_e53a78fec61344aa8ea18d85b00dabe9~mv2.png/v1/crop/x_23,y_23,w_570,h_607/fill/w_588,h_624,al_c,lg_1,q_90,enc_auto/%E9%A6%96%E6%AC%A1%E7%B7%9A%E4%B8%8A%E9%96%8B%E5%B1%95.png' alt='avatar'></img>
          </div>
          <div className='badget'>
            <Badge bg="light" style={{ color: 'grey'}}>
              <Bolt/>
              Quick Responder
            </Badge>
          </div>
                
        </div>
        <div className='planItem'>
            <PlanItem></PlanItem>
          </div>  
        <div className='info ' style={{marginTop: '100px'}}>
          <Row sm={4} className='d-flex justify-content-center mt-5'>
            <Col>
              <h3>Kristi Harper</h3>
              <h6>Product Design Manager @ Optum Technology @ United Health Group</h6>  
              <p>Empowering UX Designers to secure jobs, excel in skills, and differentiate themselves in a competitive market.</p>
              <List>
                <ListItem className='py-0 px-0'>
                    <ListItemIcon>
                        <Place />
                    </ListItemIcon>
                    <ListItemText primary="United Stated of America"/>
                </ListItem>
                <ListItem className='py-0 px-0'>
                    <ListItemIcon>
                        <Star />
                    </ListItemIcon>
                    <ListItemText primary="5.0 (6 reviews)"/>
                </ListItem>
                <ListItem className='py-0 px-0'>
                    <ListItemIcon>
                        <WatchLater />
                    </ListItemIcon>
                    <ListItemText  primary="Active today"/>
                </ListItem>
                <ListItem className='py-0 px-0'>
                    <ListItemIcon>
                        <Task />
                    </ListItemIcon>
                    <ListItemText primary="Usually responds in half a day"/>
                </ListItem>
              </List>
              <div style={{display : 'flex'}}>
                <Button variant='light'> 
                  <PlayArrow/>
                  <span>Play intro</span>
                </Button>
                <Button variant='light'>
                  <Favorite/>
                  <span>Save</span>
                </Button>
              </div>
               
            </Col>

            <Col>
              <Col>
                <h5>Skills</h5>
              </Col>
              <Col>
                <SkillTag>Product Design</SkillTag>
                <SkillTag>UX Design</SkillTag>
                <SkillTag>UX Strategy</SkillTag>
                <SkillTag>UI Design</SkillTag>
                <a href=''>+11 more</a>
              </Col>
              
 
              
            </Col>
            <Col></Col>
          </Row>
          <hr style={{position: 'relative', zIndex: '-1'}}/>
          <Row sm={4} className='d-flex justify-content-center'>
            <Col sm={6}>
              <h3>About</h3>
              <p> Hi there! My name is Kristi Harper.
                I'm passionate about UX Design and mentoring. I have hands-on experience as an end-to-end designer. With effective leadership, strategic planning, and user centered design methodologies, I help grow designers to their full potential and drive success, resulting in getting hired. My background is in B2B/B2C Responsive Websites, B2C Mobile Apps and SaaS Web Portals.</p>
              <p>Here is what I can help you with:</p>
              <ul>
                <li>Standing out in UX</li>
                <li>Job interviews</li>
                <li>Portfolio reviews</li>
                <li>Case studies</li>
                <li>White boarding challenges</li>
                <li>Soft skills</li>
                <li>Career advice</li>
              </ul>
              <p>Here’s what you can expect from me:</p>
              <ul>
                <li>Listen and understand your learning goals</li>
                <li>Design a development plan based on your learning goals</li>
                <li>Help you understand complex concepts</li>
                <li>Provide UX exercises</li>
                <li>Help you when you are stuck</li>
                <li>Help you prepare for an interview</li>
              </ul>

            </Col>
            <Col></Col>
          </Row>
          <hr style={{position: 'relative', zIndex: '-1'}}/>
          <Row sm={4} className='d-flex justify-content-center'>
            <Col sm={6}>
              <h3>What mentees say</h3>
              <Comment></Comment>
            </Col>
            <Col></Col>
            
          </Row>
        </div>

        

    </Container>
  )
}

const Container = styled.div`
    .wallpaper{
      background-color: ${colors.button.secondary};
      height: 300px;  
      width: 100%;
      position : relative;
    }
    .avatar{
      position: absolute;
      top: 50%;
      left: 10%;
      width: 250px;
      height: 250px;
      overflow: hidden;
      border-radius: 50%;
      border: 5px solid ${colors.ui.secondary};
      img{
        width: 100%;
        height: 100%;
      }
    }
    .badget{
      position: absolute;
      bottom: 8%;
      margin-left: 30%;
    }
    .planItem{
      position: fixed;
      top: 10%;
      left: 65%;
    }
    }

`;

export default Profile;
