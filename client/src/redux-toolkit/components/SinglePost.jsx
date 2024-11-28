import React from 'react'
import { useSelector } from 'react-redux'
import { selectPostById } from '../slice'
import AuthorPost from './AuthorPost'
import Time from './Time'
import ReactionBtn from './ReactionBtn'
import { Link, useParams } from 'react-router-dom'

const SinglePost = () => {
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    if (!post) {
        return (
            <section className="flex justify-center items-center h-screen bg-bg-[#333] text-white">
                <h1 className="text-2xl font-semibold text-white">Post Not Found</h1>
            </section>
        )
    }

    return (
        <div className='max-w-[70%] mx-auto bg-[#333] text-white flex justify-center mt-5'>
        <section className="max-w-4xl mx-auto   bg-gray-900 text-white shadow-lg rounded-lg p-4 ">
            <h1 className="text-4xl font-bold text-gray-200 mb-4">{post.title}</h1>
            <p className="text-lg text-gray-400 mb-6">{post.body}</p>

            <div className="flex gap-5 items-center mb-6">
            <Link className='underline' to ={`/edit/${post.id}`}>Edit post</Link>
                <AuthorPost userId={post.id} />
                <Time timeStamp={post.time} />
            </div>

            <div className="flex justify-around">
                <ReactionBtn post={post} />
            </div>
        </section>
        </div>
    )
}

export default SinglePost
