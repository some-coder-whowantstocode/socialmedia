import axios from 'axios'
import React from 'react'
import Url from './Url'

const Findfriends = async(id) => {
    try{
        console.log(id)
        const url = `${Url}/socialmedia/api/v1/friends/${id}`

        let result = await axios.get(url)
        // console.log(result)
        return result.data
    }catch(error){
        console.log(error)
    }
 
}

export default Findfriends
