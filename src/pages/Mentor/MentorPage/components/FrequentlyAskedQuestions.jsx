import React from 'react'
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';

function FrequentlyAskedQuestions() {
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <h2>Frequently Asked Questions</h2>
          <span>Can’t find the answer you’re looking for? Reach out to our customer support team.</span>
        </Col>
        <Col sm={8}>
          <h6>How does this whole thing work?</h6>
          <span>People are looking for mentors, you would like to mentor. MentorCruise is merely the way to connect the two sides and making sure experiences go well.
              In practice, you'll get a mentoring profile incl. mentoring packages you are ready to offer. It's your public signal that you're available for mentoring and you'll see bookings come in very quickly.</span>
          
          <h6>How much time does it take?</h6>
          <span>You are busy, we understand that. That's why we designed our program around efficiency. The time you invest will always be in your control and spent on useful things.
The average mentor on our platform has 2-3 mentees and spends around 30 minute per mentee per week.</span>
          
          <h6>What's expected from me?</h6>
          <span>Mentees come with various expectations which they are asked to outline during their outreach to you. We only expect open communication and empathy in negotiating what you can actually take on.</span>
          
          <h6>Who are the Mentees?</h6>
          <span>Mentees come from all walks of life. The majority of our mentees are industry professionals looking to grow or for a career change. Some work on their own product and startups, others are new to tech.</span>
        </Col>
      </Row>
    </Container>
  )
}

const Container = styled.div`
  
`;

export default FrequentlyAskedQuestions