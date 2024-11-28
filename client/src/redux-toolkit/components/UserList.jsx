import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../userSlice';
import {Link} from 'react-router-dom'
const UserList = () => {
  const users = useSelector(selectAllUsers);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <Link to={`users/${user.id}`} className="text-xl font-semibold">{user.name}</Link>
            <p className="text-gray-300">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
