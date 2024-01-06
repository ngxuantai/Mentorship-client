import {Visibility, VisibilityOff} from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import {FloatingLabel, TextInput, Label} from 'flowbite-react';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import menteeApi from '../api/mentee';
import mentorApi from '../api/mentor';
import {UserRole} from '../constants';
import {colors} from '../constants/colors';
import firebaseInstance from '../services/firebase';
import {useUserStore} from '../store/userStore';
import loginPic from '../assets/logo-no-text.png';
// import {useUserStore} from '../store/userStore';

function LoginPage() {
  const navigate = useNavigate();
  const {user, setUser, login} = useUserStore();
  const setAuth = useUserStore.getState().login;
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  // const [tab, setTab] = useState('mentor');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleTabChange = (selectedTab) => {
  //   setTab(selectedTab);
  // };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await firebaseInstance.signIn(
        values.email,
        values.password
      );
      console.log(userCredential);
      const user = userCredential.user;
      //userId in firestore != userId in .net
      const doc = await firebaseInstance.getUser(user.uid);
      const userInfo = doc.data();
      let userData;
      if (userInfo.role === UserRole.MENTEE) {
        userData = await menteeApi.getMentee(userInfo.id);
      } else if (userInfo.role === UserRole.MENTOR) {
        userData = await mentorApi.getMentorById(userInfo.id);
        console.log('userData', userData);
      }
      login({...userData, role: userInfo.role});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (user) {
        if (user.role === 'mentee') {
          navigate('/mentee');
        } else if (user.role === 'mentor') {
          navigate('/mentor');
        }
      }
    })();
  }, [user]);

  return (
    <Container>
      <div className="brand-logo">
        <img src={loginPic} alt="login picture" />
      </div>
      <div className="login-container">
        <section>
          <form
            className="login-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1>Đăng nhập</h1>
            <FloatingLabel
              name="email"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Tên đăng nhập hoặc email"
              variant="outlined"
              sx={{width: '100%', fontSize: '1rem'}}
            />
            <FloatingLabel
              name="password"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Mật khẩu"
              variant="outlined"
              sx={{width: '100%', fontSize: '1rem'}}
              type={showPassword ? 'text' : 'password'}
            />

            {/* <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={(event) => handleChange(event)}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mật khẩu"
              />
            </FormControl> */}
            <button className="login-btn" type="submit">
              Đăng nhập
            </button>
            <span>
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </span>
            <span>
              Chưa có tài khoản?
              <br /> <Link to="/auth/signup">Đăng kí làm mentee</Link> hoặc{' '}
              <Link to="/mentor">Nộp đơn làm mentor</Link>
            </span>
          </form>
        </section>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  .brand-logo {
    width: 33%;
    background-color: #1da1f2;
  }
  .login-container {
    background-color: ${colors.ui.primary};
    width: 67%;
    section {
      padding: 4rem 2rem;
      .login-form {
        max-width: 24rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        .login-btn {
          background-color: ${colors.button.primary};
          color: white;
          border: none;
          border-radius: 10px;
          padding: 1rem;
          font-size: 1rem;
          cursor: pointer;
          &:hover {
            background-color: ${colors.button.secondary};
          }
        }
        span {
          font-size: 1rem;
          a {
            font-weight: 600;
            color: #1da1f2;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    .brand-logo {
      display: none;
    }

    .login-container {
      width: 100%;
      .login-form {
        max-width: 24rem;
      }
    }
  }
`;

// const Tabs = styled.div`
//   border-bottom: 2px solid #e5e7eb;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 1rem;
//   .tab {
//     width: 50%;
//     display: flex;
//     justify-content: center;
//     padding: 0.5rem 1rem;
//     font-size: 1rem;
//     cursor: pointer;
//     text-decoration: none;
//     color: ${(props) => (props.isActive ? '#000' : '#6B7280')};
//     border-bottom: ${(props) =>
//       props.isActive ? '2px solid #06B6D4' : 'none'};
//     transition: color 0.2s, border-bottom 0.2s;
//     &:hover {
//       color: #1e3a8a;
//       border-bottom: 2px solid #1e3a8a;
//     }
//   }
// `;

export default LoginPage;
