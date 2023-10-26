import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
// import SignUp from "./pages/signupPage";
import Search from "./pages/SearchPage";
import DashBoard from "./pages/Mentee/DashBoard";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        {/* <Route path="/auth/signup" element={<SignUp />} /> */}
        <Route path="/search" element={<Search />} />
        <Route path="/mentee" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
