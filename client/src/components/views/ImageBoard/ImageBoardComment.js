import { Avatar, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'



function ImageBoardComment(props) {

  console.log(props.CommentStatus)
  const [ListComment, setListComment] = useState([])
  
  useEffect(() => {

    let CleanUpBoolean = true
    axios.get("/api/baords/imageBoard/comment/" + props.paramKey).then(response => {
      if(CleanUpBoolean) {
        console.log(response.data)
        setListComment(response.data);
      }
    })

    return () => CleanUpBoolean = false
    
  },[props])
      
      
  return (
    <div>
    {
    ListComment && ListComment.map((item) => {
      return (
        <ListItem key={item._id} style={{padding:'10px 0'}}>
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
                  fontWeight: "300",
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

export default React.memo(ImageBoardComment)