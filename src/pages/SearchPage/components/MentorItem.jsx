import {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {FaHeart} from 'react-icons/fa';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import {SkillTag} from '../../../components/Tags';
import firebaseInstance from '../../../services/firebase';
import {useUserStore} from '../../../store/userStore';
import planApi from '../../../api/plan';
import commentApi from '../../../api/comment';
import moneyConverter from '../../../utils/moneyConverter'
import {Rating} from '@mui/material';
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled(Container)`
  border: 1px solid black;
  border-radius: 24px;
  border-color: gray;
  padding: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const Text = styled.p`
  border-bottom: 1px solid #e0e0e0;
  padding: 8px;
  font-size: 14px;
`;

function MentorItem({mentor}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();
  const {user} = useUserStore();
  const [lowestPrice, setLowestPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [numberComment, setNumberComment] = useState(0);
  // const { wishlist } = useWishlistStore();
  

  const handleNavigateToProfile = () => {
    navigate(`/mentor/profile/${mentor.id}`);
  };

  const roundToHalf = (number) => {
    return Math.round(number * 2) / 2;
  }

  useEffect(() => {
    const getPlan = async () => {
      try {
        const plans = await planApi.getPlanByMentorId(mentor.id);
        
        // Find the plan with the lowest price
        const lowestPricePlan = plans.reduce((minPlan, currentPlan) => {
          return currentPlan.price < minPlan.price ? currentPlan : minPlan;
        }, plans[0]);
  
        console.log("Plan with the lowest price:", lowestPricePlan.price);

        setLowestPrice(moneyConverter(lowestPricePlan.price));
        //setLowestPricePlan(lowestPricePlan.price);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    
    const getRating = async () => {
      try {
        const comments = await commentApi.getAllCommentByMentorId(mentor.id);
        console.log("Comments:", comments);
        const totalRating = comments.reduce((total, comment) => {
          return total + comment.ratingStar;
        }, 0);
        console.log("Total rating:", totalRating);
        const averageRating = roundToHalf(totalRating / comments.length);
        //console.log("Average rating:", averageRating);
        setRating(averageRating);
        setNumberComment(comments.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    getPlan();
    getRating();
  }, []);

  useEffect(() => {
    if (user) {
      const unsubscribe = firebaseInstance.observeWishlistChanges(
        user.id,
        (wishlist) => {
          if (wishlist) {
            setIsFavourite(wishlist.includes(mentor.id));
          } else {
            setIsFavourite(false);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [user]);
  const handleAddToWishList = async () => {
    try {
      await firebaseInstance.toggleWishlist(user.id, mentor.id);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };
  return (
    <StyledContainer fluid>
      <Row className="justify-content-between align-items-start">
        <Col className='flex flex-col items-center justify-between h-full'>
          <img className='w-[200px] h-[300px] object-cover rounded-full '
            style={{borderRadius: 12}}
            src={mentor.avatar || 'https://picsum.photos/200/300'}
            alt="random image"
          ></img>
          <h6 className='flex items-center'>
            <h4 className='font-bold text-primary-900'>{lowestPrice}</h4>/tháng
          </h6>
        </Col>
        <Col
          md={6}
          // className="d-flex justify-content-center align-items-center flex-column"
          className="d-flex flex-column px-4"
        >
          <Row className=''>
            <h2 className='text-primary-950 font-bold'>
              {mentor.firstName} {mentor.lastName}
            </h2>
            <p className='text-lg'>{mentor.jobTitle}</p>
            {numberComment !== 0 &&
              <div className='flex'>
                <Rating value={rating} disabled/> 
                <p className=' opacity-50'>{numberComment} đánh giá</p>
              </div>
             }
            
            <hr className=' opacity-25'></hr>
          </Row>
          <Row>
            <p>{mentor.introduction}</p>
          </Row>
          <Col style={{alignSelf: 'flex-start', marginBottom: 20}}>
            {mentor.skills.map((skill) => (
              <SkillTag key={skill.id}
                className='mr-2'>
                {skill.name}

              </SkillTag>
            ))}
          </Col>
          <div style={{alignSelf: 'flex-start', width: '100%'}}>
            <Button 
              onClick={handleNavigateToProfile}
              variant="primary"
              style={{
                fontWeight: 'bold',
                borderRadius: '4px',
                textAlign: 'center',
                marginRight: 12,
              }}
            >
              Xem hồ sơ
            </Button>
            <Button
              onClick={handleAddToWishList}
              variant="light"
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

                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FaHeart
                  style={{
                    marginRight: 8,
                    color: isFavourite ? 'tomato' : null,
                  }}
                ></FaHeart>{' '}
                {isFavourite ? 'Đã thích' : 'Yêu thích'}
              </div>
            </Button>
          </div>
        </Col>
        <Col className='flex flex-col items-center px-3 border-l-2 border-gray-100 h-full'>
          <SkillTag style={{alignSelf: 'flex-end'}}>
            7 ngày học thử miễn phí
          </SkillTag>
          <Text className='font-bold'>Những thứ mentor có thể giúp bạn?</Text>
          <Text>
            Chat không giới hạn với mentor, hỏi bất cứ thứ gì bạn muốn
          </Text>
          <Text>
            Học tập theo lộ trình, được mentor hướng dẫn từng bước chi tiết
          </Text>
        </Col>
      </Row>
    </StyledContainer>
  );
}

export default MentorItem;
