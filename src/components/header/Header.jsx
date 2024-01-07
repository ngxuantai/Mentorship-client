import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import fieldApi from '../../api/field';
import skillApi from '../../api/skill';
import Logo from '../../assets/logo-no-text.png';
import {UserRole} from '../../constants';
import {useUserStore} from '../../store/userStore';
import menteeApi from '../../api/mentee';
import mentorApi from '../../api/mentor';
import MenteeHeader from './MenteeHeader';
import MentorHeader from './MentorHeader';
import {useNavigate} from 'react-router';

export default function Header() {
  const {user, setUser} = useUserStore();
  console.log('user', user);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [typeHeader, setTypeHeader] = useState('unauth');

  useEffect(() => {
    const fetchData = async () => {
      console.log('userData', userData);
      if (Object.keys(user).length !== 0) {
        console.log('user', user);
        if (user.role === UserRole.MENTEE) {
          setTypeHeader('mentee');
        } else if (user.role === UserRole.MENTOR) {
          setTypeHeader('mentor');
        }
      } else if (userData) {
        console.log('userData', userData);
        let userDataFromApi;
        if (userData.role === UserRole.MENTEE) {
          userDataFromApi = await menteeApi.getMentee(userData.id);
          console.log('userDataFromApi', userDataFromApi);
          setUser({...userDataFromApi, role: userData.role});
          setTypeHeader('mentee');
        } else if (userData.role === UserRole.MENTOR) {
          userDataFromApi = await mentorApi.getMentorById(userData.id);
          console.log('userDataFromApi', userDataFromApi);
          setUser({...userDataFromApi, role: userData.role});
          setTypeHeader('mentor');
        }
      } else {
        setTypeHeader('unauth');
      }
      // if (userData !== null && !user) {
      //   let userDataFromApi;
      //   if (userData.role === UserRole.MENTEE) {
      //     userDataFromApi = await menteeApi.getMentee(userData.id);
      //   } else {
      //     userDataFromApi = await mentorApi.getMentorById(userData.id);
      //   }
      //   console.log('userDataFromApi', userDataFromApi);
      //   if (userDataFromApi !== null) {
      //     setUser({...userDataFromApi, role: userData.role});
      //   }
      // }
    };

    fetchData();
  }, [user, userData, setUser]);

  switch (typeHeader) {
    case 'mentee':
      return <MenteeHeader />;
    case 'mentor':
      return <MentorHeader />;
    case 'unauth':
      return <UnAuthHeader />;
  }
}
function UnAuthHeader() {
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getField = async () => {
      const fieldsData = await fieldApi.getAllFields();

      const updatedFields = await Promise.all(
        fieldsData.map(async (field) => {
          const skills = await skillApi.getSkillsByFieldId(field.id);

          return {...field, skills: skills.slice(0, 4)};
        })
      );

      setFields(updatedFields);
    };

    getField();
  }, []);

  return (
    <Container>
      <div className="logo cursor-pointer" onClick={() => navigate('/')}>
        <img src={Logo} alt="logo" />
      </div>
      <div className="nav">
        <MenuContainer>
          <span>
            <Link to="/mentor/search">Tìm kiếm mentor</Link>
            <KeyboardArrowDownIcon style={{fontSize: '1rem'}} />
          </span>
          <div className="custom-menu">
            {fields.map((field) => (
              <div className="menu-column" key={field.id}>
                <div className="menu-header">{field.name}</div>
                <ul>
                  {field.skills.map((skill) => (
                    <li key={skill.id}>
                      <Link to={`/mentor/search?skillId=${skill.id}`}>
                        {skill.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </MenuContainer>
        <div>
          <span className="btn-login">
            <Link to="/auth/login">Đăng nhập</Link>
          </span>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12rem;
  .logo {
    img {
      max-width: 70px;
      height: auto;
    }
  }
  .nav {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    span {
      border-radius: 5px;
      padding: 0.5rem 1rem;
      color: black;
      font-weight: bold;
      a {
        text-decoration: none;
        color: black;
      }
    }
    .btn-login {
      &:hover {
        a {
          color: #fff;
        }
        background-color: #1c3d7a;
      }
    }
  }
`;

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  &:hover .custom-menu {
    display: flex;
  }
  .custom-menu {
    display: none;
    flex-direction: row;
    position: absolute;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 0;
    margin: 0;
    z-index: 1;
    right: 0;
    .menu-column {
      display: inline-block;
      padding: 1rem;
      font-size: 1.2rem;
      .menu-header {
        font-weight: bold;
        margin-bottom: 10px;
        min-width: 170px;
        &:last-child {
          margin-top: 10px;
        }
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        li {
          padding-left: 12px;
          padding-bottom: 8px;
          border-radius: 5px;
          a {
            text-decoration: none;
            color: #1c3d7a;
          }
          &:hover {
            background-color: #e9ecff;
          }
        }
      }
    }
  }
`;
