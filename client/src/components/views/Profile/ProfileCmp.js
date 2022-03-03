import { Avatar } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector,shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../_actions/user_action'
import ProfileUpdate from './ProfileUpdate'
import ProfileImageBoardList from './ProfileImageBoardList'

function ProfileCmp(props) {


  const userData = useSelector(state => state.user.userData,shallowEqual)
  
  const dispatch = useDispatch()
  dispatch(auth())

  //profile 최적화 필요
   
    return (
      <div style={{paddingTop:'64px'}}>
        <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Avatar src={userData?.image} sx={{ width: 150, height: 150 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              width: "400px",
            }}
          >
            <div
              style={{
                fontSize: "25px",
                marginBottom: "5px",
                display: "inline-block",
              }}
            >
              {userData?.name}
              <ProfileUpdate user={userData}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-evenly',marginBottom:'15px'}}>
              <div>
                <div style={{fontSize:'13px',fontWeight:'bold'}}>게시물</div>
                <div style={{textAlign:'center'}}>0</div>
              </div>
              <div>
                <div style={{fontSize:'13px',fontWeight:'bold'}}>팔로워</div>
                <div style={{textAlign:'center'}}>0</div>
              </div>
              <div>
                <div style={{fontSize:'13px',fontWeight:'bold'}}>팔로우</div>
                <div style={{textAlign:'center'}}>0</div>
              </div>
            </div>
            <div style={{ fontSize: "15px", marginBottom: "5px" }}>
              {userData?.email}
            </div>
            <div style={{ fontSize: "13px", marginBottom: "5px" }}>
              {userData?.intro}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
        </div>
      </div>


        <div>
         <ProfileImageBoardList ParamsUserId = {userData?._id}/>
        </div>
        
      </div>
    );
}

export default withRouter(ProfileCmp)
