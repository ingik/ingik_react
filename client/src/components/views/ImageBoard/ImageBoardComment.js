import { Avatar, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'


function ImageBoardComment(props) {

  const [ListComment, setListComment] = useState([])

  console.log(props.CommentStatus)


  useEffect(() => {
    async function get(){

      const result = await axios.get("/api/baords/imageBoard/comment/" + props.paramKey)
      console.log(result)
        setListComment(result.data)
      }
      
    get()
  },[props.CommentStatus])

      
      
  return (
  <div>
    {ListComment.map((item,index) => {
      return (
        <ListItem key={index}>
          <Avatar
            alt={item.user.name}
            src={item.user.image}
            style={{
              display: "inline-block",
              verticalAlign: "top",
            }}
          />
          <Typography>{item.user.name}</Typography>---
          <Typography>{item.content}</Typography>
        </ListItem>
      );
    })}
  </div>
  );
}

export default ImageBoardComment