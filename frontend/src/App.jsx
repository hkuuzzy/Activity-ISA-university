import { Navigate, Route, Routes } from "react-router-dom";
import AnnouncementPage from "./components/pages/AnnouncementPage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import StudentPage from "./components/pages/StudentPage.jsx";
import TeacherPage from "./components/pages/TeacherPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/students" element={<StudentPage />} />
      <Route path="/teachers" element={<TeacherPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/announcements" element={<AnnouncementPage />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}