import axios from 'axios'
import React, { useEffect, useState } from 'react'

function FollowLength(props) {
  const [Length, setLength] = useState("")

  useEffect(() => {
    axios.get('/api/users/followLength/'+props.UserId).then(response => {
      console.log(response.data)
    })
  },[])

  return (
    <React.Fragment>
      { Length }
    </React.Fragment>     
  )
}

export default FollowLength