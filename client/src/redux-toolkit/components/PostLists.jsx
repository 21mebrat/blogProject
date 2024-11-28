import React from 'react';
import { useSelector } from 'react-redux';
import { getPostError, getPostStatus, selectAllPosts } from '../slice';
import Container from './Container';

const PostLists = () => {
    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostStatus)
    const postError = useSelector(getPostError)
    let content;
    if (postStatus === 'loading') {
        content = <p>loadding...</p>
    }
    else if(postStatus === 'idle'){
        const sortedPost = posts.slice().sort((a, b) => b.time.localeCompare(a.time));
        const renderedPosts = sortedPost?.map(post => <Container key={post.id} post={post} />);
        content = renderedPosts
    }
    else if (postStatus === 'success') {
        const sortedPost = posts.slice().sort((a, b) => b.time.localeCompare(a.time));
        const renderedPosts = sortedPost?.map((post,index) => <Container key={index} post={post} />);
        content = renderedPosts
    }
    else {
        content = <p className='text-center text-2xl font-bold text-white mb-8'>{postError}</p>
    }


    return (
        <div className="bg-gray-900 min-h-screen py-10 px-4">
            <h1 className="text-center text-2xl font-bold text-white mb-8">Posts</h1>
            <div className="flex flex-wrap justify-center gap-6">
                {content}
            </div>
        </div>
    );
};

export default PostLists;
