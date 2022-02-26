import axios from 'axios'
import React from 'react'

function Following(follower,following) {

    let body = {
        followerId: follower,
        followingId: following
    }

    axios.post('/api/users/following',body).then(response => {
        console.log(response.data)
    })

    return true
  
}

export default Following