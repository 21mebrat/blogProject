import React, { useEffect, useState } from 'react';
import image from '../assets/image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { Axios } from '../api/Axios';
import EditorJsHTML from 'editorjs-html';
import usePrivateAxios from '../context/usePrivateAxios';
import useAuth from '../context/useAuth';

const editorjs = EditorJsHTML();

const SingleBlog = ({ relatedBlogs }) => {
  const [singleBlog, setSingleBlog] = useState({ blog: { content: { blocks: [] } } });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const {auth} = useAuth()
const privateAxios = usePrivateAxios()
const fetchBlog = async () => {
  try {
    const response = await Axios.get(`/blog/get/${id}`);
    setSingleBlog(response.data);
    setComments(response.data?.comment || []);
    console.log(response.data.comment)
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    
    fetchBlog();
  }, [id]); // Adding id as a dependency to refetch if the id changes

  const html = singleBlog?.blog?.content ? editorjs.parse(singleBlog?.blog?.content).join(' ') : '';
const navigate = useNavigate()
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit =async (e) => {
    e.preventDefault();
    if(!auth) return navigate('/login')
    if (comment.trim()) {
      try {
        const response = await privateAxios.post('/comment/post',{comment,blogId:id})
        console.log(response)
        fetchBlog()
      } catch (error) {
        console.log(error)
      }
      setComment('');
    }
  };

  const dateFormatter = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className='bg-primary p-8'>
      <div>
        <h1 className='md:text-4xl text-3xl font-medium mb-4'>{singleBlog?.blog?.title}</h1>
        <p className='mb-6'>
          {dateFormatter(singleBlog?.blog?.createdAt)} by{' '}
          <span className='text-blue-400 cursor-pointer'>
            {singleBlog?.blog?.author?.userName}
          </span>
        </p>
      </div>

      <div>
        <img
          src={image}
          alt={singleBlog?.blog?.title}
          className='w-full md:h-[520px] bg-cover'
        />
      </div>

      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <div>
          <span>rating</span> <span>{singleBlog?.blog?.rating}(1,333,44 views)</span>
        </div>
      </div>

      {/* Comments section */}
      <div className='mt-6'>
        <h3 className='text-xl mb-4'>Comments</h3>
        <div className='mt-4'>
      {comments?.map((comment) => (
        <div key={comment._id} className='mb-6 p-4 bg-yellow-50 rounded-lg shadow-lg'>
          {/* Flex container for icon, name, and time */}
          <div className='flex items-start gap-4'>
            {/* Circular User Icon */}
            <div className='w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white'>
            <img src={comment?.user?.profileImage || image} alt="User Avatar" className='w-full h-full object-cover rounded-full' />
            </div>
            
            {/* User Name and Date in Column Layout */}
            <div className='flex flex-col border-b mt-4 border-gray-300'>
              <p className='font-semibold text-xs text-gray-600'>{comment?.user?.userName}</p>
              <p className='text-sm text-gray-500'>{dateFormatter(comment?.createdAt)}</p>
            </div>
          </div>

          {/* Comment Content */}
          <p className='text-base mt-2 text-gray-800'>{comment.comment}</p>
        </div>
      ))}
    </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder='Add your comment here...'
            className='w-full p-2 border rounded mb-4'
          ></textarea>
          <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
            Submit Comment
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default SingleBlog;
