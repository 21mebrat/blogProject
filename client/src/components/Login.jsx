import React, { useEffect, useReducer, useState } from 'react';
import FormInput from './FormInput';
import { FaInfoCircle } from 'react-icons/fa';
import { api } from '../api/Axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const VALIDATE_NAME = /^[A-Z][a-zA-Z]*$/;
const VALIDATE_EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const VALIDATE_PASSWORD = /^.{6,}$/;

const TYPE_FORMDATA = 'TYPE_FORMDATA';
const TYPE_VALIDATION = 'TYPE_VALIDATION';
const TYPE_FOCUS = 'TYPE_FOCUS';

const initialState = {
  formData: { userName: '', email: '', password: '' },
  validation: { userName: false, email: false, password: false },
  focused: { userName: false, email: false, password: false },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case TYPE_FORMDATA:
      return { ...state, formData: { ...state.formData, [action.field]: action.fValue } };
    case TYPE_VALIDATION:
      return { ...state, validation: { ...state.validation, [action.field]: action.fValue } };
    case TYPE_FOCUS:
      return { ...state, focused: { ...state.focused, [action.field]: action.fValue } };
    default:
      return state;
  }
};

const Login = () => {
  const [error, setError] = useState(null);
  const [currentState, setCurrentState] = useState('login');
  const [state, formDispatch] = useReducer(formReducer, initialState);
  const { setAuth, persist, setPersist,token,setToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';

  const togglePersist = () => setPersist((prev) => !prev);

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    formDispatch({ type: TYPE_FORMDATA, field: name, fValue: value });
    let isValid = false;
    if (name === 'email') isValid = VALIDATE_EMAIL.test(value);
    else if (name === 'password') isValid = VALIDATE_PASSWORD.test(value);
    else isValid = VALIDATE_NAME.test(value);
    formDispatch({ type: TYPE_VALIDATION, field: name, fValue: isValid });
  };

  const handleFocus = (e) => formDispatch({ type: TYPE_FOCUS, field: e.target.name, fValue: true });
  const handleBlur = (e) => formDispatch({ type: TYPE_FOCUS, field: e.target.name, fValue: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = currentState === 'SignUp' ? '/user/register' : '/user/login';
    try {
      const response = await api.post(url, state.formData);
      if (response.status === 200) {
        if (currentState === 'SignUp') {
          setError('Successfully registered. Please login.');
          setCurrentState('login');
        } else {
          setAuth(response.data.user);
          setToken(response.data.accessToken)
          navigate(from,{replace:true});
        }
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (err) {
      console.log(err)
      setError(err.response?.status === 403 ? 'Incorrect email or password.' : 'Login failed.');
    }
  };

  const isDisabled =
    currentState === 'SignUp'
      ? !state.validation.userName || !state.validation.email || !state.validation.password
      : !state.validation.email || !state.validation.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">{currentState}</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {currentState === 'SignUp' && (
          <FormInput
            name="userName"
            type="text"
            placeholder="User Name"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isEmpty={state.formData.userName}
            isValid={state.validation.userName}
          />
        )}
        {!state.validation.userName && state.focused.userName && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <FaInfoCircle /> User Name must start with an uppercase letter.
          </p>
        )}

        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isEmpty={state.formData.email}
          isValid={state.validation.email}
        />
        {!state.validation.email && state.focused.email && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <FaInfoCircle /> Email must be valid.
          </p>
        )}

        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isEmpty={state.formData.password}
          isValid={state.validation.password}
        />
        {!state.validation.password && state.focused.password && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <FaInfoCircle /> Password must be at least 6 characters.
          </p>
        )}

        <button
          type="submit"
          className={`mt-4 w-full py-2 text-white ${isDisabled ? 'bg-gray-400 disable' : 'bg-blue-500 enable hover:bg-blue-600'
            } rounded`}
          disabled={isDisabled}
        >
          {currentState === 'SignUp' ? 'Register' : 'Login'}
        </button>

        <div className="flex items-center justify-between  mt-4">
          <div className='flex items-center  mt-4'>
            <input
              type="checkbox"
              onChange={togglePersist}
              checked={persist}
              id="persist"
              className="mr-2"
            />
            <label htmlFor="persist" className="text-sm">
              Remember me
            </label>
          </div>
          <Link to='/forgotPassord' className="text-blue-500 block text-center mt-4">
            Forgot Password?
          </Link>
        </div>


        <p className="text-center mt-4">
          {currentState === 'SignUp'
            ? 'Already have an account?'
            : "Don't have an account?"}{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setCurrentState(currentState === 'login' ? 'SignUp' : 'login')}
          >
            {currentState === 'SignUp' ? 'Login' : 'SignUp'} here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
