import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import menteeApi from "../api/mentee";
import { colors } from "../constants/colors";
import firebaseInstance from "../services/firebase";
import { useUserStore } from "../store/userStore";

function SignupPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userFirebase = await firebaseInstance.createAccount(
        values.email,
        values.password
      );
      const mentee = await menteeApi.createMentee(values);
      await firebaseInstance.addUser(userFirebase.uid, {
        id: mentee.id,
        role: "mentee",
      });
      setUser({ ...mentee, role: "mentee" });
      navigate("/mentee");
    } catch (er) {
      console.log("er", er);
    }
  };

  return (
    <Container>
      <div className="brand-logo">
        {/* <img src={loginPic} alt="login picture" /> */}
      </div>
      <div className="signup-container">
        <section>
          <form
            className="signup-form"
            onSubmit={(event) => handleSubmit(event)}
          >
            <h1>Đăng ký làm mentee</h1>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                name="firstName"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                label="Tên"
                variant="outlined"
                sx={{ width: "100%", marginRight: 2, fontSize: "1rem" }}
              />
              <TextField
                name="lastName"
                onChange={(event) => handleChange(event)}
                autoComplete="off"
                label="Họ"
                variant="outlined"
                sx={{ width: "100%", fontSize: "1rem" }}
              />
            </div>
            <TextField
              name="email"
              onChange={(event) => handleChange(event)}
              autoComplete="off"
              label="Email"
              variant="outlined"
              sx={{ width: "100%", fontSize: "1rem" }}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                name="password"
                onChange={(event) => handleChange(event)}
                type={showPassword ? "text" : "password"}
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
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <OutlinedInput
                name="confirmPassword"
                onChange={(event) => handleChange(event)}
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleToggleConfirmPassword}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Nhập lại mật khẩu"
              />
            </FormControl>
            <button className="signup-btn" type="submit">
              Đăng ký
            </button>
            <span>
              Đã có tài khoản? <Link to="/auth/login">Đăng nhập</Link>
              <br />
              Muốn trở thành mentor? <Link to="/mentor">Nộp đơn ngay</Link>
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
  .signup-container {
    background-color: ${colors.ui.primary};
    width: 67%;
    section {
      padding: 4rem 2rem;
      .signup-form {
        max-width: 24rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        .signup-btn {
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

    .signup-container {
      width: 100%;
      .signup-form {
        max-width: 24rem;
      }
    }
  }
`;

export default SignupPage;
