import axios from 'axios'
import React from 'react'

function UnFollowing(fowller,following) {
    
    let body = {
        followerId: fowller,
        followingId: following
    }

    axios.post('/api/users/unfollowing',body).then(response => {
        console.log(response.data)
    })

    return false
}

export default UnFollowing