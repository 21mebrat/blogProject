import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import dateFormatter from '../../utils/dateFormatter'
const formatData = (blogs) => {
   return blogs?.map(blog => ({
        name: dateFormatter(blog?.createdAt),
        post: blog?.title?.length,
        pv: blog?.pageViews || 0,
        amt: blog?.amt || 0

    }))
}
const BlogChart = ({ blogs }) => {
    const data = formatData(blogs)
    return (
        <div className='p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-xl font-semibold mb-4'>Blogs Chart</h1>
            <div className='h-80'>
                <ResponsiveContainer width='100%' height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0


                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="post" stroke='#884d8' fill='#888' />
                    </AreaChart>

                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BlogChart
