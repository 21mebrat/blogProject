import React from 'react'
import AuthorPost from './AuthorPost';
import Time from './Time';
import ReactionBtn from './ReactionBtn';
import { Link } from 'react-router-dom';
const Container = ({post}) => {
  return (
    <div
    className="border border-gray-700 bg-gray-800 rounded-lg shadow-md p-6 m-4 flex flex-col justify-center items-center text-center text-white max-w-sm w-full sm:w-1/2 lg:w-1/3"
>
<h2 className="text-xl font-semibold mb-2">{post.title?.substring(0, 20)}...</h2>
    <p className="text-sm text-gray-300 mb-4">{post.body?.substring(0,100)}...</p>
    <p className='flex gap-4'>
    <Link className='underline' to ={`/single/${post.id}`}>view post</Link>
    <AuthorPost userId={post.userId} />
    <Time timeStamp={ post.time} />
    </p>
    <ReactionBtn post={post} />
</div>
  )
}

export default Container
