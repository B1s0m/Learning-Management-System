import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="sidebar">
      <h2 className="logo">LMS</h2>

      <div className="sidebar-links">
        {user && user.role === "admin" ? (
          <>
            <Link to="/usersList">Users List</Link>
            <Link to="/coursesList">📚 Courses List</Link>
            <Link to="/ctegoriesList">Categories</Link>
            <button onClick={logout}>Sign Out</button>
          </>
        ) : user && user.role === "student" ? (
          <>
            <Link to="/coursesList">📚 Courses List</Link>
            <Link to="/myCourses">📚 My Courses</Link>
            <Link to="/cart">🛒 Cart</Link>
            <button onClick={logout}>Sign Out</button>
          </>
        ) : user && user.role === "instructor" ? (
          <>
            <Link to="/">🏠 Dashboard</Link>
            <Link to="/myCourses">📚 My Courses</Link>
            <Link to="/createcourses">➕ Create Course</Link>
            <Link to="/profile">👤 Profile</Link>
            <button onClick={logout}>🚪 Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/coursesList">📚Courses List</Link>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/sign-in">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
