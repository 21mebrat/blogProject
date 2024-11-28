import React from 'react'
import SingleBlog from './SingleBlog'
import RelatedBlogs from './RelatedBlogs'

const SingleHome = () => {
    return (
        <div className="px-4 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 md:gap-12">
                {/* Main Blog Section */}
                <div className="lg:w-2/3 w-full">
                    <SingleBlog />
                </div>

                {/* Related Blogs Section */}
                <div className="lg:w-1/3 w-full">
                    <h2 className="text-2xl font-semibold mb-4">Related Blogs</h2>
                   <RelatedBlogs />
                </div>
            </div>
        </div>
    )
}

export default SingleHome
