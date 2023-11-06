import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {colors} from '../constants/colors';
import useAuthStore from '../store/authStore';

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore.getState().login;
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuth(values);
    localStorage.setItem('token', '123456');
    console.log(values);
    navigate('/mentee');
  };

  return (
    <Container>
      <div className="brand-logo">
        {/* <img src={loginPic} alt="login picture" /> */}
      </div>
      <div className="login-container">
        <section>
          <form
            className="login-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1>Đăng nhập</h1>
            {/* <Tabs>
              <a
                className="tab"
                onClick={() => handleTabChange('mentee')}
                isActive={tab === 'mentee'}
              >
                I'm a mentee
              </a>
              <a
                className="tab"
                onClick={() => handleTabChange('mentor')}
                isActive={tab === 'mentor'}
              >
                I'm a mentor
              </a>
            </Tabs> */}
            <TextField
              name="email"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Tên đăng nhập hoặc email"
              variant="outlined"
              sx={{width: '100%', fontSize: '1rem'}}
            />
            <FormControl variant="outlined">
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
            </FormControl>
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
    background-color: ${colors.ui.secondary};
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
