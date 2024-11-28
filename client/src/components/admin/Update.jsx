import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../context/useAuth';
import usePrivateAxios from '../../context/usePrivateAxios';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { useBlog } from '../../context/ContextProvider';
import { useParams } from 'react-router-dom';
import { Axios } from '../../api/Axios';

const AddPost = () => {
    const { auth } = useAuth();
    const { fetchBlog } = useBlog();
    const [title, seTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [discripation, setDiscripation] = useState('');
    const [category, setCategory] = useState('');
    const [ratting, setReatting] = useState(0);
    const [message, setMessage] = useState('');
    const privateAxios = usePrivateAxios();
    const contentRef = useRef(null);

    const [singleBlog, setSingleBlog] = useState({ blog: { content: { blocks: [] } } });
    const { id } = useParams();
    const fetchSingleBlog = async () => {
        try {
            const response = await Axios.get(`/blog/get/${id}`);
            setSingleBlog(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        if (singleBlog?.blog?.title) {
            const editor = new EditorJS({
                holder: 'editorjs',
                onReady: () => {
                    contentRef.current = editor; // Assign the editor to the ref
                },
                autofocus: true,
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                },
                data: singleBlog?.blog?.content
            });

            // Cleanup function for the editor
            return () => {
                    editor.destroy(); // Destroy the editor only if it's a valid instance
                contentRef.current = null; // Reset the ref after cleanup
            };
        }
        fetchSingleBlog()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Ensure that contentRef is initialized and has the correct editor instance
            if (contentRef.current) {
                const content = await contentRef.current.save();
                console.log(content);

                const response = await privateAxios.patch(`/blog/update/${id}`, {
                    title: title || singleBlog.blog.title,
                    coverImage: coverImage || singleBlog?.blog.coverImage,
                    discripation:discripation || singleBlog?.blog.discripation,
                    category:category || singleBlog?.blog?.category,
                    content,
                    ratting:ratting || singleBlog?.blog?.ratting,
                });

                if (response.status !== 200) {
                    setMessage('Sorry, some error occurred');
                }
                await fetchBlog();
                setMessage('Successfully posted!');
                console.log(response)
            } else {
                setMessage('Failed to initialize editor');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
            setMessage('An error occurred while saving your post');
        }
    };

    return (
        <div className="bg-white md:p-8 p-2">
            <h1 className="text-2xl font-semibold">Create A New Post</h1>
            <form onSubmit={handleSubmit} className="space-y-2 p-8">
                <div>
                    <label className="text-xl font-semibold">Blog Title</label>
                    <input
                        className="w-full px-5 py-3 inline-block focus:outline-none"
                        type="text"
                        defaultValue={singleBlog?.blog?.title}
                        name="title"
                        onChange={(e) => seTitle(e.target.value)}
                        placeholder="Ex. Hotel Restaurant And So..."
                        required
                    />
                </div>

                {/* Blog detail */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="md:w-2/3 w-full">
                        <h1 className="text-xl font-semibold mb-5">Content Section</h1>
                        <p className="text-xs italic">Write Your Post here...</p>
                        {/* EditorJS */}
                        <div id="editorjs"></div>
                    </div>
                    <div className="md:w-1/3 w-full border p-5 space-y-5">
                        <h1 className="text-2xl font-semibold">Choose Blog Format</h1>

                        {/* Blog Cover */}
                        <div>
                            <label className="text-xl font-semibold">Blog Cover</label>
                            <input
                                className="w-full px-5 py-3 inline-block focus:outline-none"
                                type="text"
                                name="image"
                                defaultValue={singleBlog?.blog?.coverImage}
                                placeholder="image url..."
                                onChange={(e) => setCoverImage(e.target.value)}
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-xl font-semibold">Blog Category</label>
                            <input
                                className="w-full px-5 py-3 inline-block focus:outline-none"
                                type="text"
                                defaultValue={singleBlog?.blog?.category}

                                name="category"
                                placeholder="Ex. Hotel Restaurant And So..."
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-xl font-semibold">Blog Description</label>
                            <textarea
                                className="w-full px-5 py-3 inline-block focus:outline-none"
                                rows="4"
                                cols="4"
                                name="discr"
                                defaultValue={singleBlog?.blog?.discripation}

                                placeholder="Ex. Hotel Restaurant And So..."
                                onChange={(e) => setDiscripation(e.target.value)}
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="text-xl font-semibold">Blog Rating</label>
                            <input
                                className="w-full px-5 py-3 inline-block focus:outline-none"
                                type="number"
                                name="rat"
                                defaultValue={singleBlog?.blog?.ratting}
                                onChange={(e) => setReatting(e.target.value)}
                                placeholder="Ex. Hotel Restaurant And So..."
                                required
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="text-xl font-semibold">Blog Author</label>
                            <input
                                className="w-full px-5 py-3 inline-block focus:outline-none"
                                type="text"
                                name="auth"
                                placeholder={`${auth?.userName} none editable`}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Error or Success message */}
                {message && <p>{message}</p>}

                <button
                    className="bg-secondary-dark hover:bg-secondary text-white rounded-xl w-full py-3"
                    type="submit"
                >
                    Add Your Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
