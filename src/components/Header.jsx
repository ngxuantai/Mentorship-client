import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo-no-text.png';
import {Link} from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
  return (
    <Container>
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="nav">
        <MenuContainer>
          <span>
            <Link to="/mentor/search">Tìm kiếm mentor</Link>
            <KeyboardArrowDownIcon style={{fontSize: '1rem'}} />
          </span>
          <div className="custom-menu">
            <div className="menu-column">
              <div className="menu-header">Tech Mentors</div>
              <ul>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
              </ul>
              <div className="menu-header">Career Mentors</div>
              <ul>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
              </ul>
            </div>
            <div className="menu-column">
              <div className="menu-header">Business Mentors</div>
              <ul>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
              </ul>
              <div className="menu-header">Design Mentors</div>
              <ul>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
                <li>
                  <a href="#">Javascript</a>
                </li>
              </ul>
            </div>
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
