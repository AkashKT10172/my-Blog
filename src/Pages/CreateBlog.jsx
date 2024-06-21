import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import {auth, db, imageDB} from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

const CreateBlog = () => {
  const isAuth = useSelector((state) => state.auth.value)

  const[title, setTitle] = useState('');
  const[post, setPost] = useState('');

  const [imgUrl, setImgUrl] = useState('')
  const [img, setImg] = useState('')

  const handleImageSubmit = async () => {
      const imgRef = ref(imageDB, "files/" + img.name)
      await uploadBytes(imgRef, img)
      const downloadURL = await getDownloadURL(imgRef)
      alert('image has been uploaded')
      setImgUrl(downloadURL)
  } 


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
          imgUrl,
          author: {
            name : auth.currentUser.email,
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
    <div className='bg-gray-800 h-screen'>
      <div className='flex flex-col items-center'>
       <h1 className='font-bold text-2xl text-blue-300 my-4'>CREATE A POST</h1>
       <div className='border-2 border-gray-500 p-2 bg-teal-200 md:w-2/4 w-[90%]'>
       <div className='sm:h-10 h-20 flex md:flex-row flex-col justify-between'>
          <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick = {handleImageSubmit}>Upload</button>
        </div>
        <div className='w-full'>
          <label htmlFor="title">Title</label>
          <input className='w-full border-2 border-gray-500' type="text" placeholder='Title'  
          onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='h-64 w-full'>
          <label htmlFor="posts">Post</label>
          <textarea className='w-full h-[80%] border-2 border-gray-500' placeholder='Post...' 
          name="" id="" 
          onChange={(e) => setPost(e.target.value)}/>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={createPost}>Publish</button>
      </div>
       </div>
    </div>
  )
}

export default CreateBlog