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
    <nav className='flex sm:justify-between sm:flex-row flex-col items-center p-4 bg-green-400 opacity-85'>
    <Link className='font-bold pb-2' to="/">AkashBLOG</Link>
    <div className='sm:border-t-0 border-t-2 py-2'>
      <Link className='mx-2' to="/">Home</Link>
      {!isAuth ? <Link className='mx-2' to="/login">Log-In</Link> :
      (
        <>
        <Link className='mx-2' to="/createblog">Create Post</Link>
        <button className='bg-teal-500 hover:bg-teal-700 text-black-400 font-bold sm:py-2 px-4 rounded-sm' onClick = {signUserOut}>Log-Out</button>
        </>
      )
      }
    </div>
    </nav>
  )
}

export default Navbar