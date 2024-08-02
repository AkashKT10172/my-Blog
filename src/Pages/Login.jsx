import React from 'react'
import {auth , provider} from '../firebase-config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authorise } from '../auth/authSlice'
import { useState, useEffect } from 'react';
import { authoriseUser } from '../auth/userSlice';
import { useSelector } from 'react-redux';


const Login = () => {
  const isAuth = useSelector((state) => state.auth.value)
  console.log(isAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem('isAuth', true);
      localStorage.setItem('email', user.email);
      dispatch(authorise());
      dispatch(authoriseUser());
      navigate('/');
    })
  }
  const [email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, Pass)
    .then((userCredential) => {
    const user = userCredential.user;
    localStorage.setItem('isAuth', true);
    localStorage.setItem('email', user.email);
    dispatch(authorise());
    dispatch(authoriseUser());
    navigate('/');
    })
    .catch((e) => {
      alert('invalid credentials')
    })
  }
  useEffect(() => {
    if(isAuth) {
      navigate('/')
    }
  })
  return (
     <div className='bg-[#03071e] h-screen flex justify-center'>
      <div className='flex flex-col items-center sm:w-[400px] w-[300px]  mx-2 h-96 my-4 p-4 bg-[#94d2bd] border-2 border-gray-500 rounded-md'>
        
        <div className='w-full p-4'>
          <h1 className='sm:text-3xl text-2xl text-center mb-2'>Login to your account</h1>
          <p className='text-center sm:text-md text-sm'>Don't have an account yet?
          <span
            className= 'mx-2 text-[#9d0208] underline hover:text-blue-600 cursor-pointer'
            onClick={() => navigate('/register')}>
              Sign Up
          </span>
          </p>
          
          <form className='mt-6 flex flex-col items-start w-full' onSubmit={handleSubmit}>
            <input type="email"
            name='email'
            required 
            className='p-2 h-[40px] w-full border-2 border-gray-400 rounded-md'
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}/>
            <input type="password"
            name='pass'
            required 
            placeholder='Password'
            className='mt-2 p-2 h-[40px] w-full border-2 border-gray-400 rounded-md'
            onChange={(e) => setPass(e.target.value)}/>
            <button 
            className='w-full mt-2 hover:bg-[#6a040f] bg-[#9d0208] text-[#03071e] font-bold py-2 px-4 rounded-md'
            type='submit'>
              Login
            </button>
            <div className='flex items-center w-full justify-center p-4 my-6 text-black border-t-2 border-gray-500'>
              <p className='sm:text-md text-sm'>Login with Google </p>
              <button className='ml-2 hover:bg-[#6a040f] bg-[#9d0208] text-[#03071e] font-bold py-2 sm:px-4 px-2 rounded-md'
                onClick={signInWithGoogle}>
                Google
              </button>
        </div>
          </form>
        </div>
      </div>
     </div>
  )
}

export default Login