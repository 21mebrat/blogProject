import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../userSlice';

const AuthorPost = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const author = users?.find(user => user.id === userId);
    return <span className='text-white'>by {author ? " "+author.username : 'Unknown Author'}</span>;
};

export default AuthorPost;
 