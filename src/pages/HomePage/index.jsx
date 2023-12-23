import {useEffect} from 'react';
import {useNavigate} from 'react-router';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import {UserRole} from '../../constants';
import {useUserStore} from '../../store/userStore';
import Service from './components/Service';
import SlideCard from './components/SlideCard';

function HomePage() {
  const navigate = useNavigate();
  const {user} = useUserStore();

  useEffect(() => {}, []);
  useEffect(() => {
    if (user) {
      if (user.role === UserRole.MENTEE) {
        navigate('/mentee');
      } else if (user.role === UserRole.MENTOR) {
        navigate('/mentor');
      }
    }
  }, [user]);
  return (
    <>
      <HomeContainer>
        <div className="brand-container">
          <p className="slogan">
            Học kĩ năng mới, khởi động dự án và đặt chân tới sự nghiệp mơ ước.
          </p>
          <h1>Mentorship</h1>
          <SearchForm>
            <input type="text" placeholder="Search for mentors" />
            <button>Search</button>
          </SearchForm>
          <div style={{width: '100%'}}>
            <SlideCard />
          </div>
        </div>
        <Service />
        <Footer />
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f9f7f3;
  overflow-x: hidden;
  .brand-container {
    margin: 6rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .slogan {
      font-size: 1.5rem;
    }
    h1 {
      color: #1c3d7a;
      font-size: 3rem;
      font-weight: 700;
    }
  }
`;

const SearchForm = styled.form`
  border-radius: 10px;
  background-color: #fff;
  width: 50%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  input {
    min-width: 70%;
    font-size: 1.1rem;
    padding: 0.8rem;
    border: none;
    &:focus-visible {
      outline: none;
    }
  }
  button {
    border-radius: 10px;
    background-color: #1c3d7a;
    padding: 0.8rem;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }
`;

export default HomePage;
