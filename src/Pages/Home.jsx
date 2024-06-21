import React, { useState, useEffect } from 'react'
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore'
import {auth, db} from '../firebase-config'
import { useSelector } from 'react-redux'

const Home = () => {
  const isAuth = useSelector((state) => state.auth.value);

  const [postLists, setPostLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const postCollectionRef = collection(db, 'posts');

  const getPosts = async() => {
    setLoading(true);
    const data = await getDocs(postCollectionRef);
    setPostLists(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    setLoading(false)
  }
  useEffect(() => {
    getPosts();
  },[])

  const deletePost = async(id) => {
      const postdoc = doc(db, 'posts', id);
      await deleteDoc(postdoc);
      getPosts();
  }
  if(loading) {
    return <h3 className='bg-gray-800 h-screen flex items-center justify-center text-white'>Loading....</h3>
  }
  return (
    <div>
      {postLists.length === 0 ? <h3>No Posts to show</h3> : postLists.map((post) => {
        return (
          <div key={post.id} className='flex flex-col items-center p-4 bg-gray-800 min-h-[calc(100vh-80px)]'>
            <div className='border-2 border-gray-600 flex lg:flex-row flex-col-reverse justify-between items-center mx-4 my-8 p-2 rounded-lg lg:w-2/3 md:w-[75%] w-full h-auto bg-teal-200'>
              <div className='lg:w-2/4 w-full lg:min-h-96 h-auto lg:mr-4 p-2 rounded-lg'>
              <h5 className='text-black min-h-[15%] h-auto text-3xl font-semibold border-b-2 text-center border-gray-500 pb-2'>{post.title}</h5>
              <p className="h-auto lg:min-h-72 pb-4 text-justify">
                {post.post}
              </p>
              <h5 className='min-h-[10%] h-auto flex items-end border-t-2 border-gray-500'>Author : {post.author.name}</h5>
              {isAuth && post.author.id === auth.currentUser.uid ? <div className='min-h-[10%] h-auto'>
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {deletePost(post.id)}}>Delete</button>
              </div> : <></>}    
              </div>
              
              <img src={post.imgUrl} className='lg:w-96 w-full h-96 object-cover' />
              
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home