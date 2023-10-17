import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/loginPage';
import SignUp from './pages/signupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
