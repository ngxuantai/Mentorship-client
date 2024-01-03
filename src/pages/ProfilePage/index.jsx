import {Bolt, Place, Star, Task, WatchLater} from '@mui/icons-material';
import {List, ListItem, ListItemIcon, ListItemText} from '@mui/material';
import {useEffect, useState} from 'react';
import {Badge, Button, Col, Row} from 'react-bootstrap';
import {FaHeart} from 'react-icons/fa';
import {useNavigate, useParams} from 'react-router';
import styled from 'styled-components';
import mentorApi from '../../api/mentor';
import {SkillTag} from '../../components/Tags';
import {colors} from '../../constants/colors';
import firebaseInstance from '../../services/firebase';
import {useUserStore} from '../../store/userStore';
import Comment from './components/Comment';
import PlanList from './components/PlanList';

function Profile() {
  const navigate = useNavigate();
  const {mentorId} = useParams();
  const {user} = useUserStore();

  const [mentor, setMentor] = useState({});
  const [skills, setSkills] = useState([]);
  const [isAdded, setIsAdded] = useState(false);

  const fetchSkills = async () => {
    const data = await mentorApi.getMentorSkills(mentorId);
    setSkills(data || []);
  };
  const handleAddToWishList = async () => {
    try {
      await firebaseInstance.toggleWishlist(user.id, mentorId);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeWishlistChanges(
        user.id,
        (wishlist) => {
          if (wishlist) {
            setIsAdded(wishlist.includes(mentorId));
          } else {
            setIsAdded(false);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [user]);
  useEffect(() => {
    if (mentor) {
      fetchSkills();
    }
  }, [mentor]);
  useEffect(() => {
    const fetchMentor = async () => {
      const data = await mentorApi.getMentorById(mentorId);
      console.log(data);
      setMentor(data);
    };

    fetchMentor();
  }, []);
  return (
    <Container>
      <div className="wallpaper">
        <div className="avatar">
          <img
            src={
              mentor?.avatar
                ? mentor.avatar
                : 'https://static.wixstatic.com/media/e6b07b_e53a78fec61344aa8ea18d85b00dabe9~mv2.png/v1/crop/x_23,y_23,w_570,h_607/fill/w_588,h_624,al_c,lg_1,q_90,enc_auto/%E9%A6%96%E6%AC%A1%E7%B7%9A%E4%B8%8A%E9%96%8B%E5%B1%95.png'
            }
            alt="avatar"
          ></img>
        </div>
        <div className="badget">
          <Badge bg="light" style={{color: 'grey'}}>
            <Bolt />
            Quick Responder
          </Badge>
        </div>
      </div>
      <div className="planItem">
        <PlanList mentor={mentor}></PlanList>
      </div>
      <div className="info " style={{marginTop: '100px'}}>
        <Row sm={4} className="d-flex justify-content-center mt-5">
          <Col>
            <h3>
              {mentor.firstName} {mentor.lastName}
            </h3>
            <h6>
              {mentor.jobTitle} at {mentor.company}
            </h6>
            <p>{mentor.introduction}</p>
            <div style={{display: 'flex'}}>
              <Button
                onClick={handleAddToWishList}
                variant="secondary"
                style={{
                  fontWeight: 'bold',

                  borderRadius: '4px',
                  textAlign: 'center',
                  marginRight: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <FaHeart
                    style={{
                      marginRight: 8,
                      color: isAdded ? 'tomato' : null,
                    }}
                  ></FaHeart>{' '}
                  {isAdded ? 'Đã thích' : 'Yêu thích'}
                </div>
              </Button>
            </div>
          </Col>

          <Col>
            <Col>
              <h5>Kĩ năng</h5>
            </Col>
            <Col>
              {skills.slice(0, 4).map((skill, index) => (
                <SkillTag key={skill.id}>{skill.name}</SkillTag>
              ))}
              {skills.length > 4 && <a href="">+{skills.length - 4} more</a>}
            </Col>
          </Col>
          <Col></Col>
        </Row>
        <hr style={{position: 'relative', zIndex: '-1'}} />
        <Row sm={4} className="d-flex justify-content-center">
          <Col sm={6}>
            <h3>About</h3>
            <p>
              {' '}
              Hi there! My name is Kristi Harper. I'm passionate about UX Design
              and mentoring. I have hands-on experience as an end-to-end
              designer. With effective leadership, strategic planning, and user
              centered design methodologies, I help grow designers to their full
              potential and drive success, resulting in getting hired. My
              background is in B2B/B2C Responsive Websites, B2C Mobile Apps and
              SaaS Web Portals.
            </p>
          </Col>
          <Col></Col>
        </Row>
        <hr style={{position: 'relative', zIndex: '-1'}} />
        <Row sm={4} className="d-flex justify-content-center">
          <Col sm={6}>
            <h3>Đánh giá</h3>
            <Comment mentorId={mentorId}></Comment>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Container>
  );
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
