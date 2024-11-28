import React, { createContext, useContext, useState } from 'react'
export const authContext = createContext()
const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState(null)
    const [users,setUser]= useState([])
    const [token,setToken] = useState('')
    const [persist,setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false)
  return (
    <authContext.Provider value={{setAuth,token,setToken, auth,setUser,users,persist,setPersist}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider
