import React, { useEffect } from 'react'
import useAuth from './useAuth'
import useRefreshToken from '../context/useRefreshToken'
import { privateAxios } from '../api/Axios'

const usePrivateAxios = () => {
    const {auth} = useAuth()
    const refresh = useRefreshToken()
    useEffect(()=>{
        const requestReceptors = privateAxios.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`
                    
                }
                return config
            },
            (error)=> Promise.reject(error)
        )
const responseReceptors = privateAxios.interceptors.response.use(
    response=> response,
    async(error)=>{
        const prevRequest = error?.config

        if(error?.response?.status === 403 && !prevRequest?.sent ){
            prevRequest.sent = true
            const newToken = await refresh()
            prevRequest.headers['Authorization'] = `Bearer ${newToken}`
            return privateAxios(prevRequest)
        }
       return Promise.reject(error)
    }
)
return ()=>{
    privateAxios.interceptors.request.eject(requestReceptors)
    privateAxios.interceptors.response.eject(responseReceptors)
}
    },[auth,refresh])
  return privateAxios
}
export default usePrivateAxios
