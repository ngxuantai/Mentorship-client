import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthStore from "../src/store/authStore";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Applications from "./pages/Mentee/Applications";
import ApplyProcess from "./pages/Mentee/ApplyProcess/";
import InformationForm from "./pages/Mentee/ApplyProcess/InformationForm";
import DashBoard from "./pages/Mentee/DashBoard";
import Inquires from "./pages/Mentee/Inquires";
import Settings from "./pages/Mentee/Settings";
import Wishlist from "./pages/Mentee/Wishlist";
import ApplyMentor from "./pages/Mentor/ApplyMentor";
import Mentor from "./pages/Mentor/MentorPage";
import Profile from "./pages/ProfilePage";
import Search from "./pages/SearchPage";
import SignUp from "./pages/SignupPage";

function App() {
  const setAuth = useAuthStore.getState().login;

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        <Route path="/mentee/applications" element={<Applications />} />
        <Route path="/mentee/inquires" element={<Inquires />} />
        <Route path="/mentee/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}

export default App;
