import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';



function ImageBoardComment(props) {

  console.log(props)
  const [ListComment, setListComment] = useState([])
  const [DeleteData, setDeleteData] = useState({
    boardId:"",
    userId:"",
    content:""
  })
  const [loading, setloading] = useState(false)
  const [Value,setValue] = useState(0)

  const userData = useSelector(state => state.user.userData )
  
  useEffect(() => {

    let CleanUpBoolean = true
    axios.get("/api/baords/imageBoard/comment/" + props.paramKey).then(response => {
      if(CleanUpBoolean) {
        console.log(response.data)
        setListComment(response.data);
      }
    })

    return () => CleanUpBoolean = false
    
  },[props,Value])

  const onEnter = (event) => {
    if(event.target.children[2]){
      event.target.children[2].style.display = 'block'

    }
  }

  const onLeave = (event) => {
    if(event.target.children[2]){
      event.target.children[2].style.display = 'none'
    }
  }


  const [DialogOpen, setDialogOpen] = React.useState(false);

  const handleOpen = () => {
    setDialogOpen(true);

  }
  const handleClose = () => {
    setDialogOpen(false);
  };

  const onDeleteButton = () => {
    console.log(DeleteData)
    axios.delete('/api/boards/imageBoard/comment/delete/'+DeleteData.boardId+'/'+DeleteData.userId+'/'+DeleteData.content).then((response) => {
      console.log(response.data)
      setDialogOpen(false);
      setValue(Value => ++Value)
    })
  }
  
      
  return (
    <div>
      {
          loading 
          ? null 
          : <CircularProgress
              sx={{
                position:'absolute',
                top:'50%',
                left:'50%'
              }}
            />
        }
      {ListComment &&
        ListComment.map((item, index) => {
          return (
            <ListItem
              key={index}
              style={{ padding: "10px 0" }}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              <Avatar
                alt={item?.user.name}
                src={item?.user.image}
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  width: "32px",
                  height: "32px",
                }}
              />
              <Typography
                variant="body1"
                style={{ display: "inline-block", marginLeft: "5px" }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "300",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                >
                  {item?.user.name}
                </span>
                {item?.content}
              </Typography>
              {userData._id === item?.user._id ? (
                <DeleteForeverIcon
                  sx={{ marginLeft: "auto", display: "none" }}
                  onClick={() => {
                    handleOpen();
                    setDeleteData({
                      boardId: props.paramKey,
                      userId:item.user._id,
                      content:item.content
                    })
                  }}
                />
              ) : null}
            </ListItem>
          );
        })}

      <Dialog
        open={DialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이 게시물을 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            한번 삭제한 댓글은 복구 시킬 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteButton} variant>
            삭제
          </Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(ImageBoardComment)