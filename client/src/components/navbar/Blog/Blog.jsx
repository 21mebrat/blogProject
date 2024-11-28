import React, { useState } from 'react'
import Search from '../../Search/Search'
import BlogCard from '../../BlogCards/BlogCard'
import { Axios } from '../../../api/Axios'
import { useBlog } from '../../../context/ContextProvider'

const Blog = () => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const { setBlog, blog,error,setError,isLoading,setIsLoading } = useBlog()


    // Handle search input change
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    // Handle form submission for search
    const handleSubmit = async (e) => {
        setIsLoading(true)
        setError('')  // Reset error state

        try {
            const response = await Axios.get(`/blog/get?search=${search}&category=${category}`)
            if (response.data.blogs.length === 0) {
                setError('No blogs found for the given search criteria.')  // No results message
            } else {
                setBlog(response.data.blogs)
            }
        } catch (err) {
            setError('Failed to fetch blogs. Please try again later.')
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='w-full  mx-auto'>
            {/* Top: Search Section */}
            <Search
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            {/* Display error or loading state */}
            {isLoading && <p className="text-center text-gray-500">Loading blogs...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Bottom: Blog Cards */}
            {blog && blog.length > 0 ? (
                <BlogCard blogs={blog} />
            ) : (
                !isLoading && <p className="text-center text-gray-500">No blogs to display.</p>
            )}
        </div>
    )
}

export default Blog
