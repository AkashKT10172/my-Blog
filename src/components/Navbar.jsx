import React from 'react'
import {Link} from 'react-router-dom'
import { signOut} from 'firebase/auth';
import { auth } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux'
import { authorise, deAuthorise } from '../auth/authSlice';

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch()

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      dispatch(deAuthorise);
      window.location.pathname = "/login";
    })
    

  }
  console.log(isAuth);
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