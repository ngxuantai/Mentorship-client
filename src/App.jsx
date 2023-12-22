import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import ProtectedRoute from "./navigation/ProtectedRoute";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Applications from "./pages/Mentee/Applications";
import ApplyMentee from "./pages/Mentee/ApplyMentee";
import ApplyProcess from "./pages/Mentee/ApplyProcess/";
import InformationForm from "./pages/Mentee/ApplyProcess/InformationForm";
import DashBoard from "./pages/Mentee/DashBoard";
import DoExam from "./pages/Mentee/DoExam";
import Inquires from "./pages/Mentee/Inquires";
import ListExam from "./pages/Mentee/ListExam";
import { default as MenteeSettings } from "./pages/Mentee/Settings";
import Wishlist from "./pages/Mentee/Wishlist";
import ApplyMentor from "./pages/Mentor/ApplyMentor";
import MentorCalendar from "./pages/Mentor/Calendar";
import DetailExam from "./pages/Mentor/DetailExam";
import Examination from "./pages/Mentor/Examination";
import Mentor from "./pages/Mentor/MentorPage";
import MentorSettings from "./pages/Mentor/Settings";
import Profile from "./pages/ProfilePage";
import Search from "./pages/SearchPage";
import SignUp from "./pages/SignupPage";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor/search" element={<Search />} />
        <Route path="/mentor/profile" element={<Profile />} />
        <Route path="/mentor/calendar" element={<MentorCalendar />} />
        <Route path="/mentor/settings" element={<MentorSettings />} />
        <Route path="/mentor/apply" element={<ApplyMentor />} />

        <Route path="/mentee" element={<DashBoard />} />
        <Route path="/mentee1" element={<InformationForm />} />
        <Route path="/mentee2" element={<ApplyProcess />} />
        <Route path="/mentee/apply" element={<ApplyMentee />} />
        <Route path="/mentee/settings" element={<MenteeSettings />} />
        <Route
          path="/mentee/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentee/inquires"
          element={
            <ProtectedRoute>
              <Inquires />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentee/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route path="/mentee/exam" element={<ListExam />} />
        <Route path="/mentee/exam/:id" element={<DoExam />} />

        <Route path="mentor/examination" element={<Examination />} />
        <Route path="mentor/examination/:id" element={<DetailExam />} />
      </Routes>
    </Router>
  );
}

export default App;
