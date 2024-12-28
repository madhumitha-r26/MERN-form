import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>}></Route> 
      <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </>
  )
}

export default App
