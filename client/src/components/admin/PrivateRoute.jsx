import React from 'react'
import useAuth from '../../context/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return auth?.accessToken ? <Outlet />
        : <Navigate to='/login' state={{ from: location }} replace />
}

export default PrivateRoute
