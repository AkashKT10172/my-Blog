import React, { useState, useEffect } from 'react'
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore'
import {auth, db} from '../firebase-config'

const Home = ({isAuth}) => {
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
    return <h3>Loading....</h3>
  }
  return (
    <div className="homepage mt-4">
      {postLists.length === 0 ? <h3>No Posts to show</h3> : postLists.map((post) => {
        return (
          <div key={post.id} className="card mb-4 shadow shadow-sm">
            <div className="card-body">
              {isAuth && post.author.id === auth.currentUser.uid ? <div className='d-flex justify-content-end'>
                  <button className='btn btn-danger mt-2 mx-3 mb-3' 
                    onClick={() => {deletePost(post.id)}}>Delete</button>
                  </div> : <></>}    
              <h5 className='card-title mb-3 fw-bold'>{post.title}</h5>
              <p className='card-title mb-3'>
                {post.post}
              </p>
              <span className='badge bg-dark'>{post.author.name}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home