import React, { createContext, useContext, useEffect, useState } from 'react'
import { Axios } from '../api/Axios'
const blogContext = createContext()
export const useBlog = ()=>useContext(blogContext)
const ContextProvider = ({children}) => {
    const [blog,setBlog] = useState([])
    const [isLoading, setIsLoading] = useState(false)  // For loading state
    const [error, setError] = useState('')  // For error handling
    const fetchBlog = async (e) => {
      setIsLoading(true)
      setError('')  // Reset error state

      try {
          const response = await Axios.get(`/blog/get`)
          if (response.data.blogs.length === 0) {
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
  useEffect(()=>{
    setTimeout(() => {
      fetchBlog()

    }, 5000);
  },[])
  return (
   <blogContext.Provider value={{blog,setBlog,error,setError,isLoading,setIsLoading,fetchBlog}}>
    {children}
   </blogContext.Provider>
  )
}

export default ContextProvider
