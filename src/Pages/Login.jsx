import React from 'react'
import {auth , provider} from '../firebase-config';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authorise } from '../auth/authSlice'
import { useState } from 'react';


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      dispatch(authorise());
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
    console.log(user);
    localStorage.setItem('isAuth', true);
    dispatch(authorise());
    navigate('/');
    })
  }
  return (
     <div className="container">
      <div className="card mt-5 text-center">
        <div className="card-body">
          <p className="display-6 mt-3">Sign In with Google</p>
          <button className="btn btn-dark"
          onClick={signInWithGoogle}>
            Google
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email"
            name='email'
            required 
            onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="pass">Password</label>
            <input type="password"
            name='pass'
            required 
            onChange={(e) => setPass(e.target.value)}/>
            <button type='submit'>
              SignIn
            </button>
          </form>
        </div>
      </div>
     </div>
  )
}

export default Login