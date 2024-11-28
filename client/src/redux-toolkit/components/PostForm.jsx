import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, postAdded } from '../slice';
import { selectAllUsers } from '../userSlice';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const navigate = useNavigate()

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
     const [addStatus,setAddStatus] = useState('idle')
    const isSaveEnabled = [title,content,authorId].every(Boolean) && addStatus === 'idle';

    const handleClick = () => {
        try{  
        if (isSaveEnabled) {
            setAddStatus('pendding')
            dispatch(addNewPost({ title, body:content, authorId })).unwrap()
            setTitle('');
            setContent('');
            setAuthorId('');
            navigate('/')
        }
    }catch(err){
        console.log(err)
    }finally{
        setAddStatus('idle')
    }
    };

    return (
        <div className="flex justify-center min-h-screen items-center bg-gray-900 text-white">
            <div className="max-w-md w-full flex flex-col bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-center">Create a Post</h2>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none bg-gray-700 rounded-md p-3 mb-4 text-white"
                    type="text"
                    placeholder="Enter Title"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none bg-gray-700 rounded-md p-3 mb-4 text-white h-28"
                    placeholder="Enter Content"
                />
                <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none bg-gray-700 rounded-md p-3 mb-4 text-white w-full"
                >
                    <option value="" disabled>
                        Select Author
                    </option>
                    {users?.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                <button
                    disabled={!isSaveEnabled}
                    className={`w-full px-4 py-2 rounded-md font-semibold ${
                        isSaveEnabled
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-600 cursor-not-allowed text-gray-400'
                    }`}
                    onClick={handleClick}
                >
                    Save Post
                </button>
            </div>
        </div>
    );
};

export default PostForm;
