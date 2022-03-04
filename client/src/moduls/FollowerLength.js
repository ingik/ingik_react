import React, { useEffect, useState } from 'react'
import axios from "axios"

function FollowerLength(props) {
  const [Length, setLength] = useState("")
  console.log(props.UserId)

  useEffect(() => {
    if(props.UserId){
      axios.get("/api/users/followerLength/" + props.UserId)
        .then((response) => {
          console.log(response.data);
          setLength(response.data[0].Myfollowing.length);
        });
    }
  },[props.UserId])

  return (
    <React.Fragment>
      { Length }  
    </React.Fragment>
  )
}

export default FollowerLength