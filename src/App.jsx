import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/LoginPage';
import SignUp from './pages/SignupPage';
import Search from './pages/SearchPage';
import DashBoard from './pages/Mentee/DashBoard';
import HomePage from './pages/HomePage';
import Settings from './pages/Mentee/Settings';
import Profile from './pages/ProfilePage';
import InformationForm from './pages/Mentee/ApplyProcess/InformationForm';
import ApplyProcess from './pages/Mentee/ApplyProcess/';
import useAuthStore from '../src/store/authStore';
import Mentor from './pages/Mentor/MentorPage';
import ApplyMentor from './pages/Mentor/ApplyMentor';

function App() {
  const setAuth = useAuthStore.getState().login;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mentee" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/mentee1" element={<InformationForm />} />
        <Route path="/mentee2" element={<ApplyProcess />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor/apply" element={<ApplyMentor />} />
      </Routes>
    </Router>
  );
}

export default App;
