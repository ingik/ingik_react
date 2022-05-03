import { Avatar, Button, Popover, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import {  useHistory } from 'react-router-dom'
import HoverProfile from '../Profile/HoverProfile'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux'

function ImageBoardUser(props) {

  const UserSelectData = useSelector((state) => state.user.userData);

  // console.log(props.boardId)
  // console.log(UserSelectData._id)

  
  const [ChildModal, setChildModal] = useState(false) 
  const [ParentModal, setParentModal] = useState(false)

  const history = useHistory();
  const [UserData, setUserData] = useState({});
  const [open, setOpen] = useState(false)

  const [DialogOpen, setDialogOpen] = React.useState(false);

  const handleOpen = () => {
    setDialogOpen(true);

  }
  const handleClose = () => {
    setDialogOpen(false);
  };

  const porperEnter = () => {
    console.log('child enter')
    setChildModal(true)
  }

  const porperLeave = () => {
    console.log('child leave')
    setChildModal(false)
  }

    useEffect(() => {
      let ComponentMounted = true;
      if (props.userId) {
        axios.get("/api/users/findId/" + props.userId).then((response) => {
          if (ComponentMounted) {
            // console.log(response.data);
            setUserData(response.data);
          }
        });
      }

      return () => {
        console.log("imageBoardUser CleanUp");
        ComponentMounted = false;
      };
    },[props.userId])

  const onClickHandler = () => {
    history.push("/profile/"+UserData?._id)
    window.location.reload()

  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // setHoverUser(item?.user);
    setParentModal(true);
  };

  const handlePopoverClose = (event) => {
    setParentModal(false);
  };


  const onDeleteButton = () => {

    axios.delete('/api/boards/imageBoard/delete/'+props.boardId+'/'+UserSelectData._id).then(response => {
      // console.log(response.data)
      setDialogOpen(false)
      window.location.reload()

    })

  }


  return (
    <React.Fragment>
      <Avatar
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClickHandler}
        alt={UserData?.name}
        src={UserData?.image}
        style={{
          display: "inline-block",
          verticalAlign: "top",
          width: "32px",
          height: "32px",
        }}
      />
      <Popover
        id="mouse-over-popover"
        style={{
          pointerEvents: "none"
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
        transitionDuration={{appear:2000,enter:500}}
        disableAutoFocus
        disableEnforceFocus
        onMouseEnter={porperEnter}
        onMouseLeave={porperLeave}
        
      >
        <HoverProfile
          UserData={UserData}
        />
      </Popover>

      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClickHandler}
        variant="h6"
        component="div"
        style={{
          display: "inline-block",
          verticalAlign: "top",
          margin: "0px 10px 0 10px",
        }}
      >
        {UserData?.name}
      </Typography>
      {
        props.userId === UserSelectData._id ?
        <Button 
          sx={{float:'right',marginLeft: "auto"}}
          onClick={handleOpen}
        >
          <DeleteForeverIcon />
        </Button>
        
        : null
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
            한번 삭제한 게시물은 복구 시킬 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteButton} variant>삭제</Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default React.memo(ImageBoardUser)