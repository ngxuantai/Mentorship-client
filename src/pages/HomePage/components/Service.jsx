import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import findMentor from '../../../assets/find-mentor.svg';
import applyMentorship from '../../../assets/apply-mentorship.svg';
import levelupSkill from '../../../assets/levelup-skill.svg';
import {Link, useNavigate} from 'react-router-dom';

export default function Service() {
  const navigate = useNavigate();
  return (
    <ServiceContainer>
      <h2>At your fingertips: a dedicated career coach.</h2>
      <p>
        Want to ace your next job interview? Successfully build your startup?
        Itching to learn high-demand skills? Work smart with an online mentor or
        coach by your side to offer expert advice and guidance to match your
        zeal. Become unstoppable using MentorCruise.
      </p>
      <div className="service-card-container">
        <div className="service-card">
          <h3>Find a mentor</h3>
          <div className="service-card-icon">
            <img src={findMentor} />
          </div>
          <p>
            Get matched with an expert mentor who will help you build your
            skills and accomplish your goals.
          </p>
        </div>
        <div className="service-card">
          <h3>Apply for Mentorship</h3>
          <div className="service-card-icon">
            <img src={applyMentorship} />
          </div>
          <p>
            Fill in an application, and if you’re a match with your chosen
            mentor you can start your free 7-day trial.
          </p>
        </div>
        <div className="service-card">
          <h3>Level up your skills</h3>
          <div className="service-card-icon">
            <img src={levelupSkill} />
          </div>
          <p>
            From personal chats to hands-on support, each mentor offers
            different services to help you skyrocket your career.
          </p>
        </div>
      </div>
      <div className="btn-mentor">
        <button
          onClick={(e) => {
            navigate('/mentor/search');
          }}
        >
          Find a Mentor
        </button>
        <span>
          <Link to="/mentor">Become a Mentor</Link>
        </span>
      </div>
    </ServiceContainer>
  );
}

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1c3d7a;
  color: #fff;
  h2 {
    text-align: center;
    width: 60%;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 4rem;
  }
  p {
    font-size: 1.25rem;
    margin-bottom: 4rem;
    width: 60%;
    text-align: center;
  }
  .service-card-container {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5rem;
    gap: 2rem;
    .service-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      p {
        text-align: center;
        font-size: 1rem;
        width: 80%;
      }
    }
  }
  .btn-mentor {
    margin-bottom: 4rem;
    button,
    span {
      padding: 1rem 2rem;
      border-radius: 5px;

      color: #fff;
      font-weight: bold;
      font-size: 1rem;
      margin: 0 0.5rem;
      border: none;
    }
    button {
      background-color: #21a391;
      &:hover {
        opacity: 0.8;
      }
    }
    span {
      a {
        text-decoration: none;
        color: #fff;
        &:hover {
          color: #21a391;
        }
      }
    }
  }
`;
