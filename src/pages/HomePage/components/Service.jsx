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
      <h2>Trong tầm tay: một người cố vấn tận tâm</h2>
      <p>
        Bạn muốn tỏa sáng trong cuộc phỏng vấn việc làm kế tiếp hoặc xây dựng
        một công ty khởi nghiệp của riêng bạn? Bạn muốn học các kỹ năng làm việc
        mới? Hãy đến với MentorShip để có thể học tập với người cố vấn đầy kinh
        nghiệm hoặc huấn luyện viên trực tuyến bên cạnh bạn, từ đó có được lời
        khuyên và hướng dẫn chuyên môn phù hợp với đam mê của bạn.
      </p>
      <div className="service-card-container">
        <div className="service-card">
          <h3>Tìm kiếm người cố vấn</h3>
          <div className="service-card-icon">
            <img src={findMentor} />
          </div>
          <p>
            Kết nối với người cố vấn, từ đó giúp bạn xây dựng kĩ năng và hoàn
            thiện mục tiêu của mình.
          </p>
        </div>
        <div className="service-card">
          <h3>Nộp đơn Mentorship</h3>
          <div className="service-card-icon">
            <img src={applyMentorship} />
          </div>
          <p>
            Điền đơn đăng ký và nếu bạn thấy mình phù hợp với người cố vấn mà
            bạn chọn, bạn sẽ có được 7 ngày trải nghiệm miễn phí.
          </p>
        </div>
        <div className="service-card">
          <h3>Nâng cao kĩ năng</h3>
          <div className="service-card-icon">
            <img src={levelupSkill} />
          </div>
          <p>
            Từ trò chuyện cá nhân đến hỗ trợ thực tế, mỗi người cố vấn cung cấp
            các dịch vụ khác nhau để giúp bạn thăng tiến nhanh chóng trong sự
            nghiệp của mình.
          </p>
        </div>
      </div>
      <div className="btn-mentor">
        <button
          onClick={(e) => {
            navigate('/mentor/search');
          }}
        >
          Tìm mentor
        </button>
        <span>
          <Link to="/mentor">Trở thành mentor</Link>
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
