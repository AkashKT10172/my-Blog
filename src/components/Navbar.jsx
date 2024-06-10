import React from 'react'
import {Link} from 'react-router-dom'
import { signOut} from 'firebase/auth';
import { auth } from '../firebase-config';
const Navbar = ({isAuth, setIsAuth}) => {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    })

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">AkashBLOG</Link>
    <div className="navbar-nav">
      <Link className="nav-item nav-link active" to="/">Home</Link>
      {!isAuth ? <Link className="nav-item nav-link" to="/login">Log-In</Link> :
      (
        <>
        <Link className="nav-item nav-link" to="/createblog">Create Post</Link>
        <button className='btn btn-dark' onClick = {signUserOut}>Log-Out</button>
        </>
      )
      }
    </div>
    </nav>
  )
}

export default Navbar