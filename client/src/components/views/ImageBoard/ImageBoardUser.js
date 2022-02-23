import { Avatar, ListItem, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState,useEffect } from 'react'

function ImageBoardUser(props) {

    console.log(props.userId)

    const [UserData, setUserData] = useState({})

    useEffect(() => {
        if(props.userId){
          axios.get("/api/users/findId/" + props.userId).then((response) => {
            console.log(response.data);
            setUserData(response.data)
          });
        }
    },[props.userId])


  return (
    <ListItem>
            <Avatar
              alt={UserData?.name}
              src={UserData?.image}
              style={{
                display: "inline-block",
                verticalAlign: "top",
              }}
            />
            <Typography
              variant="h6"
              component="div"
              style={{
                display: "inline-block",
                verticalAlign: "top",
                margin: "5px 0 0 15px",
              }}
            >
              {UserData?.name}
            </Typography>
          </ListItem>
  )
}

export default ImageBoardUser