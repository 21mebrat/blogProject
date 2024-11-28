import React from 'react';
import image from '../../assets/image.png';
import { Link } from 'react-router-dom';

const BlogCard = ({ blogs, isLoading, error }) => {
  if (isLoading) {
    return <p className="text-center text-gray-500">Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!blogs || blogs.length === 0) {
    return <p className="text-center text-gray-500">No blogs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
      {blogs.map((blog, index) => (
        <Link
        to={`/blog/${blog._id}`}
          key={index}
          className={`bg-white shadow-lg rounded-lg overflow-hidden`}
        >
          {/* Image Section */}
          <div
            className="h-48 sm:h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${blog.image || image})` }}
          ></div>

          {/* Content Section */}
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{blog.name}</h2>
            <p className="text-gray-600 mt-2">
              {blog?.title?.toString(0,50)}...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogCard;
