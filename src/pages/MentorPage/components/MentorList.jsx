import React from 'react'
import styled from 'styled-components';
import MentorCard from './MentorCard';
import {Row ,Col  } from 'react-bootstrap';

const CardData = [
    {src: 'https://cdn.mentorcruise.com/cache/d5c1d62ca0957904d08fe9ad4d693284/f05b17eaca9ec8b5/8989375029cc2f6083af2f20752c8182.jpg',
    quote: '"Learn to empower and enable people"',
    people: 'Naz Delam, Manager at Netflix'},
    {src: 'https://cdn.mentorcruise.com/cache/11b3957253c28003f259967d2440d325/4509c379aa46c9b1/643a38cfa7313456ad20db44f0a4bb99.jpg',
    quote: '"Give back to the future generation"',
    people: 'Lloyd Jacob, Startup founder'},
    {src: 'https://cdn.mentorcruise.com/cache/12ec0f90fb6dc2e29b8fb6df2fb9dd2c/2c94a0954d2a585f/fe48d9de8ee2c143940417fd4894278a.jpg',
    quote: '"Lose your imposter syndrome"',
    people: 'Julien Leforestier, UXR at Spotify'},
    {src: 'https://cdn.mentorcruise.com/cache/624ae8df3a1df734c57e992db968eec1/ffe9606f537aec34/dd0237ae9671f07e23e02bb3404b21f9.jpg',
    quote: '"Getting enriched at a professional"',
    people: 'Emanuelle Blanco, CTO'},
    {src: 'https://cdn.mentorcruise.com/cache/c2fc19a82afb75aafffab06984484c0b/747568ba9350818a/5455ec9956ff6fd5dedec6ff44cbf9c2.jpg',
    quote: '"Ensure people dont make the same mistakes"',
    people: 'Bethan Vincent, Marketer'},
    {src: 'https://cdn.mentorcruise.com/cache/25e7e0d5d2997dea105bb57997100bf8/736327c3f5aa14f4/962fbc1120941f32079fb7b7102f7c54.jpg',
    quote: '"Gaining practical knowledge in new areas"',
    people: 'Hui Xiang Chua, Data Scientist'},
    {src: 'https://cdn.mentorcruise.com/cache/d453df2b4e4b6a0646ca63f45a224d55/1c7586d43056efce/f50c75a51253e5ad1d75210629af27ae.jpg',
    quote: '"Building and displaying leadership qualities"',
    people: 'Keith Brewster, Developer'},
    {src: 'https://cdn.mentorcruise.com/cache/fdde737efa217b8035450eff2df306c1/86749ee67be261c4/353ac8803fde841f5e9bf1f790b48aa4.jpg',
    quote: '"Building a network and a community"',
    people: 'Jason McCarty, Product Manager'},
    {src: 'https://cdn.mentorcruise.com/cache/91c7b3c74a49bd9b22ceeb5f667c9916/3d0721bd3d31951a/c2a69a8dd909ba963194b2cf916723b5.jpg',
    quote: '"Getting to meet new people around the world"',
    people: 'Eric Crawford, Product Consultant'}
];

function MentorList() {
  return (
    <Container className='d-flex flex-row justify-content-center'>
        {CardData.map((data, index) => (
        // Create a new row for every third card
        index % 3 === 0 && (
          <Row key={index} className={`${index === 0 ? 'pt-3' : index === 3 ? 'pt-5' : ''}`}>
            {CardData.slice(index, index + 3).map((data, cardIndex) => (
              <Col key={cardIndex}>
                <MentorCard src={data.src} quote={data.quote} people={data.people}/>               
              </Col>
            ))}
          </Row>
        )
      ))}      
    </Container>
  )
}

const Container = styled.div`

`;

export default MentorList