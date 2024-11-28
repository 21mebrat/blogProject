import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './componets/Login'

const App = () => {
  return (
    <div className='bg-[#333] w-full h-screen justify-center items-center'>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
