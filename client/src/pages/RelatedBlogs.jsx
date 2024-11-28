import React, { useEffect, useState } from 'react';
import { useBlog } from '../context/ContextProvider';
import { Axios } from '../api/Axios';
import { Link, useParams } from 'react-router-dom';
import image from '../assets/image.png'; // Example placeholder image

const RelatedBlogs = () => {
    const [RBlogs, setRBlogs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await Axios.get(`/blog/relatedBlogs/${id}`);
                setRBlogs(response?.data?.relatedBlogs);
            } catch (error) {
                console.log(error);
            }
        };
        fetching();
    }, [id]);

    return (
        <div>
            {RBlogs?.map((blog, index) => (
                <Link to={`/blog/${blog._id}`} key={index} className="flex items-center border-b pb-4 mb-4">
                    <div className="w-16 h-16 mr-4">
                        {/* Circular image */}
                        <img
                            src={image} // Replace with `blog.user.profileImage` or actual image URL
                            alt={blog.title}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                        <h3 className="font-semibold text-xl text-blue-500">{blog.title?.substring(0, 20)}...</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            {blog?.title?.substring(0, 50)}...
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RelatedBlogs;
