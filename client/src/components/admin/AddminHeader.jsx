import React, { useEffect } from 'react'
import {FaUser} from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import useLogout from '../../context/useLogout'
import useAuth from '../../context/useAuth'
const AddminHeader = () => {
    const {auth} = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()
    useEffect(()=>{
        if(!auth) return navigate('/login')
    },[logout])
    return (
        <div className='space-y-5 bg-white p-8 md:h-[cal(100vh-98px)] flex flex-col justify-between'>
                <div className='mb-5'>
                   <FaUser />
                    <p className='font-semibold'>Admin</p>
                </div>
         <hr />
        <div>
        <ul className='space-y-5 pt-5'>
            <li>
                <NavLink to='/dashbord' className={({isActive})=>isActive ? 'text-blue-500 font-bold':'text-black'}>Admim</NavLink>
            </li>
         
            <li>
                <NavLink to='/add' className={({isActive})=>isActive ? 'text-blue-500 font-bold':'text-black'}>AddPosts</NavLink>
            </li>
         
            <li>
                <NavLink to='/manage' className={({isActive})=>isActive ? 'text-blue-500 font-bold':'text-black'}>manage</NavLink>
            </li>
         
            <li>
                <NavLink to='/users' className={({isActive})=>isActive ? 'text-blue-500 font-bold':'text-black'}>users</NavLink>
            </li>
         
         </ul>
        </div>
        <div className='mb-3'>
            <hr />
            <button onClick={logout} type="button" className='text-white px-4 py-1 bg-red-500 rounded-sm'>logout</button>
        </div>
        </div>
    )
}

export default AddminHeader
