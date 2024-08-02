import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import {auth, db, imageDB} from '../firebase-config'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';

const CreateBlog = () => {
  const isAuth = useSelector((state) => state.auth.value)
  const myUser = useSelector((state) => state.myUser.value)

  const[title, setTitle] = useState('');
  const[post, setPost] = useState('');

  const [imgUrl, setImgUrl] = useState('')
  const [img, setImg] = useState('')

  const currentDate = new Date().toISOString().split('T')[0];
  const time = new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds()
  const date = currentDate + '-' + time
  //console.log(date)
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
          date,
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
    <div className='bg-[#03071e] h-screen'>
      <div className='flex flex-col items-center '>
       <h1 className='font-bold text-2xl text-[#9d0208] my-4'>CREATE A POST</h1>
       <div className='border-2 border-gray-500 bg-[#94d2bd] md:w-2/4 w-[90%] p-4 rounded-md'>
       <div className='sm:h-10 h-20 flex sm:flex-row flex-col justify-between'>
          <input type="file" onChange={(e) => setImg(e.target.files[0])}/>
          <button className='hover:bg-[#6a040f] bg-[#9d0208] text-[#03071e] font-bold py-2 px-2 rounded-md' onClick = {handleImageSubmit}>Upload</button>
        </div>
        <div className='w-full'>
          <input className='my-2 w-full border-2 border-gray-500 rounded-md p-2' type="text" placeholder='Title'  
          onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className='h-64 w-full'>
          <label htmlFor="posts">Post</label>
          <textarea className='w-full h-[80%] border-2 border-gray-500 p-2 rounded-md' placeholder='Post...' 
          name="" id="" 
          onChange={(e) => setPost(e.target.value)}/>
        </div>
        <button className='hover:bg-[#6a040f] bg-[#9d0208] text-[#03071e] font-bold py-2 px-4 rounded-md' onClick={createPost}>Publish</button>
      </div>
       </div>
    </div>
  )
}

export default CreateBlog