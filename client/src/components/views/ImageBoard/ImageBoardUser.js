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


  const history = useHistory();
  const [UserData, setUserData] = useState({});

  const [DialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

    useEffect(() => {
      let ComponentMounted = true;
      if (props.userId) {
        axios.get("/api/users/findId/" + props.userId).then((response) => {
          if (ComponentMounted) {
            console.log(response.data);
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
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    console.log('open')
    if(UserData){
      console.log(event.currentTarget)
          setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    console.log('close')
    if(UserData){
        setAnchorEl(null)
    }
  };

  const open = Boolean(anchorEl);

  const getFunc = (data) => {
    setAnchorEl(data)
  }

  const onDeleteButton = () => {
    setDialogOpen(true);

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
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        transitionDuration={{appear:5000,enter:2000}}
        disableRestoreFocus
        // disableAutoFocus
        // disableEnforceFocus
        
      >
        <HoverProfile
          UserData={UserData}
          getFunc={getFunc}
          
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
          sx={{float:'right'}}
          onClick={onDeleteButton}
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
          <Button onClick={handleClose} variant>삭제</Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default React.memo(ImageBoardUser)