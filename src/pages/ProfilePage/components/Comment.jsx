import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Row, Col, Button, Container} from 'react-bootstrap';
import menteeApi from '../../../api/mentee';
import {Star} from '@mui/icons-material';

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

function Comment() {
  const [listComment, setListComment] = useState([
    {
      id: 1,
      content: 'Kristi has been an exceptional mentor.',
      star: 5,
      createAt: Date.now(),
      menteeId: '657feddd696c958dbc0ecd81',
      mentorId: 2,
    },
  ]);

  const [menteeData, setMenteeData] = useState({});

  useEffect(() => {
    const fetchMenteeData = async (menteeId) => {
      const mentee = await menteeApi.getMentee(menteeId);
      setMenteeData((prevData) => ({...prevData, [menteeId]: mentee}));
    };

    // Fetch mentee data for all comments
    listComment.forEach((comment) => {
      fetchMenteeData(comment.menteeId);
    });
  }, [listComment]);

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
      {listComment.map((comment) => {
        return (
          <div className="comment py-4" key={comment.id}>
            <Row>
              <Col sm={1} className="px-0 py-0 d-flex justify-content-center">
                <div className="mentee-avatar">
                  <img src="https://www.artsource.ie/wp-content/uploads/2023/08/Jin-Yong-Art-copy.jpg"></img>
                </div>
              </Col>
              <Col xs="auto">
                <span style={{fontWeight: 'bold'}}>
                  {menteeData[comment.menteeId]?.fullName}
                  <b style={{opacity: '0.5', paddingLeft: '4px'}}>
                    on{' '}
                    {new Date(comment.createAt).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </b>
                </span>
                <br />
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </Col>
            </Row>
            <Row>
              <span style={{padding: 0}}>{comment.content}</span>
            </Row>
          </div>
        );
      })}
    </StyledContainer>
  );
}

export default Comment;
