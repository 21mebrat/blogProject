import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../userSlice'

const SingleUser = () => {
    const { userId } = useParams()
    const user = useSelector(selectUserById)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
                className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
                <Link to={`users/${user.id}`} className="text-xl font-semibold">{user.name}</Link>
                <p className="text-gray-300">{user.email}</p>
            </div>

        </div>
    )
}

export default SingleUser
