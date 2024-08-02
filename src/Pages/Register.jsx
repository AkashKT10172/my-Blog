import React from 'react'
import {auth} from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authorise } from '../auth/authSlice'
import { useState, useEffect } from 'react';
import { authoriseUser } from '../auth/userSlice';
import { useSelector } from 'react-redux';

const Register = () => {
  const isAuth = useSelector((state) => state.auth.value)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, Pass)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    localStorage.setItem('isAuth', true);
    localStorage.setItem('email', user.email);
    dispatch(authorise());
    dispatch(authoriseUser());
    navigate('/');
    }).catch((e) => {
      console.log(e)
      if(e.code === "auth/weak-password") {
        alert("password should be atleast 5 characters")
      }
      if(e.code === "auth/email-already-in-use") {
        alert("user with given e-Mail already exists")
      }

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
          <h1 className='sm:text-3xl text-2xl text-center'>Create an Account</h1>
          <p className='text-center sm:text-md text-sm'>Already an user?
          <span
            className= 'mx-2 text-[#9d0208] underline hover:text-blue-600 cursor-pointer'
            onClick={() => navigate('/login')}>
              Log In
          </span>
          </p>
          <form className='flex flex-col items-start w-full' onSubmit={handleSubmit}>
          
            <input type="text"
            name='fullName'
            required 
            placeholder='Name'
            className=' rounded-md mt-2 p-2 h-[40px] w-full border-2 border-gray-400'
            onChange={(e) => setFullName(e.target.value)}/>
           
            <input type="email"
            name='email'
            required 
            placeholder='Email'
            className='rounded-md mt-2 p-2 h-[40px] w-full border-2 border-gray-400'
            onChange={(e) => setEmail(e.target.value)}/>
            
            <input type="password"
            name='pass'
            required 
            placeholder='Password'
            className='rounded-md mt-2 p-2 h-[40px] w-full border-2 border-gray-400'
            onChange={(e) => setPass(e.target.value)}/>
            <button 
            className='mt-2 w-full hover:bg-[#6a040f] bg-[#9d0208] text-[#03071e] font-bold py-2 px-4 rounded'
            type='submit'>
              Sign Up
            </button>
            <div className='flex items-center w-full justify-center p-4 my-6 text-black border-t-2 border-gray-500'>
              <p className='sm:text-md text-sm'>Signin with Google </p>
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

export default Register