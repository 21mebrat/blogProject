import React, { useState } from 'react';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll, selectCurrentToken, setCredential } from '../features/auth/authSlice';

const Login = () => {
  const [login, { data, isLoading, error }] = useLoginMutation();
  const token = useSelector(selectCurrentToken)
  const [credentials, setCredentials] = useState({ email: '', password: ''});
const dispatch = useDispatch()
const allData = useSelector(selectAll)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response=    await login(credentials);
    dispatch(setCredential({userName:response.data.user.userName,accessToken:response.data.user.accessToken}))
console.log(response)
console.log(allData,'token')
    } catch (error) {
        console.log(error)
    }

  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="w-full mb-4 p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {data && (
          <p className="text-green-500 text-center mt-4">Login successful!{JSON.stringify(allData.userName)}</p>
        )}
        {error && (
          <p className="text-red-500 text-center mt-4">
            Error: {error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
