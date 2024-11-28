import React, { useEffect, useState } from 'react'
import { Axios } from '../api/Axios'

const useComment = () => {
    const [noOfComent, setNoumberOfComent] = useState(0)
    useEffect(() => {
        const commnts = async () => {
            try {
                const response = await Axios.get('/comment/get')
                setNoumberOfComent(response.data.totalComment)
                return response.data.totalComment
            } catch (error) {
                console.log(error)
            }

        }
        commnts()
    }, [])
    return noOfComent
}
    export default useComment
