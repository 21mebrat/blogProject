import { api } from '../api/Axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
    const { setAuth } = useAuth()
    const refresh = async () => {
        const response = await api.get('/refresh')
        console.log()
        setAuth((prev) => {
            console.log('preivoous', response.data.role)
            console.log('new onw', response.data.accessToken)
            return { ...prev, accessToken: response.data.accessToken, role: response.data.role }
        })
        return response.data.accessToken
    }
    return refresh
}

export default useRefreshToken
