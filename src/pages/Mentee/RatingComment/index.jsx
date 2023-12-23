import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Rating, Box} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {Button, Label, Textarea} from 'flowbite-react';
import commentApi from '../../../api/comment';
import {set} from 'date-fns';

const RatingComment = () => {
  const [star, setStar] = useState(2);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(-1);

  const handleSubmitComment = async () => {
    try {
      // console.log(star);
      // console.log(comment);
      const data = {
        mentorId: '65840127a47c189dd995cdf3',
        menteeId: '658551f06a7e6920f9112a4a',
        ratingStar: star,
        content: comment,
      };
      const res = await commentApi.createComment(data);
      console.log(res);
      setStar(0);
      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <label style={{fontSize: '24px', fontWeight: 'bold'}}>
        Chúc mừng bạn đã hoàn thành khoá học, hãy để lại đánh giá của bạn đối
        với mentor!
      </label>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          width: '70%',
        }}
      >
        <Label style={{fontSize: '22px'}}>Đánh giá của bạn về mentor</Label>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <Rating
            name="hover-feedback"
            value={star}
            onChange={(event, newValue) => {
              setStar(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit" />}
            size="large"
          />
          {star !== null && (
            <Box>
              <Label className="ml-4" style={{fontSize: '18px'}}>
                {hover !== -1 ? `${hover} / 5` : `${Math.floor(star)} / 5`}
              </Label>
              {/* Display hovered rating or selected rating as a fraction */}
            </Box>
          )}
        </Box>
        <div className="w-full mt-3">
          <div className="mb-2 block">
            <Label
              htmlFor="comment"
              value="Đánh giá"
              style={{fontSize: '18px'}}
            />
          </div>
          <Textarea
            placeholder="Hãy để lại đánh giá của bạn ..."
            rows={4}
            className="w-full min-h-[100px]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            className="mt-4"
            color="blue"
            size="sm"
            onClick={() => handleSubmitComment()}
          >
            Gửi đánh giá
          </Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default RatingComment;
