import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  return (
    <nav>
      {user && user.role == "admin" ?
      (<><button onClick={logout}>Sign Out</button>
      <Link to='/usersList'>Users List</Link>
        <Link to='/coursesList'>Corses List</Link>
        <Link to=''>Catygories</Link>
      </>)
      :
      user && user.role == "student" ? 
      (<>
        <button onClick={logout}>Sign Out</button>
        <Link to=''>Corses</Link>
        <Link to=''>Cart</Link>
      </>)
      :user && user.role == "instructor"?
      (<>
        <button onClick={logout}>Sign Out</button>
        <Link to="/createcourses">Create Corse</Link>
        <Link to="">My Corses</Link>
        
      </>)
      :<>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
        <Link to=''>Corses List</Link>
      </>
      }
    </nav>
  )
}

export default Navbar