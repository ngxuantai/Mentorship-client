import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignupPage';
import Search from './pages/SearchPage';
import Settings from './pages/Mentee/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
