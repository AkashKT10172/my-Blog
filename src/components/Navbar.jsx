import React from 'react'
import {Link} from 'react-router-dom'
import { signOut} from 'firebase/auth';
import { auth } from '../firebase-config';
import { useSelector, useDispatch } from 'react-redux'
import { deAuthorise } from '../auth/authSlice';
import logo from './BlogLogo.png'

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.value);
  const myUser = useSelector((state) => state.myUser.value);

  console.log(myUser);
  
  const dispatch = useDispatch()

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      dispatch(deAuthorise);
      window.location.pathname = "/login";
    })

  }
  return (
    <nav className='flex sm:justify-between sm:flex-row flex-col items-center p-4 bg-red-400 opacity-85 md:h-20'>
    <Link className='font-bold' to="/"><img src={logo} className='h-16 w-20'></img></Link>
    <div className='sm:border-t-0 border-t-2 py-2'>
      <Link className='mx-2 text-[#370617]' to="/">Home</Link>
      {!isAuth ? <><Link className='mx-2 text-[#370617]' to="/login">Log-In</Link>
       <Link className='mx-2 text-[#370617]' to="/register">Sign-Up</Link> </>:
      (
        <>
        <Link className='mx-2 text-[#370617]' to="/createblog">Create Post</Link>
        <button className='bg-[#d00000] hover:bg-[#9d0208] text-[#370617] font-bold sm:py-2 px-4 rounded-sm' onClick = {signUserOut}>Log-Out</button>
        </>
      )
      }
    </div>
    </nav>
  )
}

export default Navbar