import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import {auth, db} from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
const CreateBlog = () => {
  const isAuth = useSelector((state) => state.auth.value)

  const[title, setTitle] = useState('');
  const[post, setPost] = useState('');

  let navigate = useNavigate();

  const postCollectionRef = collection(db, 'posts');
  const createPost = async() => {
    if(title === '' || post === ''){
      alert('Fill the fields')
      return false
    } else {
      try {
        await addDoc(postCollectionRef, {
          title,
          post,
          author: {
            name : auth.currentUser.displayName,
            id: auth.currentUser.uid
          }
        })
        navigate('/');
      } catch(error){
        console.log('error')
      }
      
    }
  }
  useEffect(() => {
    if(!isAuth) {
      navigate('/login')
    }
  })


  return (
    <div className="container">
      <div className="bg-light p-5 rounded mt-3">
        <h1>Create a Post</h1>
        <div className="mb-3">
          <label htmlFor="title" className='form-label' >Title</label>
          <input type="text" placeholder='Title' 
          className='form-control' 
          onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="posts" className='form-label'>Title</label>
          <textarea placeholder='Post...' 
          name="" id="" 
          className='form-control'
          onChange={(e) => setPost(e.target.value)}/>
        </div>
        <button className="btn btn-dark" onClick={createPost}>Publish</button>
      </div>
    </div>
  )
}

export default CreateBlog