import { Avatar, ListItem, Popover, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState,useEffect, useRef } from 'react'
import {  useHistory } from 'react-router-dom'
import HoverProfile from '../Profile/HoverProfile'

function ImageBoardUser(props) {

  const history = useHistory();

  const [UserData, setUserData] = useState({});
  

    console.log(props)
    useEffect(() => {
        if(props.userId){
          axios.get("/api/users/findId/" + props.userId).then((response) => {
            console.log(response.data);
            setUserData(response.data)
          });
        }
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
          margin: "5px 0 0 15px",
        }}
      >
        {UserData?.name}
      </Typography>
    </React.Fragment>
  );
}

export default ImageBoardUser