import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { FOLLOW_LENGTH } from '../_actions/types'


function FollowLength(props) {

  console.log(props)


  const [Length, setLength] = useState("")

  useEffect(() => {
    if(props.followerId){
    axios.get('/api/users/followLength/'+props.followerId).then(response => {
      console.log(response.data[0]?.following.length)
      setLength(response.data[0]?.following.length)

      
    })
  }
  },[props])

  return (
    <React.Fragment>
      { Length }
    </React.Fragment>     
  )
}

export default FollowLength