import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, deletePosts, postAdded, selectPostById, updatePosts } from '../slice';
import { selectAllUsers } from '../userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePost = () => {
    const dispatch = useDispatch();
    const { postId } = useParams()
    const users = useSelector(selectAllUsers);
    const post = useSelector((state) => selectPostById(state, postId));
console.log(post)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [addStatus, setAddStatus] = useState('idle')
    const navigate = useNavigate()
    const isSaveEnabled = [title, content, authorId].every(Boolean) && addStatus === 'idle';
    useEffect(() => {
        setTitle(post?.title)
        setAuthorId(post?.id)
        setContent(post?.body)
    }, [])

    const handleClick = () => {
        console.log(authorId)
        try {
            if (isSaveEnabled) {
                setAddStatus('pendding')
                dispatch(updatePosts({ id: post.id, title, body: content, authorId })).unwrap()
                setTitle('');
                setContent('');
                setAuthorId('');
                navigate(`/single/${post.id}`)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setAddStatus('idle')
        }
    };
    const handleDelete = () => {
        try {
            if (isSaveEnabled) {
                setAddStatus('pendding')
                dispatch(deletePosts({ id: post.id })).unwrap()
                setTitle('');
                setContent('');
                setAuthorId('');
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        } finally {
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
                <div className='flex justify-evenly gap-2'>
                <button
                    disabled={!isSaveEnabled}
                    className={`w-full px-4 py-2 rounded-md font-semibold ${isSaveEnabled
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-600 cursor-not-allowed text-gray-400'
                        }`}
                    onClick={handleClick}
                >
                    Save Post
                </button>
                <button
                    disabled={!isSaveEnabled}
                    className={`w-full px-4 py-2 rounded-md font-semibold ${isSaveEnabled
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-600 cursor-not-allowed text-gray-400'
                        }`}
                    onClick={handleDelete}
                >
                   Delete Post
                </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;
