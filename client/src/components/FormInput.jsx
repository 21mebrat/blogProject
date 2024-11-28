import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'

const FormInput = ({ onChange, onFocus, onBlur, isValid,isEmpty,defaultValue, ...input }) => {
  return (
    <div className='form-input-container'>
      <label className='flex items-center gap-3'> {input.name}
        { isEmpty &&
        <span>
          {!isValid ?
            <FaTimes className='text-red-500' />
            :
            <FaCheck className='text-green-500'/>}
        </span>
         }
      </label>
      <input

        {...input}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={defaultValue}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

      />
    </div>
  );
};

export default FormInput;
