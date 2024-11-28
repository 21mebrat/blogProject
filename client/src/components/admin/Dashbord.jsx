import React from 'react'
import useAuth from '../../context/useAuth'
import { FaBlog, FaUser } from 'react-icons/fa'
import { RiAdminLine } from 'react-icons/ri'
import { useBlog } from '../../context/ContextProvider'
import useComment from '../../context/useComment'
import BlogChart from './BlogChart'
const Dashbord = () => {
  const { auth,users } = useAuth()
  const n = useComment()
  const { blog, error, isLoading } = useBlog()
  return (
    <>
      {isLoading && !error ? (<p>loadding ....</p>) : (<p>{error}</p>)}
      <div className='space-y-6'>
        <div className='bg-bgPrimary p-5'>
          <h1>hi {` ${auth?.userName}`}</h1>
          <p>welcome to admin dashbord</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est cumque illo accus</p>
        </div>
        {/* cards */}
        <div className='flex flex-col md:flex-row justify-center gap-8 pt-8'>
          {/*first cards */}
          <div className='bg-indigo-100 py-5 w-full space-y-1 rounded-sm flex flex-col items-center'>
            <FaUser className='text-indigo-600 size-8' />
            <p>{users.length} user</p>
          </div>
          {/*second cards */}
          <div className='bg-red-100 py-5 w-full space-y-1 rounded-sm flex flex-col items-center'>
            <FaBlog className='text-red-600 size-8' />
            <p>{blog.length}</p>
          </div>
          {/*third cards */}
          <div className='bg-lime-100 py-5 w-full space-y-1 rounded-sm flex flex-col items-center'>
            <RiAdminLine className='text-lime-600 size-8' />
            <p>2 Admins</p>
          </div>
          {/*third cards */}
          <div className='bg-orange-100 py-5 w-full space-y-1 rounded-sm flex flex-col items-center'>
            <FaUser className='text-orange-600 size-8' />
            <p>{n} comments</p>
          </div>

        </div>
        {/* Graph and Chart */}
        <div className='pt-5 mb-5'>
          <BlogChart blogs={blog} />
        </div>
      </div>
    </>
  )
}

export default Dashbord
