import React from 'react'
import { Outlet } from 'react-router-dom'
import AddminHeader from './AddminHeader'

const AdminLayout = () => {
  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-3 items-start justify-start'>
        <header className='lg:w-1/5 sm:w-2/5 w-full'>
            <AddminHeader />
        </header>
        <main className="text-black p-8 w-full">
        <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout
