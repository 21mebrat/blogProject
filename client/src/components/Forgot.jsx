import React, { useReducer, useState } from 'react';
import FormInput from './FormInput';
import { FaInfoCircle } from 'react-icons/fa';
import { api } from '../api/Axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const VALIDATE_EMAIL = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const TYPE_FORMDATA = 'TYPE_FORMDATA';
const TYPE_VALIDATION = 'TYPE_VALIDATION';
const TYPE_FOCUS = 'TYPE_FOCUS';

const initialState = {
  formData: { email: '' },
  validation: { email: false, },
  focused: { email: false, },
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

const Forgot = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [state, formDispatch] = useReducer(formReducer, initialState);
  const { setAuth, setToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    formDispatch({ type: TYPE_FORMDATA, field: name, fValue: value });
    let isValid = false;
    if (name === 'email') isValid = VALIDATE_EMAIL.test(value);
    formDispatch({ type: TYPE_VALIDATION, field: name, fValue: isValid });
  };

  const handleFocus = (e) => formDispatch({ type: TYPE_FOCUS, field: e.target.name, fValue: true });
  const handleBlur = (e) => formDispatch({ type: TYPE_FOCUS, field: e.target.name, fValue: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/change', { email: state.formData.email });
      if (!response.status === 200) return setMessage('Error occured Please try again')
      setMessage(response.data.message)
    } catch (err) {
      console.log(err)
      setError(err.response?.status === 403 ? 'Incorrect email or password.' : 'Login failed.');
    }
  };

  const isDisabled = !state.validation.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Please Enter Your Email Here</h1>
        { message && <p className='text-center'>{message}</p>}
        <FormInput
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          isEmpty={state.formData.email}
          isValid={state.validation.email}
        />
        {!state.validation.email && state.focused.email && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <FaInfoCircle /> email must be at least 6 characters.
          </p>
        )}

        <button
          type="submit"
          className={`mt-4 w-full py-2 text-white ${isDisabled ? 'bg-gray-400 disable' : 'bg-blue-500 enable hover:bg-blue-600'
            } rounded`}
          disabled={isDisabled}
        >
          send
        </button>

      </form>
    </div>
  );
};

export default Forgot;
