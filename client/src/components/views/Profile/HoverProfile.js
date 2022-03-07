import { Avatar, Popover, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import FollowerLength from '../../../moduls/FollowerLength';
import FollowingCmp from '../../../moduls/FollowingCmp';
import FollowLength from '../../../moduls/FollowLength';
import ImageBoardLength from '../../../moduls/ImageBoardLength';

function HoverProfile(props) {

  const userData = useSelector(state => state.user.userData)
  console.log(props.getFunc)

  const [CallData, setCallData] = useState(0);
  const getFunc = (data) => {
    setCallData(data);
  };


  const onFollowHandler = () => {
    if(props.UserData?._id !== userData?._id){
    return (
      <FollowingCmp 
        followerId={props.UserData?._id}
        followingId={userData?._id}
        getFunc={getFunc}
      />
    );
    }
  }

  const onEnterHandler = (event) => { 
    console.log(event.currentTarget.parentElement)
    console.log('HoverEnter')
    props.getFunc(event.target.parentElement.parentElement)
   }

  const onLeaveHandler = () => { 
    console.log('HoverLeave') 
    props.getFunc(null)
  }

  return (
    <div style={{width:'300px' ,pointerEvents:"auto"}}
      onMouseEnter={ onEnterHandler }
      onMouseLeave={ onLeaveHandler }
    >
        <div style={{borderBottom:'1px solid rgba(153,153,153,0.2)'}}>
        <Avatar
        alt={props.UserData?.name}
        src={props.UserData?.image}
        style={{
          display: "inline-block",
          verticalAlign: "top",
          width:'32px',
          height:'32px'
        }}
      />
        <Typography
        variant="h6"
        component="div"
        style={{
          display: "inline-block",
          verticalAlign: "top",
          margin: "5px 0 0 15px",
        }}
      >
        {props.UserData?.name}
      </Typography>
      { onFollowHandler() }
        </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "15px",
        }}
      >
        <div>
          <div style={{ fontSize: "13px", fontWeight: "bold" }}>게시물</div>
          <div style={{ textAlign: "center" }}>
            <ImageBoardLength UserId={props.UserData?._id} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "bold" }}>팔로워</div>
          <div style={{ textAlign: "center" }}>
            <FollowLength followerId={props.UserData?._id} CallData={CallData} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "bold" }}>팔로우</div>
          <div style={{ textAlign: "center" }}>
            <FollowerLength UserId={props.UserData?._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoverProfile