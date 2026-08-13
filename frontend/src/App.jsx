/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/SigninPage";
import Dashboardinstructor from "./pages/Dashboardinstructor";
import UsersList from "./pages/UsersList";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";
import CorsesList from "./pages/CorsesList";
import CorseDetails from "./pages/CorseDetails";
import CartPage from "./pages/CartPage";
// import LessonsPage from "./pages/LessonsPage";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import LessonDetails from "./pages/LessonDetails";
import CategoryList from "./pages/CategoryList";
import MyCourses from "./pages/MyCourses"
import Lessons from "./pages/Lessons";
// import Assignments from "./pages/Assignments";
import CreateAssignments from "./pages/CreateAssignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import EditLesson from "./pages/EditLesson";
import CreateLesson from "./pages/CreateLesson";
import { useEffect } from "react";
import { getCurrentUser, logout } from "./services/authService";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Cart from "./pages/CartPage";
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
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        {/* <Route path="/lessons" element={<ProtectedRoute><LessonsPage /></ProtectedRoute>} /> */}

        <Route path="/ctegoriesList" element={<ProtectedRoute><CategoryList /></ProtectedRoute>} />
        <Route path="/Dashboardinstructor" element={<ProtectedRoute><Dashboardinstructor /></ProtectedRoute>} />
        
        <Route path="/all/lessons/:courseId" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
        <Route path="/CreateLesson/:courseId" element={<ProtectedRoute><CreateLesson /></ProtectedRoute>} />
        <Route path="/EditLesson/:lessonId" element={<ProtectedRoute><EditLesson /></ProtectedRoute>} />
        <Route path="/lessons/:lessonId" element={<ProtectedRoute><LessonDetails /></ProtectedRoute>} />
      
        <Route path="/createAssignment/:lessonId" element={<ProtectedRoute><CreateAssignments /></ProtectedRoute>} />
        <Route path="/assignments/details/:assignmentId" element={<ProtectedRoute><AssignmentDetails /></ProtectedRoute>} />
        
  
        <Route path="/createcourses" element={    <ProtectedRoute><CreateCourse /> </ProtectedRoute> } />
        <Route path="/myCourses" element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path="/editCourse/:id" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
        <Route path="/coursesList" element={<CorsesList />} />
        <Route path="/corseDetails/:id" element={<ProtectedRoute><CorseDetails /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
