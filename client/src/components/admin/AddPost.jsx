import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../context/useAuth';
import usePrivateAxios from '../../context/usePrivateAxios';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { useBlog } from '../../context/ContextProvider';
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

  useEffect(() => {
    // Declare editor outside try-catch block

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
    });
    return async () => {
      console.log('excuted')
      await editor?.destroy(); // Destroy the editor only if it's a valid instance

      contentRef.current = null; // Reset the ref after cleanup
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (contentRef.current) {
        const content = await contentRef.current.save(); // Fetch editor content
        console.log(content);
  
        // Create a new FormData instance
        const formData = new FormData();
        formData.append('title', title);
        formData.append('discripation', discripation);
        formData.append('category', category);
        formData.append('content', JSON.stringify(content)); // Append editor content
        formData.append('ratting', ratting);
        formData.append('coverImage', coverImage);
  
        const response = await privateAxios.post('/blog/post', formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 200) {
          setMessage('Successfully posted!');
          await fetchBlog(); // Refresh blogs
          
        } else {
          setMessage('Sorry, some error occurred');
        }
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
                type="file"
                name="coverImage"
                placeholder="image url..."
                onChange={(e) => setCoverImage(e.target.files[0])}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xl font-semibold">Blog Category</label>
              <input
                className="w-full px-5 py-3 inline-block focus:outline-none"
                type="text"
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
