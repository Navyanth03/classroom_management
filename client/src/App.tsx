import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Banner from './pages/Banner';
import Landing from './pages/Landing';
import SignIn from './pages/Signin';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/Signup';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Banner />} />
        <Route path='/landing' element={<Landing/>}/>
        <Route path='/signup/teacher' element={<SignUp userRole='TEACHER'/>}/>
        <Route path='/signup/student' element={<SignUp userRole='STUDENT'/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App


