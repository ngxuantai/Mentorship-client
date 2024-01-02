import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Row, Col, Button, Container} from 'react-bootstrap';
import commentApi from '../../../api/comment';
import menteeApi from '../../../api/mentee';
import Rating from '@mui/material/Rating';
import {Star} from '@mui/icons-material';
import {format, set} from 'date-fns';

const StyledContainer = styled(Container)`
  .mentee-avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
      height: 100%;
      width: 100%;
    }
  }
`;

function Comment({mentorId}) {
  const [listComment, setListComment] = useState([]);

  const [menteeData, setMenteeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(mentorId);
    const fetchComment = async () => {
      const data = await commentApi.getAllCommentByMentorId(mentorId);
      setListComment(data);
      data.forEach(async (comment) => {
        await fetchMenteeData(comment.menteeId);
      });
      setIsLoading(false);
    };

    const fetchMenteeData = async (menteeId) => {
      const mentee = await menteeApi.getMentee(menteeId);
      setMenteeData((prevData) => ({...prevData, [menteeId]: mentee}));
    };

    fetchComment();
  }, []);

  // const [newComment, setNewComment] = useState('');
  // const [rating, setRating] = useState(0);

  // const handleCommentSubmit = () => {
  //   // Handle the logic to submit the comment and rating
  //   console.log('Submitted Comment:', newComment);
  //   console.log('Rating:', rating);

  //   // You can call an API here to submit the comment and rating to the server
  //   // For simplicity, I'm just logging the values for demonstration purposes

  //   // Clear the form after submission
  //   setNewComment('');
  //   setRating(0);
  // };

  return (
    <StyledContainer>
      {isLoading ? null : (
        <>
          {listComment.map((comment) => {
            return (
              <div className="comment py-4" key={comment.id}>
                <Row>
                  <Col
                    sm={1}
                    className="px-0 py-0 d-flex justify-content-center"
                  >
                    <div className="mentee-avatar">
                      <img src={menteeData[comment.menteeId]?.avatar}></img>
                    </div>
                  </Col>
                  <Col xs="auto">
                    <span style={{fontWeight: 'bold'}}>
                      {menteeData[comment.menteeId]?.firstName}{' '}
                      {menteeData[comment.menteeId]?.lastName}
                      <b style={{opacity: '0.5', paddingLeft: '4px'}}>
                        on {format(new Date(comment.createdAt), 'dd/MM/yyyy')}
                      </b>
                    </span>
                    <br />
                    <Rating
                      value={comment.ratingStar}
                      precision={0.5}
                      disabled
                      emptyIcon={
                        <Star style={{opacity: 0.55}} fontSize="inherit" />
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <span style={{padding: 0}}>{comment.content}</span>
                </Row>
              </div>
            );
          })}
        </>
      )}
    </StyledContainer>
  );
}

export default Comment;
