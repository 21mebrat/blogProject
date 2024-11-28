import React from 'react';

const Search = ({ handleChange, handleSubmit }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex">
      {/* Input Field */}
      <input
        className="border-2 border-secondary w-[100%] p-2 rounded-tl-xl rounded-bl-xl focus:outline-none focus:border-blue-500"
        type="search"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        name="search"
        placeholder="Search here..."
      />
      
      {/* Button */}
      <button
        onClick={handleSubmit}
        className="bg-secondary-light text-white p-2 rounded-tr-xl rounded-br-xl hover:bg-secondary-dark transition-all duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
