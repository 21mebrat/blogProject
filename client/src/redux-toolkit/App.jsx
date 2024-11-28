import React from 'react'
import PostLists from './components/PostLists'
import PostForm from './components/PostForm'
import { Route, Routes } from 'react-router-dom'
import SinglePost from './components/SinglePost'
import Header from './components/Header'
import UpdatePost from './components/UpdatePost'
import UserList from './components/UserList'
import SingleUser from './components/SingleUser'

const App = () => {
  return (
    <div className='w-full min-h-screen bg-[#333] text-white'>
      <Header />
     <Routes>
      <Route path='/' element={<PostLists />}  />
      <Route path='/post' element={<PostForm />}  />
      <Route path='/users' element={<UserList />}  />
      <Route path='/users?:userId' element={<SingleUser />}  />
      <Route path='/single/:postId' element={<SinglePost />}  />
      <Route path='/edit/:postId' element={<UpdatePost />}  />
      
     </Routes>
    </div>
  )
}

export default App
