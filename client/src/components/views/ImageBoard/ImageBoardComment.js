import { Avatar, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window';



function ImageBoardComment(props) {

  const [ListComment, setListComment] = useState([])
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
    {
    ListComment.map((item,index) => {
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
          <Typography variant='h6' style={{fontSize:'15px',margin:'0 10px 0 10px',fontWeight:'600'}}>{item.user.name}</Typography>
          <Typography variant='body1'>{item.content}</Typography>
        </ListItem>
      );
    })
    
  }
  </div>
  );
}

export default ImageBoardComment