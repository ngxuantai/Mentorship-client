import React from 'react';
import CardInfor from './CardInfor';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function SlideCard() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    spaceBetween: 20,
    slidesToScroll: 6,
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    centerPadding: '0',
  };

  const cardData = [
    {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
    {name: 'Nguyen Van C', role: 'Frontend Developer, Backend Developer'},
  ];

  return (
    <Slider {...settings}>
      {cardData.map((data, index) => (
        <CardInfor key={index} name={data.name} role={data.role} />
      ))}
    </Slider>
  );
}
