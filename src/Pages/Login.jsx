import React from 'react'
import {auth , provider} from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { authorise } from '../auth/authSlice'


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
      </div>
     </div>
  )
}

export default Login