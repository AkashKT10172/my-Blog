import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Pages/Home.jsx'
import CreateBlog from './Pages/CreateBlog.jsx'
import Login from './Pages/Login.jsx'

const App = () => {
  return (
  <>
  <div>
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createblog" element={<CreateBlog/>} />
        </Routes>
      </div>
    </Router>
  </div>
    
  </>
   
  )
}

export default App
