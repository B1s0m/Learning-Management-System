import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import UsersList from "./pages/UsersList";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";
import CorsesList from "./pages/CorsesList";
import CorseDetails from "./pages/CorseDetails";
import CartPage from "./pages/CartPage";
import LessonDetails from "./pages/LessonDetails";
import CategoryList from "./pages/CategoryList";
import MyCourses from "./pages/MyCourses"
import Lessons from "./pages/Lessons";
import Assignments from "./pages/Assignments";

import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/usersList" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
        <Route path="/userDetails/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />
        <Route path="/editUser/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
        <Route path="/coursesList" element={<CorsesList />} />
        <Route path="/corseDetails/:id" element={<ProtectedRoute><CorseDetails /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/ctegoriesList" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path="/myCourses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/all/lessons/:courseId" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
        <Route path="/lessons/:lessonId" element={<ProtectedRoute><LessonDetails /></ProtectedRoute>} />
        <Route path="/assignments/:lessonId" element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
