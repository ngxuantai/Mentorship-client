import React from 'react';
import CardInfor from './CardInfor';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useState, useEffect} from 'react';
import mentorApi from '../../../api/mentor';

export default function SlideCard() {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    spaceBetween: 20,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    centerMode: true,
    centerPadding: '0',
  };
  const [randomMentors, setRandomMentors] = useState([11]);

  // Function to shuffle the array
  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  useEffect(() => {
    const fetchAllMentors = async () => {
      try {
        const allMentors = await mentorApi.getAllMentors();
        const shuffledMentors = shuffleArray(allMentors);
        setRandomMentors(shuffledMentors.slice(0, 11));
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchAllMentors();
  }, []);

  // const cardData = [
  //   {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van A', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van B', role: 'Frontend Developer, Backend Developer'},
  //   {name: 'Nguyen Van C', role: 'Frontend Developer, Backend Developer'},
  // ];

  return (
    <Slider {...settings}>
      {randomMentors.map((data) => (
        <CardInfor key={data.id} id={data.id}  firstName={data.firstName} lastName={data.lastName} avatar={data.avatar} jobTitle={data.jobTitle} />
      ))}
    </Slider>
  );
}
