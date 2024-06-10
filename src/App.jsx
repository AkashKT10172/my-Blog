import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import { useState } from 'react';
import Home from './Pages/Home.jsx'
import CreateBlog from './Pages/CreateBlog.jsx'
import Login from './Pages/Login.jsx'
const App = () => {

  const[isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  return (
  <>
  <div className="App">
    <Router>
      <Navbar isAuth = {isAuth} setIsAuth ={setIsAuth}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home isAuth = {isAuth}/>} />
          <Route path="/login" element={<Login  setIsAuth ={setIsAuth} />} />
          <Route path="/createblog" element={<CreateBlog isAuth = {isAuth}/>} />
        </Routes>
      </div>
    </Router>
  </div>
    
  </>
   
  )
}

export default App
