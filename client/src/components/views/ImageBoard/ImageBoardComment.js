import { Avatar, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window';



function ImageBoardComment(props) {

  console.log(props)
  const [ListComment, setListComment] = useState([])
  
  useEffect(() => {

    axios.get("/api/baords/imageBoard/comment/" + props.paramKey).then(response => {
      if(response.data) {
        console.log(response.data)
        setListComment(response.data);
      }
    }).catch()
    
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
              width: "32px",
              height: "32px",
            }}
          />
            <Typography variant="body1" style={{ display: "inline-block",marginLeft:'5px' }}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              >
                {item.user.name}
              </span>
              {item.content}
            </Typography>
        </ListItem>
      );
    })
    
  }
  </div>
  );
}

export default ImageBoardComment