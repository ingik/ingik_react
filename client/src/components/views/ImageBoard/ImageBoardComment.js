import { Avatar, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { FixedSizeList } from 'react-window';



function ImageBoardComment(props) {

  const [Status,setStatus] = useState(0)

  
  const [ListComment, setListComment] = useState([])
  useEffect(() => {
    
    setStatus(props.CommentStatus)
    async function get() {
      const result = await axios.get(
        "/api/baords/imageBoard/comment/" + props.paramKey
      );
      if (result.data) {
        setListComment(result.data);
      }
    }

    get();
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