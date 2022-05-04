import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, Popover, Typography } from '@mui/material';
import axios from 'axios';
import React, {  useEffect, useState } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import HoverProfile from '../Profile/HoverProfile';



function ImageBoardComment(props) {

  console.log(props)

  const history = useHistory();

  const [ListComment, setListComment] = useState(null)
  const [DeleteData, setDeleteData] = useState({
    boardId:"",
    userId:"",
    content:""
  })
  const [Value,setValue] = useState(0)


  const [HoverUser,setHoverUser] = useState(null)

  const userData = useSelector(state => state.user.userData )
  
  useEffect(() => {

    let CleanUpBoolean = true

    // axios.get("/api/baords/imageBoard/comment/" + props.paramKey).then(response => {
    //   if(CleanUpBoolean) {
    //     console.log(response.data)
    //     setListComment(response.data);
    //   }
    // })
    
    axios.get("/api/baords/imageBoard/comment/" + props.paramKey).then(response => {
      if(CleanUpBoolean) {
        console.log(response.data)
        setListComment(response.data);
      }
    })

    return () => CleanUpBoolean = false
    
  },[props,Value])

  useEffect(()=>{
    axios.get('/api/baords/imageBoard/comment/test/' + props.paramKey).then(response => {
      console.log(response.data)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

  const onClickHandler = (userId) => {
    history.push("/profile/"+userId)
    window.location.reload()

  }


  const [anchorEl, setAnchorEl] = useState(null);

  const [ChildModal, setChildModal] = useState(false) 
  const [ParentModal, setParentModal] = useState(false)

  // console.log('CHILD : '+ChildModal)
  // console.log('PARENT : '+ParentModal)
  // console.log('NoModal : '+NoModal)

  const porperEnter = () => {
    console.log('child enter')
    setChildModal(true)
  }

  const porperLeave = () => {
    console.log('child leave')
    setChildModal(false)
  }
      
  return (
    <div>
      <Popover
        id="mouse-over-popover"
        style={{
          pointerEvents: "none",
        }}
        open={!ChildModal && !ParentModal ? false : true}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transitionDuration={{ appear: 2000, enter: 500 }}
        disableAutoFocus
        disableEnforceFocus
        onMouseEnter={porperEnter}
        onMouseLeave={porperLeave}
      >
        <HoverProfile UserData={HoverUser} />
      </Popover>

      {
        ListComment ? 
        ListComment.map((item, index) => {
          return (
            <ListItem
              key={index}
              style={{ padding: "10px 0" }}
              onMouseEnter={onEnter}
              onMouseOut={onLeave}
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
                onClick={() => onClickHandler(item?.user._id)}
                onMouseEnter={(event) => {
                  setAnchorEl(event.currentTarget);
                  setHoverUser(item?.user);
                  setParentModal(true);
                }}
                onMouseLeave={() => {
                  setParentModal(false);
                }}
              />
              <Typography
                variant="body1"
                style={{ display: "inline-block", marginLeft: "5px" }}
                onClick={() => onClickHandler(item?.user._id)}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "300",
                    display: "inline-block",
                    marginRight: "5px",
                  }}
                  onMouseEnter={(event) => {
                    setAnchorEl(event.currentTarget);
                    setHoverUser(item?.user);
                    setParentModal(true);
                  }}
                  onMouseLeave={() => {
                    setParentModal(false);
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
                      userId: item.user._id,
                      content: item.content,
                    });
                  }}
                />
              ) : null}
            </ListItem>
          );
        })
        :
        <CircularProgress
            sx={{
              position:'absolute',
              top:'calc(50% - 10px)',
              left:'calc(50% - 10px)',
              marginTop:'25%'
            }}

            size={20}
          />
      
      }

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