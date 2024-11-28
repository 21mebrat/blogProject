import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts";

// Initial state: an array of posts
const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

// Async thunk to fetch posts
export const fetchposts = createAsyncThunk("posts/fetchposts", async () => {
    try {
        const response = await axios.get(url);
        return [...response.data];
    } catch (error) {
        return error.message;
    }
});
//Async tunk to post new posts
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPosts) => {
    try {
        const response = await axios.post(url, initialPosts)
        return response.data
    } catch (error) {
        return error.message
    }

})
export const updatePosts = createAsyncThunk('posts/updatePosts', async (initialPosts) => {
    const { id } = initialPosts
    try {
        const response = await axios.put(`${url}/${id}`, initialPosts)
        return response.data
    } catch (error) {
        return error.message
    }

})
export const deletePosts = createAsyncThunk('posts/deletePosts', async (initialPosts) => {
    const { id } = initialPosts
    try {
        const response = await axios.delete(`${url}/${id}`, initialPosts)
        if (response.status === 200) return initialPosts
        return `${response.status}:${response.statusText}`
    } catch (error) {
        return error.message
    }

})
// Create a slice for posts
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload); // Add the new post to the state
            },
            prepare({ title, content, authorId }) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        time: new Date().toISOString(),
                        authorId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            rocket: 0,
                            heart: 0,
                            coffee: 0,
                        },
                    },
                };
            },
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            const existing = state.posts.find((post) => post.id === postId);
            if (existing) {
                existing.reactions[reaction]++;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchposts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchposts.fulfilled, (state, action) => {
                state.status = "success";
                let min = 1;
                const loadedPost = action.payload?.map((post) => {
                    post.time = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        rocket: 0,
                        heart: 0,
                        coffee: 0,
                    };
                    return post;
                });
                state.posts = state.posts.concat(loadedPost);
            })
            .addCase(fetchposts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.time = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    rocket: 0,
                    heart: 0,
                    coffee: 0,
                }
                state.posts.push(action.payload)
            })
            .addCase(updatePosts.fulfilled, (state, action) => {
                const { id } = action.payload
                if (!id) {
                    console.log('There is no id send please try again.')
                }
                action.payload.time = new Date().toISOString()
                const prevPosts = state.posts.filter(post => post.id !== Number(id))
                const currentPost = state.posts.find(post => post.id === Number(id))
                state.posts = [...prevPosts, { ...currentPost, ...action.payload }]
            })
            .addCase(deletePosts.fulfilled, (state, action) => {
                const { id } = action.payload
                if (!id) return console.log('The id is not passed please try again.')
                const post = state.posts.filter(post => post.id !== Number(id))
                state.posts = post
            })
    },
});

// Selector to get all posts from the state
export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const selectPostById = (state, postId) => {
    return state.posts.posts.find(post => post.id === Number(postId))
}
// Export the postAdded action and reducer
export const { postAdded, reactionAdded } = postSlice.actions;
export default postSlice.reducer;
