import React from 'react';
import { useDispatch } from 'react-redux';
import { reactionAdded } from '../slice'; // Ensure this is correctly defined in the slice

const ReactionBtn = ({ post }) => {
    const reactionEmojo = {
        thumbsUp: '👍',  // thumbs up emoji
        wow: '😲',       // wow emoji
        rocket: '🚀',    // rocket emoji
        heart: '❤️',     // heart emoji
        coffee: '☕'      // coffee emoji
    };

    const dispatch = useDispatch();

    // Make sure post.reaction has the correct initial state
    const reactionButtons = Object.entries(reactionEmojo).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type='button'
                onClick={() => dispatch(reactionAdded({ postId: post?.id, reaction: name }))}
            >
                {emoji} {post?.reactions[name] || 0}
            </button>
        );
    });

    return <div>{reactionButtons}</div>;
};

export default ReactionBtn;
