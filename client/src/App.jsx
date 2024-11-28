
import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import SingleBlog from './pages/SingleBlog'
import image from './assets/image.png'
import SingleHome from './pages/SingleHome'
import Login from './components/Login'
import Persist from './components/Persist'
import AdminLayout from './components/admin/AdminLayout'
import Dashbord from './components/admin/Dashbord'
import AddPost from './components/admin/AddPost'
import ManagePosts from './components/admin/ManagePosts'
import ManageUsers from './components/admin/ManageUsers'
import PrivateRoute from './components/admin/PrivateRoute'
import Update from './components/admin/Update'
import Forgot from './components/Forgot'
import PasswordReset from './pages/PasswordReset'
const relatedBlogs = [
  { id: 1, title: "Blog 1", imageUrl: image },
  { id: 2, title: "Blog 2", imageUrl: image },
  { id: 3, title: "Blog 3", imageUrl: image },

];

const App = () => {
  return (
    <div className="bg-primary p-0 text-secondary-dark h-screen w-[90%] mx-auto">
      <Navbar />
      <Routes >
        {/* public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotPassord' element={<Forgot />} />
        <Route path='/reset-password' element={<PasswordReset />} />


        <Route element={<Persist />}>
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />} >
              <Route path='/dashbord' element={<Dashbord />} />
              <Route path='/add' element={<AddPost />} />
              <Route path='/manage' element={<ManagePosts />} />
              <Route path='/users' element={<ManageUsers />} />
              <Route path='/update/:id' element={<Update />} />
            </Route>
          </Route>
          <Route path='/blog/:id' element={<SingleHome relatedBlogs={relatedBlogs} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
